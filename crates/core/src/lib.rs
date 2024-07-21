mod char_type;
pub mod range;
mod spacing;
pub mod table;
pub mod util;

use char_type::get_char_type;
use spacing::spacing;
use wasm_bindgen::prelude::wasm_bindgen;

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

const DEFAULT_OPTIONS: Options = Options {
    spacing: Some(SpacingOptions { punctuations: true }),
};

#[wasm_bindgen]
pub fn format(text: &str, options: Option<Options>) -> String {
    if text.is_empty() {
        return String::new();
    }
    let mut formatted = String::with_capacity(text.len() * 11 / 10);
    let mut chars = text.chars().peekable();

    let first_char = chars.next().expect("should have at least one char");
    formatted.push(first_char);
    let mut pre_char = first_char;
    let mut pre_char_type = get_char_type(first_char);

    let spacing_opts = options.and_then(|o| o.spacing);

    for cur_char in chars {
        let cur_char_type = get_char_type(cur_char);
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
