pub mod range;
pub mod table;
pub mod util;

use util::{
    is_cjk, is_close_parentheses, is_colon, is_common_symbols, is_enclosed_cjk_letters_and_months,
    is_greek_and_coptic, is_latin1_supplement, is_open_parentheses,
    is_western_sentence_punctuation,
};
use wasm_bindgen::prelude::wasm_bindgen;

#[derive(PartialEq, Debug)]
#[wasm_bindgen]
pub enum CharType {
    Number,
    Alphabet,
    CJK,
    Colon,
    Other,
}

#[derive(Debug, Copy, Clone)]
#[wasm_bindgen]
pub struct SpacingOptions {
    pub punctuations: bool,
}

#[derive(Debug, Clone, Copy)]
#[wasm_bindgen]
pub struct Options {
    pub spacing: Option<SpacingOptions>,
}

#[wasm_bindgen]
pub fn get_char_type(c: char) -> CharType {
    if c.is_ascii_digit() {
        CharType::Number
    } else if c.is_ascii_alphabetic() {
        CharType::Alphabet
    } else if is_cjk(c) {
        CharType::CJK
    } else if is_colon(c) {
        CharType::Colon
    } else {
        CharType::Other
    }
}

fn spacing(
    pre_char: char,
    pre_type: &CharType,
    cur_char: char,
    cur_type: &CharType,
    options: Option<SpacingOptions>,
) -> bool {
    let spacing_opts = options.expect("spacing options should be set");
    match (pre_type, cur_type) {
        (CharType::Alphabet, CharType::Number) => false,
        (CharType::Alphabet, CharType::CJK) => true,
        (CharType::Alphabet, CharType::Other) => is_open_parentheses(cur_char),
        (CharType::CJK, CharType::Number) => true,
        (CharType::CJK, CharType::Alphabet) => true,
        (CharType::CJK, CharType::Other) => {
            is_common_symbols(cur_char)
                || is_latin1_supplement(cur_char)
                || is_greek_and_coptic(cur_char)
                || is_enclosed_cjk_letters_and_months(cur_char)
                || is_open_parentheses(cur_char)
        }
        (CharType::Number, CharType::Alphabet) => false,
        (CharType::Number, CharType::CJK) => true,
        (CharType::Number, CharType::Other) => false,
        (CharType::Other, CharType::CJK) => {
            is_common_symbols(pre_char)
                || is_latin1_supplement(pre_char)
                || is_greek_and_coptic(pre_char)
                || is_enclosed_cjk_letters_and_months(pre_char)
                || is_close_parentheses(pre_char)
                || (spacing_opts.punctuations && is_western_sentence_punctuation(pre_char))
        }
        (CharType::Other, CharType::Alphabet) => {
            is_close_parentheses(pre_char)
                || (spacing_opts.punctuations && is_western_sentence_punctuation(pre_char))
        }
        (CharType::Other, CharType::Number) => {
            spacing_opts.punctuations && is_western_sentence_punctuation(pre_char)
        }
        (CharType::Colon, CharType::Alphabet | CharType::CJK | CharType::Number) => true,
        (CharType::Colon, CharType::Other) => !cur_char.is_whitespace(),
        _ => false,
    }
}

#[wasm_bindgen]
pub fn format(text: &str, options: Option<Options>) -> String {
    let mut formatted = String::new();
    if text.is_empty() {
        return formatted;
    }
    let mut chars = text.chars();
    let first_char = chars.next().expect("should have at least one char");
    let mut pre_char = first_char;
    formatted.push(first_char);
    let mut pre_char_type = get_char_type(first_char);
    for cur_char in chars {
        let cur_char_type = get_char_type(cur_char);
        let default_spacing_opts = Some(SpacingOptions { punctuations: true });
        let spacing_opts = options.map_or(default_spacing_opts, |o| o.spacing);
        if cur_char_type != pre_char_type
            && spacing(
                pre_char,
                &pre_char_type,
                cur_char,
                &cur_char_type,
                spacing_opts,
            )
        {
            formatted.push('\u{0020}');
        }
        formatted.push(cur_char);
        pre_char_type = cur_char_type;
        pre_char = cur_char;
    }

    formatted
}
