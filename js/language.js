/* ==========================================================================
   Iraqi Eco
   Language Manager
   ========================================================================== */

import { CONFIG } from "./config.js";
import { LANGUAGES } from "./constants.js";
import { getLanguage, setLanguage } from "./storage.js";
import { validateLanguage } from "./validator.js";

let dictionary = {};

/* ==========================================================================
   Get Current Language
   ========================================================================== */

export function currentLanguage() {

    return document.documentElement.lang;

}

/* ==========================================================================
   Translate
   ========================================================================== */

export function t(key, fallback = "") {

    return dictionary[key] ?? fallback ?? key;

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
const translateCache = {};

export async function translateText(text) {

    if (!text) return "";

    const lang = currentLanguage();

    if (lang === "ar") return text;

    const key = `${lang}:${text}`;

    if (translateCache[key]) {
        return translateCache[key];
    }

    try {

        const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`
        );

        const data = await response.json();

        const translated = data[0]
            .map(item => item[0])
            .join("");

        translateCache[key] = translated;

        return translated;

    } catch {

        return text;

    }

}
document.addEventListener(

    "DOMContentLoaded",

    initializeLanguage

);
