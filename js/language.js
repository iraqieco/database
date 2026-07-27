/* ==========================================================================
   Iraqi Eco
   Language Manager
   ========================================================================== */

import { CONFIG } from "./config.js";
import { LANGUAGES } from "./constants.js";
import { getLanguage, setLanguage } from "./storage.js";
import { validateLanguage } from "./validator.js";

let dictionary = {};
let textMap = {};
/* ==========================================================================
   Get Current Language
   ========================================================================== */

export function currentLanguage() {

    return document.documentElement.lang;

}

/* ==========================================================================
   Translate
   ========================================================================== */

export function t(text, fallback = "") {

    // النظام الحالي (المفاتيح)
    if (dictionary[text] !== undefined) {
        return dictionary[text];
    }

    // ترجمة النص العربي مباشرة
    if (textMap[text] !== undefined) {
        return textMap[text];
    }

    return fallback || text;
}

/* ==========================================================================
   Load Language File
   ========================================================================== */

export async function loadLanguage(language) {

    if (!validateLanguage(language)) {

        language = CONFIG.language.default;

    }

    const response = await fetch(

        `lang/${language}.json`

    );

    if (!response.ok) {

        throw new Error(

            `Unable to load language: ${language}`

        );

    }

    dictionary = await response.json();
textMap = {};

// العربية هي المرجع
let arDictionary = {};

if (language === "ar") {

    arDictionary = dictionary;

} else {

    const arResponse = await fetch("lang/ar.json");

    if (arResponse.ok) {

        arDictionary = await arResponse.json();

    }

}

for (const key in arDictionary) {

    if (
        typeof arDictionary[key] === "string" &&
        typeof dictionary[key] === "string"
    ) {

        textMap[arDictionary[key]] = dictionary[key];

    }

}
/* ==========================================================================
   Apply Language
   ========================================================================== */

export function applyLanguage(language) {

    if (!validateLanguage(language)) {

        language = CONFIG.language.default;

    }

    const info = LANGUAGES[language];

    document.documentElement.lang = info.code;

    document.documentElement.dir = info.direction;

    document.body.style.fontFamily =

        `var(--font-${language})`;

    setLanguage(language);

}

/* ==========================================================================
   Translate Page
   ========================================================================== */
export function translatePage() {

    // ترجمة العناصر التي تستخدم data-i18n
    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key = element.dataset.i18n;

            element.textContent = t(
                key,
                element.textContent
            );

        });

    // ترجمة placeholder
    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach(element => {

            const key = element.dataset.i18nPlaceholder;

            element.placeholder = t(
                key,
                element.placeholder
            );

        });

    // ترجمة title
    document
        .querySelectorAll("[data-i18n-title]")
        .forEach(element => {

            const key = element.dataset.i18nTitle;

            element.title = t(
                key,
                element.title
            );

        });

    // ترجمة النصوص الثابتة
    document
        .querySelectorAll("button,a,label,option,span,p,li,h1,h2,h3,h4,h5,h6")
        .forEach(element => {

            // استثناء العناصر
            if (
                element.hasAttribute("data-no-translate") ||
                element.classList.contains("no-translate")
            ) {
                return;
            }

            const text = element.textContent.trim();

            if (!text) return;

            // تجاهل الأرقام
            if (/^[0-9\s.,:%/-]+$/.test(text)) return;

            // تجاهل الأسماء العلمية
            if (/^[A-Z][a-z]+(\s[a-z-]+)+$/.test(text)) return;

            element.textContent = t(text, text);

        });

}

        

/* ==========================================================================
   Change Language
   ========================================================================== */

export async function changeLanguage(language) {

    await loadLanguage(language);

    applyLanguage(language);

    translatePage();

    document.dispatchEvent(

        new CustomEvent(

            "languageChanged",

            {

                detail: {

                    language

                }

            }

        )

    );

}



/* ==========================================================================
   Initialize
   ========================================================================== */

export async function initializeLanguage() {

    let language = getLanguage();

    if (!validateLanguage(language)) {

        language = CONFIG.language.default;

    }

    await changeLanguage(language);

}



/* ==========================================================================
   Auto Initialize
   ========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initializeLanguage

);
