import init, { format } from "../../packages/qi-js/index.js"

// @ts-expect-error for deno
if (import.meta.main) {
    await init()
    console.log(format("abc你好,世界123"))
}
