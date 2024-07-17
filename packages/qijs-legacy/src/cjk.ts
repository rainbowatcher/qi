import {
    isBopomofo, isBopomofoExtended, isCJKCompatibilityIdeographs, isCJKCompatibilityIdeographsSupplement, isCJKRadicalsSupplement,
    isCJKStrokes, isCJKUnifiedIdeographs, isCJKUnifiedIdeographsExtensionA, isCJKUnifiedIdeographsExtensionB,
    isCJKUnifiedIdeographsExtensionC, isCJKUnifiedIdeographsExtensionD, isCJKUnifiedIdeographsExtensionE,
    isCJKUnifiedIdeographsExtensionF, isCJKUnifiedIdeographsExtensionG, isHangulCompatibilityJamo, isHangulJamo,
    isHangulJamoExtendedA, isHangulJamoExtendedB, isHangulSyllables, isHiragana, isKangxiRadicals,
    isKatakana, isKatakanaPhoneticExtensions,
} from "./unicode"
import type { CJKOptions } from "./type.ts"


export function isChinese(charCode: number, options: CJKOptions): boolean {
    let isChinese = false
    if (options.chinese === false) return isChinese
    switch (options.range) {
        case "basic": {
            isChinese = isCJKUnifiedIdeographs(charCode)
            break
        }
        case "extended": {
            isChinese = isCJKUnifiedIdeographs(charCode)
            || isCJKStrokes(charCode)
            || isCJKRadicalsSupplement(charCode)
            || isCJKCompatibilityIdeographs(charCode)
            || isKangxiRadicals(charCode)
            || isBopomofo(charCode)
            || isBopomofoExtended(charCode)
            || isCJKCompatibilityIdeographsSupplement(charCode)
            || isCJKUnifiedIdeographsExtensionA(charCode)
            || isCJKUnifiedIdeographsExtensionB(charCode)
            || isCJKUnifiedIdeographsExtensionC(charCode)
            || isCJKUnifiedIdeographsExtensionD(charCode)
            || isCJKUnifiedIdeographsExtensionE(charCode)
            || isCJKUnifiedIdeographsExtensionF(charCode)
            || isCJKUnifiedIdeographsExtensionG(charCode)
            break
        }
    }
    return isChinese
}

function isJapanese(charCode: number, options: CJKOptions): boolean {
    let isJapanese = false
    if (options.japanese === false) return isJapanese
    switch (options.range) {
        case "basic": {
            isJapanese = isCJKUnifiedIdeographs(charCode)
            || isHiragana(charCode)
            || isKatakana(charCode)
            break
        }
        case "extended": {
            isJapanese = isCJKUnifiedIdeographs(charCode)
            || isCJKRadicalsSupplement(charCode)
            || isCJKCompatibilityIdeographs(charCode)
            || isCJKCompatibilityIdeographsSupplement(charCode)
            || isHiragana(charCode)
            || isKatakana(charCode)
            || isKatakanaPhoneticExtensions(charCode)
            break
        }
    }
    return isJapanese
}

function isKorean(charCode: number, options: CJKOptions): boolean {
    let isKorean = false
    if (options.korean === false) return isKorean
    switch (options.range) {
        case "basic": {
            isKorean = isHangulJamo(charCode)
            || isHangulSyllables(charCode)
            break
        }
        case "extended": {
            isKorean = isHangulJamo(charCode)
            || isHangulSyllables(charCode)
            || isHangulCompatibilityJamo(charCode)
            || isHangulJamoExtendedA(charCode)
            || isHangulJamoExtendedB(charCode)
            break
        }
    }
    return isKorean
}

export function isCJK(charCode: number, options?: CJKOptions): boolean {
    const defaultOptions: CJKOptions = {
        chinese: true,
        japanese: true,
        korean: true,
        range: "basic",
    }
    const _options = {
        ...defaultOptions,
        ...options,
    }

    if (typeof options?.range === "function") {
        return options.range(charCode)
    }

    return isJapanese(charCode, _options) || isChinese(charCode, _options) || isKorean(charCode, _options)
}
