import { defineConfig } from "@rainbowatcher/eslint-config"

export default defineConfig({
    gitignore: true,
    json: true,
    markdown: true,
    style: true,
    toml: true,
    typescript: true,
}, {
    rules: {
        "toml/padding-line-between-pairs": "off",
    },
})
