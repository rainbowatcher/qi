/* eslint-disable */
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
  readonly __wbg_get_spacingoptions_punctuations: (a: number) => number;
  readonly __wbg_set_spacingoptions_punctuations: (a: number, b: number) => void;
  readonly __wbg_options_free: (a: number) => void;
  readonly __wbg_get_options_spacing: (a: number) => number;
  readonly __wbg_set_options_spacing: (a: number, b: number) => void;
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
