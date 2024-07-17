import { isCJK } from "./cjk"
import {
    isAlphabet, isCJKCompatibilityForms, isCloseParenthesis, isCommonSymbols,
    isEnclosedCJKLettersAndMonths, isGreekAndCoptic, isLatin1Supplement,
    isNumber,
    isNumberForms,
    isOpenParenthesis,
    requiresMoreThanTwoBytes,
} from "./unicode"
import type { FormatOptions } from "./type"


function makeConditions(options?: FormatOptions): [(codePoint: number) => boolean, (codePoint: number) => boolean] {
    const {
        alphabet = true,
        cjkCompatibilityForms = false,
        enclosedCjk = true,
        greek = true,
        latin1Supplement = true,
        numbers = true,
    } = options ?? {}

    function addSpaceAround(): Array<(codePoint: number) => boolean> {
        const conditions: Array<(codePoint: number) => boolean> = []
        alphabet && conditions.push(isAlphabet)
        if (typeof numbers === "object") {
            numbers.forms && conditions.push(isNumberForms)
            numbers.normal && conditions.push(isNumber)
        } else {
            numbers && conditions.push(isNumber, isNumberForms)
        }
        enclosedCjk && conditions.push(isEnclosedCJKLettersAndMonths)
        cjkCompatibilityForms && conditions.push(isCJKCompatibilityForms)
        latin1Supplement && conditions.push(isLatin1Supplement)
        greek && conditions.push(isGreekAndCoptic)
        conditions.push(isCommonSymbols)
        return conditions
    }

    function shouldAddSpaceBefore(codePoint: number) {
        const conditions = addSpaceAround()
        conditions.push(isOpenParenthesis)
        return conditions.some(fn => fn(codePoint))
    }

    function shouldAddSpaceAfter(codePoint: number) {
        const conditions = addSpaceAround()
        conditions.push(isCloseParenthesis)
        return conditions.some(fn => fn(codePoint))
    }

    return [shouldAddSpaceBefore, shouldAddSpaceAfter]
}

export function format(text: string, options?: FormatOptions): string {
    if (!text) return ""
    let newText = ""
    let preAppendIdx = 0
    let preCharType = detectCharType(text.codePointAt(0)!, options)
    const [shouldAddSpaceBefore, shouldAddSpaceAfter] = makeConditions(options)
    for (let i = 0; i < text.length; i++) {
        const curr = text.codePointAt(i)!
        const costTwoBytes = requiresMoreThanTwoBytes(curr)
        const currCharType = detectCharType(curr, options)
        if (preCharType !== currCharType) {
            if (currCharType === "cjk") {
                // curr codePoint is CJK, we check the previous codePoint
                const pre = text.codePointAt(i - 1)!
                if (shouldAddSpaceAfter(pre)) {
                    addSpace(i)
                }
            } else {
                // index behind CJK
                if (shouldAddSpaceBefore(curr)) {
                    addSpace(i)
                }
            }
            preCharType = currCharType
        }
        if (i === text.length - 1 && preAppendIdx < text.length) {
            newText += text.slice(preAppendIdx)
        }
        if (costTwoBytes) {
            i++
        }
    }
    return newText

    /**
     * add space before code point
     * @param i the index of code point
     */
    function addSpace(i: number) {
        // eslint-disable-next-line prefer-template
        newText = newText + text.slice(preAppendIdx, i) + " "
        preAppendIdx = i
    }
}

function detectCharType(curr: number, options?: FormatOptions) {
    let currCharType
    if (isCJK(curr, options?.cjk)) {
        currCharType = "cjk"
    } else {
        currCharType = "other"
    }
    return currCharType
}
