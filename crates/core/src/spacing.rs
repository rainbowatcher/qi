use crate::char_type::CharType;
use crate::util::{
    is_close_parentheses, is_common_symbols, is_enclosed_cjk_letters_and_months,
    is_greek_and_coptic, is_latin1_supplement, is_open_parentheses,
    is_western_sentence_punctuation,
};

use crate::{SpacingOptions, DEFAULT_OPTIONS};

pub fn spacing(
    pre_char: char,
    pre_type: &CharType,
    cur_char: char,
    cur_type: &CharType,
    options: Option<SpacingOptions>,
) -> bool {
    let spacing_opts = options.unwrap_or(DEFAULT_OPTIONS.spacing.unwrap());
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
