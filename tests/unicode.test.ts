import {
    describe, expect, it, test,
} from "vitest"
import { isChinese } from "../packages/qijs-legacy/src/cjk"
import {
    isAlphabet, isCJKUnifiedIdeographsExtensionC, isGreekAndCoptic, isHangulCompatibilityJamo, isHangulJamo,
    isHangulSyllables, isHiragana, isKatakana, isKatakanaPhoneticExtensions, isLatin1Supplement, isNumber,
    isNumberForms, requiresMoreThanTwoBytes,
} from "../packages/qijs-legacy/src/unicode"
import type { CJKOptions } from "../packages/qijs-legacy/src/type"


const options: CJKOptions = { range: "basic" }

describe("isAlphabet function", () => {
    test("Lowercase alphabet characters return true", () => {
        expect(isAlphabet("a".codePointAt(0)!)).toBe(true) // charCode: 0x61
        expect(isAlphabet("z".codePointAt(0)!)).toBe(true) // charCode: 0x7A
    })

    test("Uppercase alphabet characters return true", () => {
        expect(isAlphabet("A".codePointAt(0)!)).toBe(true) // charCode: 0x41
        expect(isAlphabet("Z".codePointAt(0)!)).toBe(true) // charCode: 0x5A
    })

    test("Non-alphabet characters return false", () => {
        expect(isAlphabet("1".codePointAt(0)!)).toBe(false) // charCode: 0x31
        expect(isAlphabet("@".codePointAt(0)!)).toBe(false) // charCode: 0x40
        expect(isAlphabet(" ".codePointAt(0)!)).toBe(false) // charCode: 0x20
    })

    test("should return false for characters outside the range of ", () => {
        expect(isAlphabet("@".codePointAt(0)!)).toBe(false) // charCode: 0x40
        expect(isAlphabet("{".codePointAt(0)!)).toBe(false) // charCode: 0x7B
    })
})

describe("isNumber function", () => {
    test("Numbers 0-9 should return true", () => {
        expect(isNumber("0".codePointAt(0)!)).toBe(true) // charCode: 0x30
        expect(isNumber("5".codePointAt(0)!)).toBe(true) // charCode: 0x35
        expect(isNumber("9".codePointAt(0)!)).toBe(true) // charCode: 0x39
    })

    test("Non-number characters should return false", () => {
        expect(isNumber("a".codePointAt(0)!)).toBe(false) // charCode: 0x61
        expect(isNumber("中".codePointAt(0)!)).toBe(false) // charCode: 0x4E2D
        expect(isNumber(" ".codePointAt(0)!)).toBe(false) // charCode: 0x20
    })

    test("Boundary case", () => {
        expect(isNumber("/".codePointAt(0)!)).toBe(false) // charCode: 0x2F
        expect(isNumber(":".codePointAt(0)!)).toBe(false) // charCode: 0x3A
        expect(isNumber("@".codePointAt(0)!)).toBe(false) // charCode: 0x40
        expect(isNumber("[".codePointAt(0)!)).toBe(false) // charCode: 0x5B
    })
})

describe("isChinese", () => {
    test("Valid Chinese characters should return true", () => {
        expect(isChinese("一".codePointAt(0)!, options)).toBe(true) // charCode: 0x4E00
        expect(isChinese("鿟".codePointAt(0)!, options)).toBe(true) // charCode: 0x9F2F
        expect(isChinese("汉".codePointAt(0)!, options)).toBe(true) // charCode: 0x6C49
    })

    test("Non-Chinese characters should return false", () => {
        expect(isChinese("a".codePointAt(0)!, options)).toBe(false) // charCode: 0x61
        expect(isChinese("@".codePointAt(0)!, options)).toBe(false) // charCode: 0x40
        expect(isChinese(" ".codePointAt(0)!, options)).toBe(false) // charCode: 0x20
    })

    test("Boundary cases", () => {
        // charCode: 0x4DFF
        expect(isChinese("䷿".codePointAt(0)!, options)).toBe(false)
        // charCode: 0xA000
        expect(isChinese("ꀀ".codePointAt(0)!, options)).toBe(false)
    })
})

