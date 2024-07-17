use criterion::{criterion_group, criterion_main, Criterion};
use qi_rs::format;

fn bench_format(c: &mut Criterion) {
    c.bench_function("format", |b| b.iter(|| format("abc你好，世界123", None)));
}

criterion_group!(benches, bench_format);
criterion_main!(benches);
