type WordRange = "basic" | "extended" | ((name: number) => boolean)

export type CJKOptions = {
    /**
     * the word amount of Chinese
     * @default true
     */
    chinese?: boolean

    /**
     * the word amount of Japanese
     * @default true
     */
    japanese?: boolean

    /**
     * the word amount of Korean
     * @default true
     */
    korean?: boolean

    /**
     * the word amounts of CJK
     * @default "basic"
     */
    range?: WordRange
}

export type NumberOptions = {
    /**
     * add space between CJK and Number Forms
     * example: ⅠⅡⅢ ⅐ ⅑ ⅒ ⅓
     * @default true
     */
    forms?: boolean

    /**
     * add space between CJK and numbers
     * @default true
     */
    normal?: boolean
}

export type FormatOptions = {
    /**
     * add space between CJK and Alphabets
     * @default true
     */
    alphabet?: boolean

    /**
     * specify the range of CJK
     */
    cjk?: CJKOptions

    /**
     * add space between CJK and CJK compatibility Forms
     * @default false
     */
    cjkCompatibilityForms?: boolean

    /**
     * add space between CJK and Enclosed CJK Letters and Months
     * @default true
     */
    enclosedCjk?: boolean

    /**
     * add space between CJK and Greek and Coptic
     * @default true
     */
    greek?: boolean

    /**
     * add spaces between CJK and Latin-1 Supplement
     * @default true
     */
    latin1Supplement?: boolean

    /**
     * add space between CJK and numbers
     * @default true
     */
    numbers?: NumberOptions | boolean
}