describe("isNumberForms function", () => {
    it("should return true for Number Forms characters", () => {
        // ⅐ (U+2150)
        expect(isNumberForms("⅐".codePointAt(0)!)).toBe(true)
        // ↋ (U+21B3)
        expect(isNumberForms("↋".codePointAt(0)!)).toBe(true)
    })

    it("should return false for characters outside the range of Number Forms", () => {
        // ⅏ U+214F
        expect(isNumberForms("⅏".codePointAt(0)!)).toBe(false)
        // ← U+2190
        expect(isNumberForms("←".codePointAt(0)!)).toBe(false)
    })
})

describe("isLatin1Supplement function", () => {
    it("should return true for Latin1Supplement characters", () => {
        // ¡ U+00A1
        expect(isLatin1Supplement("¡".codePointAt(0)!)).toBe(true)
        // ¢ U+00A2
        expect(isLatin1Supplement("¢".codePointAt(0)!)).toBe(true)
        // £ U+00A3
        expect(isLatin1Supplement("£".codePointAt(0)!)).toBe(true)
        // ¶ U+00B6
        expect(isLatin1Supplement("¶".codePointAt(0)!)).toBe(true)
        // ® U+00AE
        expect(isLatin1Supplement("®".codePointAt(0)!)).toBe(true)
    })

    it("should return false for non-Latin1Supplement characters", () => {
        expect(isLatin1Supplement("a".codePointAt(0)!)).toBe(false)
        expect(isLatin1Supplement("0".codePointAt(0)!)).toBe(false)
        expect(isLatin1Supplement(" ".codePointAt(0)!)).toBe(false)
    })

    it("should return false for characters outside the range of Latin1Supplement", () => {
        //  0x00_7F
        expect(isLatin1Supplement(0x00_7F)).toBe(false)
        // Ā 0x01_00
        expect(isLatin1Supplement(0x01_00)).toBe(false)
    })
})

describe("isGreekAndCoptic function", () => {
    it("should return true for characters in the Greek and Coptic Unicode range", () => {
        // α U+03B1
        expect(isGreekAndCoptic("α".codePointAt(0)!)).toBe(true)
        // β U+03B2
        expect(isGreekAndCoptic("β".codePointAt(0)!)).toBe(true)
        // γ U+03B3
        expect(isGreekAndCoptic("γ".codePointAt(0)!)).toBe(true)
    })

    it("should return false for characters outside the Greek and Coptic Unicode range", () => {
        expect(isGreekAndCoptic("a".codePointAt(0)!)).toBe(false)
        expect(isGreekAndCoptic("A".codePointAt(0)!)).toBe(false)
        expect(isGreekAndCoptic("1".codePointAt(0)!)).toBe(false)
    })

    it("should return false for characters outside the range of Greek and Coptic", () => {
        // ͯ 0x036F
        expect(isGreekAndCoptic(0x03_6F)).toBe(false)
        // Ѐ 0x0400
        expect(isGreekAndCoptic(0x04_00)).toBe(false)
    })
})

describe("isHiragana function", () => {
    it("should return true for hiragana characters", () => {
        expect(isHiragana("あ".codePointAt(0)!)).toBe(true) // U+3042
        expect(isHiragana("い".codePointAt(0)!)).toBe(true) // U+3044
        expect(isHiragana("う".codePointAt(0)!)).toBe(true) // U+3046
    })

    it("should return false for characters outside the hiragana Unicode range", () => {
        expect(isHiragana("a".codePointAt(0)!)).toBe(false) // U+0061
        expect(isHiragana("A".codePointAt(0)!)).toBe(false) // U+0041
        expect(isHiragana("1".codePointAt(0)!)).toBe(false) // U+0031
    })

    it("should return false for characters outside the range of hiragana", () => {
        // 〿 U+303F
        expect(isHiragana(0x30_3F)).toBe(false)
        // ア U+30A0
        expect(isHiragana(0x30_A0)).toBe(false)
    })
})

describe("isKatakana function", () => {
    it("should return true for katakana characters", () => {
        expect(isKatakana("ア".codePointAt(0)!)).toBe(true)
        expect(isKatakana("イ".codePointAt(0)!)).toBe(true)
        expect(isKatakana("ウ".codePointAt(0)!)).toBe(true)
    })

    it("should return false for non-katakana characters", () => {
        expect(isKatakana("a".codePointAt(0)!)).toBe(false)
        expect(isKatakana("1".codePointAt(0)!)).toBe(false)
        expect(isKatakana(" ".codePointAt(0)!)).toBe(false)
    })
})

