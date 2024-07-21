use std::convert::Into;
use wasm_bindgen::prelude::wasm_bindgen;

use crate::util::is_cjk_extended;

#[allow(clippy::upper_case_acronyms)]
#[derive(PartialEq, Debug, Copy, Clone)]
#[wasm_bindgen]
pub enum CharType {
    Number = 0,
    Alphabet = 1,
    CJK = 2,
    Colon = 3,
    // CommonSymbol = 4,
    // Quote = 5,
    Other = 4,
}

const fn init_char_type(i: u32) -> CharType {
    match i {
        0x0030..=0x0039 => CharType::Number,
        0x0041..=0x005a | 0x0061..=0x007a => CharType::Alphabet,
        0x003a => CharType::Colon,
        0x1100..=0x11ff // HANGUL_JAMO
        | 0x2e80..=0x2eff // CJK_RADICALS_SUPPLEMENT
        | 0x2f00..=0x2fdf // KANGXI_RADICALS
        | 0x3040..=0x309f // HIRAGANA
        | 0x30a0..=0x30ff // KATAKANA
        | 0x3100..=0x312f // BOPOMOFO
        | 0x3130..=0x318f // HANGUL_COMPATIBILITY_JAMO
        | 0x31f0..=0x31ff // KATAKANA_PHONETIC_EXTENSIONS
        | 0x31a0..=0x31bf // BOPOMOFO_EXTENDED
        | 0x31c0..=0x31ef // CJK_STROKES
        | 0x3400..=0x4dbf // CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A
        | 0x4e00..=0x9fff // CJK_UNIFIED_IDEOGRAPHS
        | 0xa960..=0xa97f // HANGUL_JAMO_EXTENDED_A
        | 0xac00..=0xd7af // HANGUL_SYLLABLES
        | 0xd7b0..=0xd7ff // HANGUL_JAMO_EXTENDED_B
        | 0xf900..=0xfaff // CJK_COMPATIBILITY_IDEOGRAPHS
        => CharType::CJK,
        _ => CharType::Other,
    }
}

const fn init_char_type_table() -> [CharType; 65536] {
    let mut table = [CharType::Other; 65536];
    let mut i = 0;
    while i < 65536 {
        table[i] = init_char_type(i as u32);
        i += 1;
    }
    table
}

const CHAR_TYPE_TABLE: [CharType; 65536] = init_char_type_table();

pub fn get_char_type(c: char) -> CharType {
    let code = c as usize;
    if code < 65536 {
        CHAR_TYPE_TABLE[code]
    } else if is_cjk_extended(c) {
        CharType::CJK
    } else {
        CharType::Other
    }
}
