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
const arResponse = await fetch("lang/ar.json");

if (arResponse.ok) {

    const arDictionary = await arResponse.json();

    for (const key in arDictionary) {

        if (
            typeof arDictionary[key] === "string" &&
            typeof dictionary[key] === "string"
        ) {

            textMap[arDictionary[key]] = dictionary[key];

        }

    }

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

    document

        .querySelectorAll("[data-i18n]")

        .forEach(element => {

            const key = element.dataset.i18n;

            element.textContent = t(

                key,

                element.textContent

            );

        });



    document

        .querySelectorAll("[data-i18n-placeholder]")

        .forEach(element => {

            const key =

                element.dataset.i18nPlaceholder;

            element.placeholder = t(

                key,

                element.placeholder

            );

        });

}

// ترجمة النصوص الثابتة تلقائياً
document.querySelectorAll("*").forEach(element => {

    if (
        element.children.length === 0 &&
        element.textContent.trim()
    ) {

        element.textContent = t(
            element.textContent.trim(),
            element.textContent
        );

    }

});

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
