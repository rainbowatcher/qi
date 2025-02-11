import { readFile, writeFile } from "node:fs/promises"
import process from "node:process"
import { $ } from "execa"
import { ensureDir, ensureFile } from "fs-extra"
import ora from "ora"
import c from "picocolors"
import { rimraf } from "rimraf"
import { version } from "../package.json"

const targetDir = "packages/qi-js"
const indexFilePath = `${process.cwd()}/${targetDir}/index.js`
const pkgJsonPath = `${process.cwd()}/${targetDir}/package.json`
const wasmPath = `${process.cwd()}/${targetDir}/index_bg.wasm`
const pkgJsonContent = JSON.stringify({
    author: "rainbowatcher <rainbow-w@qq.com>",
    bugs: {
        url: "https://github.com/rainbowatcher/qi/issues",
    },
    description: "A tiny, fast, and powerful formatter for documentation, especially for content in CJK.",
    files: [
        "index_bg.wasm",
        "index.js",
        "index.d.ts",
    ],
    homepage: "https://github.com/rainbowatcher/qi#readme",
    license: "MIT",
    main: "index.js",
    module: "index.js",
    name: "qi-js",
    repository: {
        type: "git",
        url: "git+https://github.com/rainbowatcher/qi.git",
    },
    type: "module",
    types: "index.d.ts",
    version,
}, null, 2)

const spinner = ora()
spinner.info("Start building")
spinner.start(`Cleaning ${targetDir}`)
await ensureDir(`${process.cwd()}/${targetDir}`)
await rimraf(`${process.cwd()}/${targetDir}`)
spinner.succeed()

spinner.start("Building wasm")
await $`wasm-pack build crates/core --no-pack --no-opt --release -d ../../${targetDir} -t web --out-name index`
spinner.succeed()

spinner.start("Optimizing wasm")
await $`wasm-opt -O4 ${wasmPath} --enable-threads --enable-bulk-memory -o ${wasmPath}`
spinner.succeed()

spinner.start("Handle index.js")
const indexStr = await readFile(indexFilePath, "utf8")
const fetchExpr = "input = fetch(input);"
if (indexStr.includes(fetchExpr)) {
    const newIndexStr = `/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */\n${indexStr.replace(fetchExpr, /* javascript */`if (globalThis.process?.release?.name === "node") {
        const fs = (await import('fs')).default;
        input = fs.readFileSync(input);
        } else {
            input = fetch(input);
    }`)}`
    await writeFile(indexFilePath, newIndexStr)
} else {
    spinner.stopAndPersist({ text: "generated js file may incorrect" })
    throw new Error("input is not defined in the generated js file")
}
spinner.succeed()

spinner.start("Handle package.json")
await ensureFile(pkgJsonPath)
await writeFile(pkgJsonPath, pkgJsonContent)
spinner.succeed()

// eslint command fail here, execute eslint twice then the error disappears
try {
    spinner.start("Linting generated code")
    await rimraf(`${process.cwd()}/${targetDir}/.gitignore`)
    await $`pnpm exec eslint ${process.cwd()}/${targetDir} --fix`
    spinner.succeed()
} catch {
    await $`pnpm exec eslint ${process.cwd()}/${targetDir} --fix`
    spinner.succeed()
}

spinner.start("Building legacy lib")
await $`pnpm -r build`
spinner.succeed()

spinner.succeed(`Build ${c.green("success")}`)
spinner.stop()
