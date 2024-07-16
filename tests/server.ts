import { readFileSync } from "node:fs"
import { createServer } from "node:http"
import process from "node:process"
import {
    createApp, defineEventHandler, serveStatic, toNodeListener,
} from "h3"

export function createLocalServer() {
    const app = createApp()
    app.use(defineEventHandler((event) => {
        return serveStatic(event, {
            getContents: (id) => {
                if (id === "/") {
                    return readFileSync("examples/web/index.html")
                } else if (id.endsWith(".js") || id.endsWith(".wasm")) {
                    return readFileSync(`${process.cwd()}${id}`)
                }
            },
            getMeta: (id) => {
                let type = "text/html"
                if (id.endsWith(".js")) {
                    type = "application/javascript"
                } else if (id.endsWith(".wasm")) {
                    type = "application/wasm"
                }
                return {
                    type,
                }
            },
        })
    }))
    return createServer(toNodeListener(app)).listen(3000)
}
