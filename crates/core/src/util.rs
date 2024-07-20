use wasm_bindgen::prelude::wasm_bindgen;

use crate::{
    range::{
        R_CHINESE, R_CLOSE_PARENTHESES, R_COMMON_SYMBOLS, R_JAPANESE, R_KOREAN, R_OPEN_PARENTHESES,
        R_QUOTES, R_WESTERN_SENTENCE_PUNCTUATIONS,
    },
    table::{
        CJK_COMPATIBILITY, CJK_COMPATIBILITY_FORMS, ENCLOSED_ALPHANUMERICS,
        ENCLOSED_CJK_LETTERS_AND_MONTHS, GREEK_AND_COPTIC, LATIN_1_SUPPLEMENT, NUMBER_FORMS,
    },
};

#[inline]
pub fn bsearch_range_table(c: char, r: &[(char, char)]) -> bool {
    use core::cmp::Ordering::{Equal, Greater, Less};
    r.binary_search_by(|&(lo, hi)| {
        if lo <= c && c <= hi {
            Equal
        } else if hi < c {
            Less
        } else {
            Greater
        }
    })
    .is_ok()
}

#[wasm_bindgen]
pub fn is_chinese(c: char) -> bool {
    bsearch_range_table(c, R_CHINESE)
}

#[wasm_bindgen]
pub fn is_japanese(c: char) -> bool {
    bsearch_range_table(c, R_JAPANESE) || is_chinese(c)
}

#[wasm_bindgen]
pub fn is_korean(c: char) -> bool {
    bsearch_range_table(c, R_KOREAN)
}

#[wasm_bindgen]
pub fn is_cjk(c: char) -> bool {
    bsearch_range_table(c, R_CHINESE)
        || bsearch_range_table(c, R_JAPANESE)
        || bsearch_range_table(c, R_KOREAN)
}

#[wasm_bindgen]
pub fn is_number_forms(c: char) -> bool {
    NUMBER_FORMS.0 <= c && c <= NUMBER_FORMS.1
}

#[wasm_bindgen]
pub fn is_cjk_compatibility_forms(c: char) -> bool {
    CJK_COMPATIBILITY_FORMS.0 <= c && c <= CJK_COMPATIBILITY_FORMS.1
}

#[wasm_bindgen]
pub fn is_enclosed_cjk_letters_and_months(c: char) -> bool {
    ENCLOSED_CJK_LETTERS_AND_MONTHS.0 <= c && c <= ENCLOSED_CJK_LETTERS_AND_MONTHS.1
}

#[wasm_bindgen]
pub fn is_latin1_supplement(c: char) -> bool {
    LATIN_1_SUPPLEMENT.0 <= c && c <= LATIN_1_SUPPLEMENT.1
}

#[wasm_bindgen]
pub fn is_greek_and_coptic(c: char) -> bool {
    GREEK_AND_COPTIC.0 <= c && c <= GREEK_AND_COPTIC.1
}

#[wasm_bindgen]
pub fn is_enclosed_alphanumerics(c: char) -> bool {
    ENCLOSED_ALPHANUMERICS.0 <= c && c <= ENCLOSED_ALPHANUMERICS.1
}

#[wasm_bindgen]
pub fn is_cjk_compatibility(c: char) -> bool {
    CJK_COMPATIBILITY.0 <= c && c <= CJK_COMPATIBILITY.1
}

#[wasm_bindgen]
pub fn is_common_symbols(c: char) -> bool {
    R_COMMON_SYMBOLS.get(&c).is_some()
}

#[wasm_bindgen]
pub fn is_open_parentheses(c: char) -> bool {
    R_OPEN_PARENTHESES.get(&c).is_some()
}

#[wasm_bindgen]
pub fn is_close_parentheses(c: char) -> bool {
    R_CLOSE_PARENTHESES.get(&c).is_some()
}

#[wasm_bindgen]
pub fn is_western_sentence_punctuation(c: char) -> bool {
    R_WESTERN_SENTENCE_PUNCTUATIONS.get(&c).is_some()
}

#[wasm_bindgen]
pub fn is_quote(c: char) -> bool {
    R_QUOTES.get(&c).is_some()
}

// MARK: TEST
#[cfg(test)]
pub mod tests {
    use super::*;

    #[test]
    fn test_bsearch_range_table() {
        let ranges = &[('a', 'c'), ('e', 'g')];

        assert!(bsearch_range_table('b', ranges));
        assert!(!bsearch_range_table('d', ranges));
        assert!(bsearch_range_table('e', ranges));
        assert!(bsearch_range_table('f', ranges));
        assert!(!bsearch_range_table('h', ranges));
    }

    macro_rules! expect {
        ($name: ident, $func: ident, $text: literal) => {
            #[test]
            fn $name() {
                let text = $text;
                for c in text.chars() {
                    assert!($func(c));
                }
            }
        };
    }

    macro_rules! expect_not {
        ($name: ident, $func: ident, $text: literal) => {
            #[test]
            fn $name() {
                let text = $text;
                for c in text.chars() {
                    assert!(!$func(c));
                }
            }
        };
    }

    expect!(cjk_unified_ideographs, is_chinese, "你好世界");
    expect_not!(
        test_not_chinese,
        is_chinese,
        "123abc[]./&@^안녕こんにちは😀🔥 \n"
    );
    expect!(cjk_radicals_supplement, is_chinese, "⺀⺩⻯\u{2eff}");
    expect!(kangxi_radicals, is_chinese, "⼀⼆⼋⼗⾭⿓\u{2fdf}");
    expect!(bopomofo, is_chinese, "\u{3100}ㄅㄯ");
    expect!(bopomofo_extended, is_chinese, "ㆠㆿ");
    expect!(cjk_strokes, is_chinese, "㇀\u{31ef}");
    expect_not!(
        cjk_symbols_and_punctuation,
        is_chinese,
        "\u{3000}、〄〲〾\u{303f}"
    );

    expect!(test_is_japanese, is_japanese, "こんにちは世界");
    expect_not!(test_not_japanese, is_japanese, "123abc[]./&@^안녕😀🔥 \n");

    expect!(test_is_korean, is_korean, "안녕하세요세계");
    expect_not!(
        test_not_korean,
        is_korean,
        "123abc[]./&@^こんにちは你好😀🔥 \n"
    );

    expect!(test_is_number_forms, is_number_forms, "⅐\u{218f}");
    expect!(
        test_is_enclosed_alphanumerics,
        is_enclosed_alphanumerics,
        "①⓿"
    );
    expect!(
        test_is_cjk_compatibility_forms,
        is_cjk_compatibility_forms,
        "︰﹏"
    );
    expect!(
        test_is_cjk_compatibility,
        is_cjk_compatibility,
        "㌀㍿㎠㎪㏿"
    );
    expect!(
        test_is_enclosed_cjk_letters_and_months,
        is_enclosed_cjk_letters_and_months,
        "㈀㋿"
    );
    expect!(
        test_is_latin1_supplement,
        is_latin1_supplement,
        "\u{80}¥©®¼ÿ"
    );
    expect!(test_is_greek_and_coptic, is_greek_and_coptic, "ͰαβγϿ");
    expect!(test_is_common_symbols, is_common_symbols, "#$%&*+-/=@\\|~");
    expect!(test_is_open_parentheses, is_open_parentheses, "([{");
    expect!(test_is_close_parentheses, is_close_parentheses, ")]}");
    expect!(
        test_is_western_sentence_punctuation,
        is_western_sentence_punctuation,
        "!,.;?"
    );
    expect!(test_is_colon, is_colon, ":");
    expect!(test_is_quote, is_quote, "\"'");
}
