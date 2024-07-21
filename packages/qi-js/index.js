/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function _assertChar(c) {
    if (typeof(c) === 'number' && (c >= 0x110000 || (c >= 0xD800 && c < 0xE000))) throw new Error(`expected a valid Unicode scalar value, found ${c}`);
}
/**
* @param {string} c
* @returns {boolean}
*/
export function is_chinese(c) {
    const char0 = c.codePointAt(0);
    _assertChar(char0);
    const ret = wasm.is_chinese(char0);
    return ret !== 0;
}

/**
* @param {string} c
* @returns {boolean}
*/
export function is_japanese(c) {
    const char0 = c.codePointAt(0);
    _assertChar(char0);
    const ret = wasm.is_japanese(char0);
    return ret !== 0;
}

/**
* @param {string} c
* @returns {boolean}
*/
export function is_korean(c) {
    const char0 = c.codePointAt(0);
    _assertChar(char0);
    const ret = wasm.is_korean(char0);
    return ret !== 0;
}

/**
* @param {string} c
* @returns {boolean}
*/
export function is_cjk(c) {
    const char0 = c.codePointAt(0);
    _assertChar(char0);
    const ret = wasm.is_cjk(char0);
    return ret !== 0;
}

/**
* @param {string} c
* @returns {boolean}
*/
export function is_cjk_extended(c) {
    const char0 = c.codePointAt(0);
    _assertChar(char0);
    const ret = wasm.is_cjk_extended(char0);
    return ret !== 0;
}

/**
* @param {string} c
* @returns {boolean}
*/
export function is_number_forms(c) {
    const char0 = c.codePointAt(0);
    _assertChar(char0);
    const ret = wasm.is_number_forms(char0);
    return ret !== 0;
}

/**
* @param {string} c
* @returns {boolean}
*/
export function is_cjk_compatibility_forms(c) {
    const char0 = c.codePointAt(0);
    _assertChar(char0);
    const ret = wasm.is_cjk_compatibility_forms(char0);
    return ret !== 0;
}

/**
* @param {string} c
* @returns {boolean}
*/
export function is_enclosed_cjk_letters_and_months(c) {
    const char0 = c.codePointAt(0);
    _assertChar(char0);
    const ret = wasm.is_enclosed_cjk_letters_and_months(char0);
    return ret !== 0;
}

/**
* @param {string} c
* @returns {boolean}
*/
export function is_latin1_supplement(c) {
    const char0 = c.codePointAt(0);
    _assertChar(char0);
    const ret = wasm.is_latin1_supplement(char0);
    return ret !== 0;
}

/**
* @param {string} c
* @returns {boolean}
*/
export function is_greek_and_coptic(c) {
    const char0 = c.codePointAt(0);
    _assertChar(char0);
    const ret = wasm.is_greek_and_coptic(char0);
    return ret !== 0;
}

/**
* @param {string} c
* @returns {boolean}
*/
export function is_enclosed_alphanumerics(c) {
    const char0 = c.codePointAt(0);
    _assertChar(char0);
    const ret = wasm.is_enclosed_alphanumerics(char0);
    return ret !== 0;
}

/**
* @param {string} c
* @returns {boolean}
*/
export function is_cjk_compatibility(c) {
    const char0 = c.codePointAt(0);
    _assertChar(char0);
    const ret = wasm.is_cjk_compatibility(char0);
    return ret !== 0;
}

/**
* @param {string} c
* @returns {boolean}
*/
export function is_common_symbols(c) {
    const char0 = c.codePointAt(0);
    _assertChar(char0);
    const ret = wasm.is_common_symbols(char0);
    return ret !== 0;
}

/**
* @param {string} c
* @returns {boolean}
*/
export function is_open_parentheses(c) {
    const char0 = c.codePointAt(0);
    _assertChar(char0);
    const ret = wasm.is_open_parentheses(char0);
    return ret !== 0;
}

/**
* @param {string} c
* @returns {boolean}
*/
export function is_close_parentheses(c) {
    const char0 = c.codePointAt(0);
    _assertChar(char0);
    const ret = wasm.is_close_parentheses(char0);
    return ret !== 0;
}

/**
* @param {string} c
* @returns {boolean}
*/
export function is_western_sentence_punctuation(c) {
    const char0 = c.codePointAt(0);
    _assertChar(char0);
    const ret = wasm.is_western_sentence_punctuation(char0);
    return ret !== 0;
}

/**
* @param {string} c
* @returns {boolean}
*/
export function is_quote(c) {
    const char0 = c.codePointAt(0);
    _assertChar(char0);
    const ret = wasm.is_quote(char0);
    return ret !== 0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}
/**
* @param {string} text
* @param {Options | undefined} [options]
* @returns {string}
*/
export function format(text, options) {
    let deferred3_0;
    let deferred3_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(text, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len0 = WASM_VECTOR_LEN;
        let ptr1 = 0;
        if (!isLikeNone(options)) {
            _assertClass(options, Options);
            ptr1 = options.__destroy_into_raw();
        }
        wasm.format(retptr, ptr0, len0, ptr1);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        deferred3_0 = r0;
        deferred3_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export_2(deferred3_0, deferred3_1, 1);
    }
}

/**
*/
export const CharType = Object.freeze({ Number:0,"0":"Number",Alphabet:1,"1":"Alphabet",CJK:2,"2":"CJK",Colon:3,"3":"Colon",Other:4,"4":"Other", });

const OptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_options_free(ptr >>> 0));
/**
*/
export class Options {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        OptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_options_free(ptr);
    }
    /**
    * @returns {SpacingOptions | undefined}
    */
    get spacing() {
        const ret = wasm.__wbg_get_options_spacing(this.__wbg_ptr);
        return ret === 0 ? undefined : SpacingOptions.__wrap(ret);
    }
    /**
    * @param {SpacingOptions | undefined} [arg0]
    */
    set spacing(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, SpacingOptions);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_options_spacing(this.__wbg_ptr, ptr0);
    }
}

const SpacingOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_spacingoptions_free(ptr >>> 0));
/**
*/
export class SpacingOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SpacingOptions.prototype);
        obj.__wbg_ptr = ptr;
        SpacingOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SpacingOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_spacingoptions_free(ptr);
    }
    /**
    * @returns {boolean}
    */
    get punctuations() {
        const ret = wasm.__wbg_get_spacingoptions_punctuations(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set punctuations(arg0) {
        wasm.__wbg_set_spacingoptions_punctuations(this.__wbg_ptr, arg0);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, maybe_memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = null;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(input) {
    if (wasm !== undefined) return wasm;

    if (typeof input === 'undefined') {
        input = new URL('index_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        if (globalThis.process?.release?.name === "node") {
        const fs = (await import('fs')).default;
        input = fs.readFileSync(input);
        } else {
            input = fetch(input);
    }
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await input, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync }
export default __wbg_init;