describe("isKatakanaPhoneticExtensions function", () => {
    it("should return true for katakana phonetic extensions characters", () => {
        // ヵ (U+31F0)
        expect(isKatakanaPhoneticExtensions("ㇰ".codePointAt(0)!)).toBe(true)
        // ヶ (U+31F9)
        expect(isKatakanaPhoneticExtensions("ㇹ".codePointAt(0)!)).toBe(true)
        // Test case 3: ヷ (U+31FF)
        expect(isKatakanaPhoneticExtensions("ㇿ".codePointAt(0)!)).toBe(true)
    })

    it("should return false for non-katakana phonetic extensions characters", () => {
        expect(isKatakanaPhoneticExtensions("a".codePointAt(0)!)).toBe(false)
        expect(isKatakanaPhoneticExtensions("1".codePointAt(0)!)).toBe(false)
        expect(isKatakanaPhoneticExtensions(" ".codePointAt(0)!)).toBe(false)
    })

    it("should return false for characters outside the range of katakana phonetic extensions", () => {
        // ㇯ 0x31EF
        expect(isKatakanaPhoneticExtensions(0x31_EF)).toBe(false)

        // ㈀ U+3200
        expect(isKatakanaPhoneticExtensions("㈀".codePointAt(0)!)).toBe(false)
    })
})

describe("isHangulSyllables function", () => {
    it("should return true for Hangul syllables", () => {
        expect(isHangulSyllables("가".codePointAt(0)!)).toBe(true)
        expect(isHangulSyllables("각".codePointAt(0)!)).toBe(true)
        expect(isHangulSyllables("갑".codePointAt(0)!)).toBe(true)
    })

    it("should return false for non-Hangul characters", () => {
        expect(isHangulSyllables("a".codePointAt(0)!)).toBe(false)
        expect(isHangulSyllables("1".codePointAt(0)!)).toBe(false)
        expect(isHangulSyllables(" ".codePointAt(0)!)).toBe(false)
    })
})

describe("isHangulJamo function", () => {
    it("should return true for Hangul Jamo characters", () => {
        expect(isHangulJamo("ᄀ".codePointAt(0)!)).toBe(true)
        expect(isHangulJamo("ᄁ".codePointAt(0)!)).toBe(true)
        expect(isHangulJamo("ᄂ".codePointAt(0)!)).toBe(true)
    })

    it("should return false for non-Hangul Jamo characters", () => {
        expect(isHangulJamo("a".codePointAt(0)!)).toBe(false)
        expect(isHangulJamo("1".codePointAt(0)!)).toBe(false)
        expect(isHangulJamo(" ".codePointAt(0)!)).toBe(false)
    })
})

describe("isHangulCompatibilityJamo", () => {
    it("should return true for Hangul Compatibility Jamo characters", () => {
        expect(isHangulCompatibilityJamo("ㄱ".codePointAt(0)!)).toBe(true) // charCode: 0x3131
        expect(isHangulCompatibilityJamo("ㆍ".codePointAt(0)!)).toBe(true) // charCode: 0x318D
        expect(isHangulCompatibilityJamo("ㅎ".codePointAt(0)!)).toBe(true) // charCode: 0x314E
    })

    it("should return false for non-Hangul Compatibility Jamo characters", () => {
        expect(isHangulCompatibilityJamo("a".codePointAt(0)!)).toBe(false)
        expect(isHangulCompatibilityJamo("1".codePointAt(0)!)).toBe(false)
        expect(isHangulCompatibilityJamo(" ".codePointAt(0)!)).toBe(false)
    })

    it("boundary cases", () => {
        expect(isHangulCompatibilityJamo("ㄯ".codePointAt(0)!)).toBe(false) // charCode: 0x312F
        expect(isHangulCompatibilityJamo("㆐".codePointAt(0)!)).toBe(false) // charCode: 0x3190
    })
})


