use std::collections::HashSet;

use lazy_static::lazy_static;

use crate::table::{
    BOPOMOFO, BOPOMOFO_EXTENDED, CJK_COMPATIBILITY_IDEOGRAPHS,
    CJK_COMPATIBILITY_IDEOGRAPHS_SUPPLEMENT, CJK_RADICALS_SUPPLEMENT, CJK_STROKES,
    CJK_UNIFIED_IDEOGRAPHS, CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A, CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B,
    CJK_UNIFIED_IDEOGRAPHS_EXTENSION_C, CJK_UNIFIED_IDEOGRAPHS_EXTENSION_D,
    CJK_UNIFIED_IDEOGRAPHS_EXTENSION_E, CJK_UNIFIED_IDEOGRAPHS_EXTENSION_F,
    CJK_UNIFIED_IDEOGRAPHS_EXTENSION_G, CJK_UNIFIED_IDEOGRAPHS_EXTENSION_H,
    CJK_UNIFIED_IDEOGRAPHS_EXTENSION_I, HANGUL_COMPATIBILITY_JAMO, HANGUL_JAMO,
    HANGUL_JAMO_EXTENDED_A, HANGUL_JAMO_EXTENDED_B, HANGUL_SYLLABLES, HIRAGANA, KANGXI_RADICALS,
    KATAKANA, KATAKANA_PHONETIC_EXTENSIONS,
};

pub const R_CHINESE: [(char, char); 17] = [
    CJK_RADICALS_SUPPLEMENT,                 // 2e80 - 2eff
    KANGXI_RADICALS,                         // 2f00 - 2fdf
    BOPOMOFO,                                // 3100 - 312f
    BOPOMOFO_EXTENDED,                       // 31a0 - 31bf
    CJK_STROKES,                             // 31c0 - 31ef
    CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A,      // 3400 - 4dbf
    CJK_UNIFIED_IDEOGRAPHS,                  // 4e00 - 9fff
    CJK_COMPATIBILITY_IDEOGRAPHS,            // f900 - faff
    CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B,      // 20000 - 2a6df
    CJK_UNIFIED_IDEOGRAPHS_EXTENSION_C,      // 2a700 - 2b73f
    CJK_UNIFIED_IDEOGRAPHS_EXTENSION_D,      // 2b740 - 2b81f
    CJK_UNIFIED_IDEOGRAPHS_EXTENSION_E,      // 2b820 - 2ceaf
    CJK_UNIFIED_IDEOGRAPHS_EXTENSION_F,      // 2ceb0 - 2ebef
    CJK_UNIFIED_IDEOGRAPHS_EXTENSION_I,      // 2ebf0 - 2ee5f
    CJK_COMPATIBILITY_IDEOGRAPHS_SUPPLEMENT, // 2f800 - 2fa1f
    CJK_UNIFIED_IDEOGRAPHS_EXTENSION_G,      // 30000 - 3134f
    CJK_UNIFIED_IDEOGRAPHS_EXTENSION_H,      // 31350 - 323af
];

pub const R_JAPANESE: [(char, char); 3] = [
    HIRAGANA,                     // 3040 - 309f
    KATAKANA,                     // 30a0 - 30ff
    KATAKANA_PHONETIC_EXTENSIONS, // 31f0 - 31ff
];

pub const R_KOREAN: [(char, char); 5] = [
    HANGUL_JAMO,               // 1100 - 11ff
    HANGUL_COMPATIBILITY_JAMO, // 3130 - 318f
    HANGUL_JAMO_EXTENDED_A,    // a960 - a97f
    HANGUL_SYLLABLES,          // ac00 - d7af
    HANGUL_JAMO_EXTENDED_B,    // d7b0 - d7ff
];

lazy_static! {
    /// open punctuations
    ///
    /// 0x00_28 (
    /// 0x00_3C <
    /// 0x00_5B [
    /// 0x00_7B {
    /// 0x30_08 〈
    /// 0x30_0A 《
    /// 0x30_0C 「
    /// 0x30_0E 『
    /// 0x30_10 【
    /// 0x30_14 〔
    /// 0x30_16 〖
    /// 0x30_18 〘
    /// 0x30_1A 〚
    /// 0xFE_59 ﹙
    /// 0xFE_5B ﹛
    /// 0xFE_5D ﹝
    /// 0xFE_64 ﹤
    /// 0xFF_08 （
    /// 0xFF_1C ＜
    /// 0xFF_3B ［
    /// 0xFF_5B ｛
    /// 0xFF_5F ｟
    /// 0xFF_62 ｢
    ///
    pub static ref R_OPEN_PARENTHESES: HashSet<char> = [
        '\u{0028}', '\u{003c}', '\u{005b}', '\u{007b}', '\u{3008}', '\u{300a}', '\u{300c}',
        '\u{300e}', '\u{3010}', '\u{3014}', '\u{3016}', '\u{3018}', '\u{301a}', '\u{fe59}',
        '\u{fe5b}', '\u{fe5d}', '\u{fe64}', '\u{ff08}', '\u{ff1c}', '\u{ff3b}', '\u{ff5b}',
        '\u{ff5f}', '\u{ff62}'
    ]
    .into_iter()
    .collect();
}

lazy_static! {
    pub static ref R_CLOSE_PARENTHESES: HashSet<char> = [
        '\u{0029}', '\u{003e}', '\u{005d}', '\u{007d}', '\u{3009}', '\u{300b}', '\u{300d}',
        '\u{300f}', '\u{3011}', '\u{3015}', '\u{3017}', '\u{3019}', '\u{301b}', '\u{fe5a}',
        '\u{fe5c}', '\u{fe5e}', '\u{fe65}', '\u{ff09}', '\u{ff1d}', '\u{ff3c}', '\u{ff5c}',
        '\u{ff60}', '\u{ff63}'
    ]
    .into_iter()
    .collect();
}

lazy_static! {
    /// common symbols exclude punctuations and parenthesis and quotes, which should add space between CJK u32acters
    ///
    /// 0x00_23 #
    /// 0x00_24 $
    /// 0x00_25 %
    /// 0x00_26 &
    /// 0x00_2A *
    /// 0x00_2B +
    /// 0x00_2D -
    /// 0x00_2F /
    /// 0x00_3D =
    /// 0x00_40 @
    /// 0x00_5C \
    /// 0x00_7C |
    /// 0x00_7E ~
    ///
    pub static ref R_COMMON_SYMBOLS: HashSet<char> = [
        '\u{0023}', '\u{0024}', '\u{0025}', '\u{0026}', '\u{002a}', '\u{002b}', '\u{002d}',
        '\u{002f}', '\u{003d}', '\u{0040}', '\u{005c}', '\u{007c}', '\u{007e}',
    ]
    .into_iter()
    .collect();
}

lazy_static! {
    /// western sentence punctuations
    /// 0x00_21 !
    /// 0x00_2C ,
    /// 0x00_2E .
    /// 0x00_3B ;
    /// 0x00_3F ?
    ///
    pub static ref R_WESTERN_SENTENCE_PUNCTUATIONS: HashSet<char> =
        ['\u{0021}', '\u{002c}', '\u{002e}', '\u{003b}', '\u{003f}']
            .into_iter()
            .collect();
}

lazy_static! {
    /// quotes
    /// 0x00_22 "
    /// 0x00_27 '
    /// 0x00_60 `
    ///
    pub static ref R_QUOTES: HashSet<char> =
        ['\u{0022}', '\u{0027}', '\u{0060}'].into_iter().collect();
}
