async function main() {
    // eslint-disable-next-line node/prefer-global/process
    if ((globalThis as any).Bun || !!globalThis.process?.versions?.bun) {
        console.log(">>> running in bun <<<")
        const { default: init, format } = await import("../packages/qijs/qi-web.js")
        await init()
        console.log(format("abc你好,世界123"))
    // eslint-disable-next-line node/prefer-global/process
    } else if (globalThis.process?.release?.name === "node") {
        console.log(">>> running in node <<<")
        const { format } = await import("../packages/qijs/qi-node.js")
        console.log(format("abc你好,世界123"))
    } else if ((globalThis as any).Deno) {
        console.log(">>> running in deno <<<")
        const { default: init, format } = await import("../packages/qijs/qi-web.js")
        await init()
        console.log(format("abc你好,世界123"))
    } else if (globalThis.window) {
        console.log(">>> running in web <<<")
        const { default: init, format } = await import("../packages/qijs/qi-web.js")
        await init()
        console.log(format("abc你好,世界123"))
    } else {
        throw new Error("Unsupported environment")
    }
}

// eslint-disable-next-line unicorn/prefer-top-level-await
main().catch(() => {})
