use crate::char_type::CharType;

use crate::{SpacingOptions, DEFAULT_OPTIONS};

pub fn spacing(pre_type: &CharType, cur_type: &CharType, options: Option<SpacingOptions>) -> bool {
    let spacing_opts = options.unwrap_or(DEFAULT_OPTIONS.spacing.unwrap());
    match (pre_type, cur_type) {
        (CharType::Alphabet, CharType::Number) => false,
        (CharType::Alphabet, CharType::CJK) => true,
        (CharType::Alphabet, CharType::OpenParenthese) => true,
        (CharType::CJK, CharType::Number) => true,
        (CharType::CJK, CharType::Alphabet) => true,
        (CharType::CJK, CharType::CommonSymbol) => true,
        (CharType::CJK, CharType::OpenParenthese) => true,
        (CharType::CJK, CharType::EnclosedCJKLettersAndMonths) => true,
        (CharType::CJK, CharType::GreekAndCoptic) => true,
        (CharType::CJK, CharType::Latin1Supplement) => true,
        (CharType::Number, CharType::Alphabet) => false,
        (CharType::Number, CharType::CJK) => true,
        (CharType::Number, CharType::Other) => false,
        (CharType::CommonSymbol, CharType::CJK) => true,
        (CharType::Latin1Supplement, CharType::CJK) => true,
        (CharType::GreekAndCoptic, CharType::CJK) => true,
        (CharType::CloseParenthese, CharType::CJK) => true,
        (CharType::CloseParenthese, CharType::Alphabet) => true,
        (CharType::WesternSentencePunctuation, CharType::CJK) => spacing_opts.punctuations,
        (CharType::WesternSentencePunctuation, CharType::Alphabet) => spacing_opts.punctuations,
        (CharType::WesternSentencePunctuation, CharType::Number) => spacing_opts.punctuations,
        (CharType::WesternSentencePunctuation, CharType::Other) => spacing_opts.punctuations,
        (CharType::EnclosedCJKLettersAndMonths, CharType::CJK) => true,
        (CharType::Colon, CharType::Whitespace) => false,
        (CharType::Colon, _) => true,
        _ => false,
    }
}
