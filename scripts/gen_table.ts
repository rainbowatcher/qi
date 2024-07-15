import { writeFile } from "node:fs/promises"
import { ensureFileSync } from "fs-extra"

const url = "https://www.unicode.org/Public/UCD/latest/ucd/Blocks.txt"
const tableFile = "crates/core/src/table.rs"

async function main() {
    try {
        const response = await fetch(url)
        const text = await response.text()

        const re = /(?<start>\w{3,6})\.\.(?<end>\w{3,6});\s+(?<name>.*)/

        // eslint-disable-next-line ts/naming-convention
        let table_rs = "/* DO NOT EDIT, this file is generated from Blocks.txt */\n/* @cSpell: disable */\n"
        for (const [idx, line] of text.split("\n").entries()) {
            if (idx === 0) {
                const groups = /.*?(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)\D.*/.exec(line)?.groups
                if (groups) {
                    table_rs += `pub const UNICODE_VERSION: (u64, u64, u64) = (${groups.major}, ${groups.minor}, ${groups.patch});\n\n`
                    table_rs += `pub const UNICODE_VERSION_U8: (u8, u8, u8) = (${groups.major}, ${groups.minor}, ${groups.patch});\n\n`
                    table_rs += "// MARK: Basic Multilingual Plane\n"
                } else {
                    throw new Error("Invalid version")
                }
            }

            if (line.startsWith("#") || line.trim() === "") {
                continue
            }

            const match = line.match(re)
            if (match?.groups) {
                const { end, name, start } = match.groups
                const formattedName = name
                    .replaceAll("-", "_")
                    .replaceAll(" ", "_")
                    .toUpperCase()

                if (line.startsWith("D800..")) table_rs += "// Surrogate code points, rust forbiden them to be char type\n"
                if (line.startsWith("D800..") || line.startsWith("DB80..") || line.startsWith("DC00..")) {
                    table_rs += `pub const ${formattedName}: (u32, u32) = (0x${start}, 0x${end});\n`
                    if (line.startsWith("DC00..")) table_rs += "// Surrogate code points end\n"
                    continue
                }
                if (line.startsWith("10000..")) table_rs += "// MARK: Supplementary Multilingual Plane\n"
                if (line.startsWith("20000..")) table_rs += "// MARK: Supplemental Ideographic Plane\n"
                if (line.startsWith("30000..")) table_rs += "// MARK: Tertiary Ideographic Plane\n"
                if (line.startsWith("E0000..")) table_rs += "// MARK: Supplementary Special-purpose Plane\n"
                if (line.startsWith("F0000..")) table_rs += "// MARK: Supplementary Private Use Area A\n"
                if (line.startsWith("100000..")) table_rs += "// MARK: Supplementary Private Use Area B\n"
                table_rs += `pub const ${formattedName}: (char, char) = ('\\u{${start}}', '\\u{${end}}');\n`
            }
        }

        ensureFileSync(tableFile)
        await writeFile(tableFile, table_rs)
        console.log(`unicode table generated at: ${tableFile}`)
    } catch (error) {
        console.error("An error occurred:", error)
    }
}


await main()
