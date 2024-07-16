import { execa, execaNode } from "execa"
import { chromium } from "playwright"
import { expect, it } from "vitest"
import { createLocalServer } from "./server"


it("run in nodejs", async () => {
    const proc = await execaNode`examples/nodejs/index.js`
    expect(proc.stdout).toBe("abc 你好, 世界 123")
})

it("run in deno", async () => {
    const proc = await execa`deno run -A examples/deno/main.ts`
    expect(proc.stdout).toBe("abc 你好, 世界 123")
})

it("run in browser", async () => {
    const server = createLocalServer()
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto("http://localhost:3000")
    const text = await page.textContent("#root")
    expect(text).toBe("abc 你好, 世界 123")
    await browser.close()
    server.close()
})
