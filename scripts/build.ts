import { readFile, writeFile } from "node:fs/promises"
import process from "node:process"
import { $ } from "execa"
import { ensureDir, ensureFile } from "fs-extra"
import { rimraf } from "rimraf"
import { version } from "../package.json"

const targetDir = "packages/qijs"
const indexFilePath = `${process.cwd()}/${targetDir}/qi.js`
const pkgJsonPath = `${process.cwd()}/${targetDir}/package.json`
const pkgJsonContent = JSON.stringify({
    files: [
        "qi_bg.wasm",
        "qi.js",
        "qi.d.ts",
    ],
    main: "qi.js",
    name: "qi",
    type: "module",
    types: "qi.d.ts",
    version,
}, null, 2)

await ensureDir(`${process.cwd()}/${targetDir}`)
await rimraf(`${process.cwd()}/${targetDir}`)
await $`wasm-pack build crates/core --no-pack --dev -d ../../${targetDir} -t web`
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
