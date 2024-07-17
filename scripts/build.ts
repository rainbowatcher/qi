import { readFile, writeFile } from "node:fs/promises"
import process from "node:process"
import { $ } from "execa"
import { ensureDir, ensureFile } from "fs-extra"
import c from "picocolors"
import { rimraf } from "rimraf"
import { version } from "../package.json"

const targetDir = "packages/qijs"
const indexFilePath = `${process.cwd()}/${targetDir}/qi.js`
const pkgJsonPath = `${process.cwd()}/${targetDir}/package.json`
const wasmPath = `${process.cwd()}/${targetDir}/qi_bg.wasm`
const pkgJsonContent = JSON.stringify({
    author: "rainbowatcher <rainbow-w@qq.com>",
    description: "A tiny, fast, and powerful formatter for documentation, especially for content in CJK.",
    files: [
        "qi_bg.wasm",
        "qi.js",
        "qi.d.ts",
    ],
    homepage: "https://github.com/rainbowatcher/qi#readme",
    license: "MIT",
    main: "qi.js",
    name: "qi",
    repository: {
        type: "git",
        url: "git+https://github.com/rainbowatcher/qi.git",
    },
    scripts: {
        publish: "pnpm publish",
    },
    type: "module",
    types: "qi.d.ts",
    version,
}, null, 2)

await ensureDir(`${process.cwd()}/${targetDir}`)
await rimraf(`${process.cwd()}/${targetDir}`)
await $`wasm-pack build crates/core --no-pack --release -d ../../${targetDir} -t web`
await $`wasm-opt -O4 ${wasmPath} -o ${wasmPath}`
const indexStr = await readFile(indexFilePath, "utf8")
const fetchExpr = "input = fetch(input);"
if (indexStr.includes(fetchExpr)) {
    const newIndexStr = indexStr.replace(fetchExpr, `if (globalThis.process?.release?.name === "node") {
            const fs = (await import('fs')).default;
            input = fs.readFileSync(input);
        } else {
            input = fetch(input);
        }`)
    await writeFile(indexFilePath, newIndexStr)
} else {
    throw new Error("input is not defined in the generated js file")
}
await ensureFile(pkgJsonPath)
await writeFile(pkgJsonPath, pkgJsonContent)
await $`pnpm -r build`
console.log(c.bgGreen(" BUILD SUCCESS "))
