import { $ } from "execa"
import { ensureDir } from "fs-extra"
import { rimraf } from "rimraf"

const targetDir = "./tmp/qijs"
await Promise.all([
    ensureDir(targetDir),
    rimraf(targetDir),
    $`wasm-pack build crates/core --no-typescript --no-pack --dev -d ../../tmp/qijs -t web`,
])
