

@default:
    just --list

# generate unicode table
@gen:
    deno run --allow-read --allow-write --allow-net scripts/gen_table.ts

# build wasm package bundler, nodejs, web, no-modules, deno
@build: clean-wasm
    #!/usr/bin/env bash
    wasm-pack build crates/core -d ../../packages/qijs --release --target web --out-name qi-web
    wasm-pack build crates/core -d ../../packages/qijs --release --target nodejs --out-name qi-node

# clean wasm build dist
[unix]
@clean-wasm:
    rm -r packages/qijs

# code coverage
@cover:
    cargo tarpaulin --out html --fail-immediately --frozen --output-dir target/report

# test wasm
@test:
    wasm-pack test --node --chrome --firefox --safari crates/core

run:
    #!/usr/bin/env bash
    deno run -A test/node.ts
    bun run test/node.ts
    tsx test/node.ts