describe("isCJKUnifiedIdeographsExtensionC", () => {
    it("should return true for characters within the CJK Unified Ideographs Extension C range", () => {
        // 0x2A700 - Start of range
        expect(isCJKUnifiedIdeographsExtensionC("𪜀".codePointAt(0)!)).toBe(true)
        // in range
        expect(isCJKUnifiedIdeographsExtensionC("𪜘".codePointAt(0)!)).toBe(true)
        expect(isCJKUnifiedIdeographsExtensionC("𫜹".codePointAt(0)!)).toBe(true)
        // 0x2B73F - End of range
        expect(isCJKUnifiedIdeographsExtensionC(0x2_B7_3F)).toBe(true)
    })

    it("should return false for characters outside the CJK Unified Ideographs Extension C range", () => {
        // 0x2A6FF - Just before the start of range
        expect(isCJKUnifiedIdeographsExtensionC(0x2_A6_FF)).toBe(false)

        // 0x2B740 - Just after the end of range
        expect(isCJKUnifiedIdeographsExtensionC("𫝀".codePointAt(0)!)).toBe(false)

        // 0x4E00 - CJK Unified Ideographs (not Extension C)
        expect(isCJKUnifiedIdeographsExtensionC("一".codePointAt(0)!)).toBe(false)

        // 0x0041 - Latin letter 'A'
        expect(isCJKUnifiedIdeographsExtensionC("A".codePointAt(0)!)).toBe(false)
    })

    it("should handle boundary cases", () => {
        expect(isCJKUnifiedIdeographsExtensionC(0x2_A6_FF)).toBe(false)
        expect(isCJKUnifiedIdeographsExtensionC(0x2_B7_40)).toBe(false)
    })
})


describe("requiresFourBytes", () => {
    it("should return false for single-byte ASCII characters", () => {
    // 0x00 - Null character
        expect(requiresMoreThanTwoBytes("\0".codePointAt(0)!)).toBe(false)

        // 0x41 - Latin capital letter A
        expect(requiresMoreThanTwoBytes("A".codePointAt(0)!)).toBe(false)

        // 0x7A - Latin small letter z
        expect(requiresMoreThanTwoBytes("z".codePointAt(0)!)).toBe(false)

        // 0x7F - Delete character (last ASCII character)
        expect(requiresMoreThanTwoBytes("\u007F".codePointAt(0)!)).toBe(false)
    })

    it("should return true for multi-byte characters", () => {
        // expect(requiresMoreThanTwoBytes("ࠀ".codePointAt(0)!)).toBe(false)
        expect("ࠀ".slice(0, 1) === "ࠀ").toBeTruthy()
        // expect(requiresMoreThanTwoBytes("ࠦ".codePointAt(0)!)).toBe(false)
        expect("ࠦ".slice(0, 1) === "ࠦ").toBeTruthy()
        expect(requiresMoreThanTwoBytes("㐚".codePointAt(0)!)).toBe(false)
        expect("㐚".slice(0, 1) === "㐚").toBeTruthy()

        expect(requiresMoreThanTwoBytes("𐀀".codePointAt(0)!)).toBe(true)
        expect("𐀀".slice(0, 1) === "𐀀").toBeFalsy()
        // \ud840\udc01
        expect(requiresMoreThanTwoBytes("𠀁".codePointAt(0)!)).toBe(true)
        expect("𠀁".slice(0, 1) === "𠀁").toBeFalsy()
        expect(requiresMoreThanTwoBytes("𠁀".codePointAt(0)!)).toBe(true)
        expect("𠁀".slice(0, 1) === "𠁀").toBeFalsy()
        expect(`${"𠁀1".slice(0, 1)} ${"𠁀1".slice(1)}` === "𠁀 1").toBeFalsy()
        expect(requiresMoreThanTwoBytes("🌐".codePointAt(0)!)).toBe(true)
    })

    it("should handle boundary cases", () => {
        // 0x07_FF - Last double-byte character
        expect(requiresMoreThanTwoBytes(0x07_FF)).toBe(false)
    })

    it("should return true for characters outside the BMP", () => {
        // 0x1F600 - Grinning face emoji
        expect(requiresMoreThanTwoBytes("😀".codePointAt(0)!)).toBe(true)

        // 0x2A700 - CJK Unified Ideograph Extension C
        expect(requiresMoreThanTwoBytes("𪜀".codePointAt(0)!)).toBe(true)
    })

    it("should handle the maximum valid Unicode code point", () => {
    // 0x10FFFF - Maximum valid Unicode code point
        expect(requiresMoreThanTwoBytes(0x10_FF_FF)).toBe(true)
    })
})
