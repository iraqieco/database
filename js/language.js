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

document.addEventListener(

    "DOMContentLoaded",

    initializeLanguage

);
