macro_rules! expect {
    ($text: literal, $expected: literal) => {
        assert_eq!(qi_rs::format($text, None), $expected);
    };
    ($text: literal, $expected: literal, $options: expr) => {
        assert_eq!(qi_rs::format($text, Some($options)), $expected);
    };
}

#[test]
fn empty_str() {
    expect!("", "");
}

#[test]
fn cjk_and_alphabet() {
    expect!("abc中", "abc 中");
    expect!("abc中abc", "abc 中 abc");
    expect!("a中", "a 中");
    expect!("中s", "中 s");
    expect!("中abc", "中 abc");
    expect!("中文abc测试abc", "中文 abc 测试 abc");
}

#[test]
fn alphabet_and_number() {
    expect!("abc123", "abc123");
    expect!("abc123abc", "abc123abc");
    expect!("a123", "a123");
    expect!("123s", "123s");
    expect!("123abc", "123abc");
}

#[test]
fn kangxi_radicals() {
    expect!("abc⾗123", "abc ⾗ 123");
    expect!("abc ⾗ 123", "abc ⾗ 123");
    expect!("abc⾧123", "abc ⾧ 123");
    expect!("abc⿓123", "abc ⿓ 123");
}

#[test]
fn cjk_radicals_supplement() {
    expect!("⻛⻢⻁⻰wind", "⻛⻢⻁⻰ wind");
    expect!("abc⻛⻢⻁⻰wind", "abc ⻛⻢⻁⻰ wind");
    expect!("123⻛⻢⻁⻰wind", "123 ⻛⻢⻁⻰ wind");
    expect!("123 ⻛⻢⻁⻰ wind", "123 ⻛⻢⻁⻰ wind");
    expect!("123 ⻛⻢⻁⻰wind", "123 ⻛⻢⻁⻰ wind");
    expect!("123⻛⻢⻁⻰ wind", "123 ⻛⻢⻁⻰ wind");
}

#[test]
fn bopomofo() {
    expect!("abcㄅ123", "abc ㄅ 123");
    expect!("abc ㄅ123", "abc ㄅ 123");
    expect!("abc ㄅ 123", "abc ㄅ 123");
}

#[test]
fn japanese_and_korean() {
    expect!("abcあ123", "abc あ 123");
    expect!("abc あ123", "abc あ 123");
    expect!("abc あ 123", "abc あ 123");
    expect!("abcア123", "abc ア 123");
    expect!("abc ア123", "abc ア 123");
    expect!("abc ア 123", "abc ア 123");
    expect!("abc안녕123", "abc 안녕 123");
    expect!("abc 안녕123", "abc 안녕 123");
    expect!("abc 안녕 123", "abc 안녕 123");
}

#[test]
fn cjk_and_numbers() {
    expect!("123中文", "123 中文");
    expect!("中文123", "中文 123");
    expect!("123中文123", "123 中文 123");
    expect!("中文123中文", "中文 123 中文");
}

#[test]
fn ignore_stash_symbol() {
    expect!("前面_後面", "前面_後面");
    expect!("Vinta_Mollie", "Vinta_Mollie");
    expect!("Vinta _ Mollie", "Vinta _ Mollie");
}

#[test]
fn cjk_and_latin1_supplement() {
    expect!("中文 Ø 漢字", "中文 Ø 漢字");
    expect!("注册商标®", "注册商标 ®");
    expect!("中文Ø漢字", "中文 Ø 漢字");
    expect!("版权所有©2022", "版权所有 ©2022");
    expect!("价格:¥1999", "价格: ¥1999");
}

#[test]
fn cjk_and_greek_and_copics() {
    expect!("中文αβγ", "中文 αβγ");
    expect!("αβγ中文", "αβγ 中文");
    expect!("αβγ中文αβγ", "αβγ 中文 αβγ");
}

#[test]
fn enclosed_cjk_letters_and_months() {
    expect!("abc㈱式会社", "abc㈱ 式会社");
    expect!("abc ㈱ 式会社", "abc ㈱ 式会社");
    expect!(
        "㈩老龙王拙计犯天条　魏丞相遗书托冥吏",
        "㈩ 老龙王拙计犯天条　魏丞相遗书托冥吏"
    );
    expect!("第㊉回", "第 ㊉ 回");
    expect!("㈣是㊃,㊉是㈩", "㈣ 是 ㊃,㊉ 是 ㈩");
}

#[test]
fn cjk_unified_idographs_extention_a() {
    expect!("123㐂", "123 㐂");
    expect!("㐂123", "㐂 123");
    expect!("123㐂123", "123 㐂 123");
    expect!("123 㐂 123", "123 㐂 123");
    expect!("123 㐂123", "123 㐂 123");
    expect!("123㐂 123", "123 㐂 123");
}

#[test]
fn cjk_unified_idographs_extention_b() {
    expect!("123𠀎", "123 𠀎");
    expect!("𠀎123", "𠀎 123");
    expect!("abc𠀎123", "abc 𠀎 123");
    expect!("abc 𠀎 123", "abc 𠀎 123");
    expect!("abc 𠀎123", "abc 𠀎 123");
    expect!("abc𠀎 123", "abc 𠀎 123");
}

#[test]
fn cjk_unified_idographs_extention_c() {
    expect!("123𪜀", "123 𪜀");
    expect!("𪜀123", "𪜀 123");
    expect!("abc𪜀123", "abc 𪜀 123");
    expect!("abc 𪜀 123", "abc 𪜀 123");
    expect!("abc 𪜀123", "abc 𪜀 123");
}

