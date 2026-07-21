/* ==========================================================================
   Iraqi Eco
   Theme Manager
   ========================================================================== */

import { CONFIG } from "./config.js";
import { setTheme, getTheme } from "./storage.js";
import { validateTheme } from "./validator.js";

const ATTRIBUTE = "data-theme";

/* ==========================================================================
   System Theme
   ========================================================================== */

function getSystemTheme() {

    return window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches
        ? "dark"
        : "light";

}

/* ==========================================================================
   Apply Theme
   ========================================================================== */

export function applyTheme(theme) {

    if (!validateTheme(theme)) {

        theme = CONFIG.theme.default;

    }

    document.documentElement.setAttribute(

        ATTRIBUTE,

        theme

    );

    setTheme(theme);

    document.dispatchEvent(

        new CustomEvent("themeChanged", {

            detail: {

                theme

            }

        })

    );

}

/* ==========================================================================
   Get Current Theme
   ========================================================================== */

export function currentTheme() {

    return document.documentElement.getAttribute(

        ATTRIBUTE

    );

}

/* ==========================================================================
   Toggle Theme
   ========================================================================== */

export function toggleTheme() {

    const theme =

        currentTheme() === "dark"

            ? "light"

            : "dark";

    applyTheme(theme);

}

/* ==========================================================================
   Initialize
   ========================================================================== */

export function initializeTheme() {

    let theme = getTheme();

    if (!validateTheme(theme)) {

        theme = CONFIG.theme.default;

    }

    if (

        theme === "system"

    ) {

        theme = getSystemTheme();

    }

    applyTheme(theme);

}

/* ==========================================================================
   Watch System Theme
   ========================================================================== */

window.matchMedia(

    "(prefers-color-scheme: dark)"

).addEventListener(

    "change",

    event => {

        const savedTheme = getTheme();

        if (savedTheme === "system") {

            applyTheme(

                event.matches

                    ? "dark"

                    : "light"

            );

        }

    }

);

/* ==========================================================================
   Auto Initialize
   ========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initializeTheme

);
