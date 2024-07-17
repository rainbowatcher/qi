export function isAlphabet(codePoint: number): boolean { return codePoint >= 0x00_41 && codePoint <= 0x00_5A || codePoint >= 0x00_61 && codePoint <= 0x00_7A }

export function isNumber(codePoint: number): boolean { return codePoint >= 0x00_30 && codePoint <= 0x00_39 }

/**
 * common symbols exclude punctuations and parenthesis and quotes, which should add space between CJK characters
 * 0x00_23 #
 * 0x00_24 $
 * 0x00_25 %
 * 0x00_26 &
 * 0x00_2A *
 * 0x00_2B +
 * 0x00_2D -
 * 0x00_2F /
 * 0x00_3D =
 * 0x00_40 @
 * 0x00_5C \
 * 0x00_7C |
 * 0x00_7E ~
 *
 */
export function isCommonSymbols(codePoint: number): boolean {
    return [
        0x00_23, 0x00_24, 0x00_25, 0x00_26, 0x00_2A, 0x00_2B, 0x00_2D, 0x00_2F, 0x00_3D, 0x00_40, 0x00_5C, 0x00_7C, 0x00_7E,
    ].includes(codePoint)
}

/**
 * 0x00_28 (
 * 0x00_3C <
 * 0x00_5B [
 * 0x00_7B {
 * 0x30_08 〈
 * 0x30_0A 《
 * 0x30_0C 「
 * 0x30_0E 『
 * 0x30_10 【
 * 0x30_14 〔
 * 0x30_16 〖
 * 0x30_18 〘
 * 0x30_1A 〚
 * 0xFE_59 ﹙
 * 0xFE_5B ﹛
 * 0xFE_5D ﹝
 * 0xFE_64 ﹤
 * 0xFF_08 （
 * 0xFF_1C ＜
 * 0xFF_3B ［
 * 0xFF_5B ｛
 * 0xFF_5F ｟
 * 0xFF_62 ｢
 */
export function isOpenParenthesis(codePoint: number): boolean {
    return [
        // eslint-disable-next-line style-js/array-element-newline
        0x00_28, 0x00_3C, 0x00_5B, 0x00_7B, 0x30_08, 0x30_0A, 0x30_0C, 0x30_0E, 0x30_10, 0x30_14, 0x30_16,
        // eslint-disable-next-line style-js/array-element-newline
        0x30_18, 0x30_1A, 0xFE_59, 0xFE_5B, 0xFE_5D, 0xFE_64, 0xFF_08, 0xFF_1C, 0xFF_3B, 0xFF_5B, 0xFF_5F, 0xFF_62,
    ].includes(codePoint)
}

export function isCloseParenthesis(codePoint: number): boolean {
    return [
        // eslint-disable-next-line style-js/array-element-newline
        0x00_29, 0x00_3E, 0x00_5D, 0x00_7D, 0x30_09, 0x30_0B, 0x30_0D, 0x30_0F, 0x30_11, 0x30_15, 0x30_17,
        // eslint-disable-next-line style-js/array-element-newline
        0x30_19, 0x30_1B, 0xFE_5A, 0xFE_5C, 0xFE_5E, 0xFE_65, 0xFF_09, 0xFF_1D, 0xFF_3C, 0xFF_5C, 0xFF_60, 0xFF_63,
    ].includes(codePoint)
}

export function isNumberForms(codePoint: number): boolean { return 0x21_50 <= codePoint && codePoint <= 0x21_8F }

export function isLatin1Supplement(codePoint: number): boolean { return 0x00_80 <= codePoint && codePoint <= 0x00_FF }

export function isGreekAndCoptic(codePoint: number): boolean { return 0x03_70 <= codePoint && codePoint <= 0x03_FF }

export function isHiragana(codePoint: number): boolean { return 0x30_40 <= codePoint && codePoint <= 0x30_9F }

export function isKatakana(codePoint: number): boolean { return 0x30_A0 <= codePoint && codePoint <= 0x30_FF }

export function isKatakanaPhoneticExtensions(codePoint: number): boolean { return 0x31_F0 <= codePoint && codePoint <= 0x31_FF }