#[test]
fn cjk_unified_idographs_extention_d() {
    expect!("123𫝀", "123 𫝀");
    expect!("𫝀123", "𫝀 123");
    expect!("abc𫝀123", "abc 𫝀 123");
    expect!("abc 𫝛 123", "abc 𫝛 123");
    expect!("abc 𫝛123", "abc 𫝛 123");
}

#[test]
fn cjk_unified_idographs_extention_e() {
    expect!("123𫠠", "123 𫠠");
    expect!("𫠠123", "𫠠 123");
    expect!("abc𫠠123", "abc 𫠠 123");
    expect!("abc 𫡱 123", "abc 𫡱 123");
    expect!("abc 𫡱123", "abc 𫡱 123");
}

#[test]
fn cjk_unified_idographs_extention_f() {
    expect!("123𬻗", "123 𬻗");
    expect!("𬻗123", "𬻗 123");
    expect!("abc𬻗123", "abc 𬻗 123");
    expect!("abc 𬻗 123", "abc 𬻗 123");
    expect!("abc 𬻗123", "abc 𬻗 123");
}

#[test]
fn cjk_unified_idographs_extention_g() {
    expect!("123𰀁", "123 𰀁");
    expect!("𰀁123", "𰀁 123");
    expect!("abc𰀁123", "abc 𰀁 123");
    expect!("abc 𰀁 123", "abc 𰀁 123");
    expect!("abc 𰀁123", "abc 𰀁 123");
}

#[test]
fn cjk_unified_idographs_extention_h() {
    expect!("123𱍗", "123 𱍗");
    expect!("𱍗123", "𱍗 123");
    expect!("abc𱍗123", "abc 𱍗 123");
    expect!("abc 𱍗 123", "abc 𱍗 123");
    expect!("abc 𱍗123", "abc 𱍗 123");
}

#[test]
fn cjk_unified_idographs_extention_i() {
    expect!("123𮰵", "123 𮰵");
    expect!("𮰵123", "𮰵 123");
    expect!("abc𮰵123", "abc 𮰵 123");
    expect!("abc 𮰵 123", "abc 𮰵 123");
    expect!("abc 𮰵123", "abc 𮰵 123");
}

#[test]
fn punctuations() {
    let punctuations_off = qi_rs::Options {
        spacing: Some(qi_rs::SpacingOptions {
            punctuations: false,
        }),
    };
    expect!("abc,123", "abc, 123");
    expect!("abc,def", "abc, def");
    expect!("编号:89757", "编号: 89757");
    expect!("你好,世界", "你好, 世界");
    expect!("分段;符号", "分段; 符号");
    expect!("你好.世界", "你好. 世界");
    expect!("你好!世界", "你好! 世界");
    expect!("你吃了吗?朋友.", "你吃了吗? 朋友.");
    expect!("tl;dr", "tl; dr");
    expect!("tl;dr", "tl;dr", punctuations_off);
    expect!("too long,don't read", "too long, don't read");
}

#[test]
fn parenthesis() {
    expect!("前面(中文123漢字)後面", "前面 (中文 123 漢字) 後面");
    expect!("前面(中文123)後面", "前面 (中文 123) 後面");
    expect!("前面(123漢字)後面", "前面 (123 漢字) 後面");
    expect!("前面(中文123) tail", "前面 (中文 123) tail");
    expect!("head (中文123漢字)後面", "head (中文 123 漢字) 後面");
    expect!("head (中文123漢字) tail", "head (中文 123 漢字) tail");
    expect!("(or simply \"React\")", "(or simply \"React\")");
    expect!(
        "OperationalError: (2006, 'MySQL server has gone away')",
        "OperationalError: (2006, 'MySQL server has gone away')"
    );
    expect!("我看过的电影(1404)", "我看过的电影 (1404)");
    expect!(
        "Chang Stream(变更记录流)是指collection(数据库集合)的变更事件流",
        "Chang Stream (变更记录流) 是指 collection (数据库集合) 的变更事件流"
    );
    expect!(
        "open-source projects(excellent article).",
        "open-source projects (excellent article)."
    );

    expect!("前面<中文123漢字>後面", "前面 <中文 123 漢字> 後面");
    expect!("前面<中文123>後面", "前面 <中文 123> 後面");
    expect!("前面<123漢字>後面", "前面 <123 漢字> 後面");
    expect!("前面<中文123> tail", "前面 <中文 123> tail");
    expect!("head<中文123漢字>後面", "head <中文 123 漢字> 後面");
    expect!("head<中文123漢字>tail", "head <中文 123 漢字> tail");
}

#[test]
fn colon() {
    expect!("定义:123中文", "定义: 123 中文");
    expect!("定义: 123中文", "定义: 123 中文");
    expect!("定义:中文", "定义: 中文");
    expect!("定义:abc", "定义: abc");
}

#[test]
fn quotes() {
    expect!(r#"定义:123中文"#, r#"定义: 123 中文"#);
    expect!(r#"定义:"123中文""#, r#"定义: "123 中文""#);
}

#[test]
fn multiline() {
    expect!(
        "section前面\n中文123漢字\nsection後面",
        "section 前面\n中文 123 漢字\nsection 後面"
    );
}
