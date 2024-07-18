/* eslint-disable */
/**
* @param {string} c
* @returns {boolean}
*/
export function is_chinese(c: string): boolean;
/**
* @param {string} c
* @returns {boolean}
*/
export function is_japanese(c: string): boolean;
/**
* @param {string} c
* @returns {boolean}
*/
export function is_korean(c: string): boolean;
/**
* @param {string} c
* @returns {boolean}
*/
export function is_cjk(c: string): boolean;
/**
* @param {string} c
* @returns {boolean}
*/
export function is_number_forms(c: string): boolean;
/**
* @param {string} c
* @returns {boolean}
*/
export function is_cjk_compatibility_forms(c: string): boolean;
/**
* @param {string} c
* @returns {boolean}
*/
export function is_enclosed_cjk_letters_and_months(c: string): boolean;
/**
* @param {string} c
* @returns {boolean}
*/
export function is_latin1_supplement(c: string): boolean;
/**
* @param {string} c
* @returns {boolean}
*/
export function is_greek_and_coptic(c: string): boolean;
/**
* @param {string} c
* @returns {boolean}
*/
export function is_enclosed_alphanumerics(c: string): boolean;
/**
* @param {string} c
* @returns {boolean}
*/
export function is_cjk_compatibility(c: string): boolean;
/**
* @param {string} c
* @returns {boolean}
*/
export function is_common_symbols(c: string): boolean;
/**
* @param {string} c
* @returns {boolean}
*/
export function is_open_parentheses(c: string): boolean;
/**
* @param {string} c
* @returns {boolean}
*/
export function is_close_parentheses(c: string): boolean;
/**
* @param {string} c
* @returns {boolean}
*/
export function is_western_sentence_punctuation(c: string): boolean;
/**
* @param {string} c
* @returns {boolean}
*/
export function is_colon(c: string): boolean;
/**
* @param {string} c
* @returns {boolean}
*/
export function is_quote(c: string): boolean;
/**
* @param {string} c
* @returns {CharType}
*/
export function get_char_type(c: string): CharType;
/**
* @param {string} text
* @param {Options | undefined} [options]
* @returns {string}
*/
export function format(text: string, options?: Options): string;
/**
*/
export enum CharType {
  Number = 0,
  Alphabet = 1,
  CJK = 2,
  Colon = 3,
  Other = 4,
}
/**
*/
export class Options {
  free(): void;
/**
*/
  spacing?: SpacingOptions;
}
/**
*/
export class SpacingOptions {
  free(): void;
/**
*/
  punctuations: boolean;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly is_chinese: (a: number) => number;
  readonly is_japanese: (a: number) => number;
  readonly is_korean: (a: number) => number;
  readonly is_cjk: (a: number) => number;
  readonly is_number_forms: (a: number) => number;
  readonly is_cjk_compatibility_forms: (a: number) => number;
  readonly is_enclosed_cjk_letters_and_months: (a: number) => number;
  readonly is_latin1_supplement: (a: number) => number;
  readonly is_greek_and_coptic: (a: number) => number;
  readonly is_enclosed_alphanumerics: (a: number) => number;
  readonly is_cjk_compatibility: (a: number) => number;
  readonly is_common_symbols: (a: number) => number;
  readonly is_open_parentheses: (a: number) => number;
  readonly is_close_parentheses: (a: number) => number;
  readonly is_western_sentence_punctuation: (a: number) => number;
  readonly is_colon: (a: number) => number;
  readonly is_quote: (a: number) => number;
  readonly __wbg_get_spacingoptions_punctuations: (a: number) => number;
  readonly __wbg_set_spacingoptions_punctuations: (a: number, b: number) => void;
  readonly __wbg_options_free: (a: number) => void;
  readonly __wbg_get_options_spacing: (a: number) => number;
  readonly __wbg_set_options_spacing: (a: number, b: number) => void;
  readonly get_char_type: (a: number) => number;
  readonly format: (a: number, b: number, c: number, d: number) => void;
  readonly __wbg_spacingoptions_free: (a: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_export_0: (a: number, b: number) => number;
  readonly __wbindgen_export_1: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
