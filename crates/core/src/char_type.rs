use std::convert::Into;
use wasm_bindgen::prelude::wasm_bindgen;

use crate::util::is_cjk_extended;

#[allow(clippy::upper_case_acronyms)]
#[derive(PartialEq, Debug, Copy, Clone)]
#[wasm_bindgen]
pub enum CharType {
    Number = 0,
    Whitespace = 1,
    Alphabet = 2,
    CJK = 3,
    Colon = 4,
    NumberForm = 5,
    CJKCompatibilityForm = 6,
    EnclosedCJKLettersAndMonths = 7,
    Latin1Supplement = 8,
    GreekAndCoptic = 9,
    EnclosedAlphanumerics = 10,
    CJKCompatibility = 11,
    CommonSymbol = 12,
    OpenParenthese = 13,
    CloseParenthese = 14,
    WesternSentencePunctuation = 15,
    Quote = 16,
    Other = 99,
}

const fn init_char_type(i: u32) -> CharType {
    match i {
        0x0020 => CharType::Whitespace,
        0x0022 | 0x0027 | 0x0060 => CharType::Quote,
        0x0021 | 0x002C | 0x002E | 0x003B | 0x003F => CharType::WesternSentencePunctuation,
        0x0023 | 0x0024 | 0x0025 | 0x0026 | 0x002A | 0x002B | 0x002D
        | 0x002F | 0x003D | 0x0040 | 0x005C | 0x007C | 0x007E => CharType::CommonSymbol,
        0x0028 | 0x003C | 0x005B | 0x007B | 0x3008 | 0x300A | 0x300C
        | 0x300E | 0x3010 | 0x3014 | 0x3016 | 0x3018 | 0x301A | 0xFE59
        | 0xFE5B | 0xFE5D | 0xFE64 | 0xFF08 | 0xFF1C | 0xFF3B | 0xFF5B
        | 0xFF5F | 0xFF62 => CharType::OpenParenthese,
        0x0029 | 0x003E | 0x005D | 0x007D | 0x3009 | 0x300B | 0x300D
        | 0x300F | 0x3011 | 0x3015 | 0x3017 | 0x3019 | 0x301B | 0xFE5A
        | 0xFE5C | 0xFE5E | 0xFE65 | 0xFF09 | 0xFF1D | 0xFF3C | 0xFF5C
        | 0xFF60 | 0xFF63 => CharType::CloseParenthese,
        0x0030..=0x0039 => CharType::Number,
        0x0041..=0x005A | 0x0061..=0x007A => CharType::Alphabet,
        0x003A => CharType::Colon,
        0x0080..=0x00ff => CharType::Latin1Supplement,
        0x0370..=0x03ff => CharType::GreekAndCoptic,
        0x1100..=0x11FF // HANGUL_JAMO
        | 0x2E80..=0x2EFF // CJK_RADICALS_SUPPLEMENT
        | 0x2F00..=0x2FDF // KANGXI_RADICALS
        | 0x3040..=0x309F // HIRAGANA
        | 0x30A0..=0x30FF // KATAKANA
        | 0x3100..=0x312F // BOPOMOFO
        | 0x3130..=0x318F // HANGUL_COMPATIBILITY_JAMO
        | 0x31F0..=0x31FF // KATAKANA_PHONETIC_EXTENSIONS
        | 0x31A0..=0x31BF // BOPOMOFO_EXTENDED
        | 0x31C0..=0x31EF // CJK_STROKES
        | 0x3400..=0x4DBF // CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A
        | 0x4E00..=0x9FFF // CJK_UNIFIED_IDEOGRAPHS
        | 0xA960..=0xA97F // HANGUL_JAMO_EXTENDED_A
        | 0xAC00..=0xD7AF // HANGUL_SYLLABLES
        | 0xD7B0..=0xD7FF // HANGUL_JAMO_EXTENDED_B
        | 0xF900..=0xFAFF // CJK_COMPATIBILITY_IDEOGRAPHS
        => CharType::CJK,
        0x3200..=0x32ff => CharType::EnclosedCJKLettersAndMonths,
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
