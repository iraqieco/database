/* ==========================================================================
   Iraqi Eco
   Helper Functions
   ========================================================================== */

import { CONFIG } from "./config.js";
import { REGEX } from "./constants.js";

/* ==========================================================================
   Value
   ========================================================================== */

export function isNull(value) {

    return value === null || value === undefined;

}

export function isEmpty(value) {

    if (isNull(value)) {

        return true;

    }

    return String(value).trim() === "";

}

export function hasValue(value) {

    return !isEmpty(value);

}



/* ==========================================================================
   Text
   ========================================================================== */

export function trim(value = "") {

    return String(value).trim();

}

export function normalizeSpaces(value = "") {

    return trim(value).replace(

        REGEX.MULTIPLE_SPACES,

        " "

    );

}

export function normalizeText(value = "") {

    let text = normalizeSpaces(value);

    if (CONFIG.search.ignoreCase) {

        text = text.toLowerCase();

    }

    return text;

}

export function compareText(first, second) {

    return normalizeText(first) === normalizeText(second);

}



/* ==========================================================================
   Array
   ========================================================================== */

export function unique(array = []) {

    return [...new Set(array)];

}

export function chunk(array = [], size = 10) {

    const result = [];

    for (let i = 0; i < array.length; i += size) {

        result.push(

            array.slice(i, i + size)

        );

    }

    return result;

}



/* ==========================================================================
   Number
   ========================================================================== */

export function random(min, max) {

    return Math.floor(

        Math.random() * (max - min + 1)

    ) + min;

}

export function clamp(value, min, max) {

    return Math.min(

        Math.max(value, min),

        max

    );

}



/* ==========================================================================
   Date
   ========================================================================== */

export function formatDate(date, locale = "ar-IQ") {

    return new Date(date)

        .toLocaleDateString(locale);

}



/* ==========================================================================
   URL
   ========================================================================== */

export function isUrl(value = "") {

    return REGEX.HTTP.test(

        trim(value)

    );

}



/* ==========================================================================
   Image
   ========================================================================== */

export function imagePath(image = "") {

    if (isEmpty(image)) {

        return CONFIG.images.placeholder;

    }

    image = trim(image);

    if (isUrl(image)) {

        return image;

    }

    return CONFIG.images.githubBase + image;

}



/* ==========================================================================
   DOM
   ========================================================================== */

export function $(selector, parent = document) {

    return parent.querySelector(selector);

}

export function $$(selector, parent = document) {

    return [

        ...parent.querySelectorAll(selector)

    ];

}

export function create(tag) {

    return document.createElement(tag);

}



/* ==========================================================================
   Sleep
   ========================================================================== */

export function sleep(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}



/* ==========================================================================
   Object
   ========================================================================== */

export function deepClone(object) {

    return structuredClone(object);

}



/* ==========================================================================
   Browser
   ========================================================================== */

export function scrollTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

export function getQuery(name) {

    return new URLSearchParams(

        window.location.search

    ).get(name);

       }