export function isHangulSyllables(codePoint: number): boolean { return 0xAC_00 <= codePoint && codePoint <= 0xD7_AF }

export function isHangulJamo(codePoint: number): boolean { return 0x11_00 <= codePoint && codePoint <= 0x11_FF }

export function isHangulCompatibilityJamo(codePoint: number): boolean { return 0x31_30 <= codePoint && codePoint <= 0x31_8F }

export function isHangulJamoExtendedA(codePoint: number): boolean { return 0xA9_60 <= codePoint && codePoint <= 0xA9_7F }

export function isHangulJamoExtendedB(codePoint: number): boolean { return 0xD7_B0 <= codePoint && codePoint <= 0xD7_FF }

export function isCJKUnifiedIdeographs(codePoint: number): boolean { return 0x4E_00 <= codePoint && codePoint <= 0x9F_FF }

export function isCJKRadicalsSupplement(codePoint: number): boolean { return 0x2E_80 <= codePoint && codePoint <= 0x2E_FF }

export function isCJKStrokes(codePoint: number): boolean { return 0x31_C0 <= codePoint && codePoint <= 0x31_EF }

export function isCJKUnifiedIdeographsExtensionA(codePoint: number): boolean { return 0x34_00 <= codePoint && codePoint <= 0x4D_BF }

export function isCJKUnifiedIdeographsExtensionB(codePoint: number): boolean { return 0x2_00_00 <= codePoint && codePoint <= 0x2_A6_DF }

export function isCJKUnifiedIdeographsExtensionC(codePoint: number): boolean { return 0x2_A7_00 <= codePoint && codePoint <= 0x2_B7_3F }

export function isCJKUnifiedIdeographsExtensionD(codePoint: number): boolean { return 0x2_B7_40 <= codePoint && codePoint <= 0x2_B8_1F }

export function isCJKUnifiedIdeographsExtensionE(codePoint: number): boolean { return 0x2_B8_20 <= codePoint && codePoint <= 0x2_CE_AF }

export function isCJKUnifiedIdeographsExtensionF(codePoint: number): boolean { return 0x2_CE_B0 <= codePoint && codePoint <= 0x2_EB_EF }

export function isCJKUnifiedIdeographsExtensionG(codePoint: number): boolean { return 0x3_00_00 <= codePoint && codePoint <= 0x3_13_4F }

export function isCJKCompatibilityIdeographs(codePoint: number): boolean { return 0xF9_00 <= codePoint && codePoint <= 0xFA_FF }

export function isCJKCompatibilityIdeographsSupplement(codePoint: number): boolean { return 0x2_F8_00 <= codePoint && codePoint <= 0x2_FA_1F }

export function isEnclosedCJKLettersAndMonths(codePoint: number): boolean { return 0x32_00 <= codePoint && codePoint <= 0x32_FF }

export function isEnclosedAlphanumerics(codePoint: number): boolean { return 0x24_60 <= codePoint && codePoint <= 0x24_FF }

export function isEnclosedAlphanumericsSupplement(codePoint: number): boolean { return 0x1_F1_00 <= codePoint && codePoint <= 0x1_F1_FF }

export function isEnclosedIdeographicSupplement(codePoint: number): boolean { return 0x1_F2_00 <= codePoint && codePoint <= 0x1_F2_FF }

export function isCurrencySymbols(codePoint: number): boolean { return 0x20_A0 <= codePoint && codePoint <= 0x20_CF }

export function isCJKCompatibilityForms(codePoint: number): boolean { return 0xFE_30 <= codePoint && codePoint <= 0xFE_4F }

export function isKangxiRadicals(codePoint: number): boolean { return 0x2F_00 <= codePoint && codePoint <= 0x2F_DF }

export function isBopomofo(codePoint: number): boolean { return 0x31_00 <= codePoint && codePoint <= 0x31_2F }

export function isBopomofoExtended(codePoint: number): boolean { return 0x31_A0 <= codePoint && codePoint <= 0x31_BF }

/**
 * it detect character that requires more than 2 bytes in UTF-8
 */
export function requiresMoreThanTwoBytes(codePoint: number): boolean { return codePoint >= 0xFF_FF }
