/* ==========================================================================
   Iraqi Eco
   Validator
   ========================================================================== */

import { CONFIG } from "./config.js";
import { REGEX } from "./constants.js";
import { isEmpty, trim } from "./helpers.js";

/* ==========================================================================
   Text
   ========================================================================== */

export function validateText(value) {

    return !isEmpty(value);

}

export function validateLength(
    value,
    min = 1,
    max = Infinity
) {

    value = trim(value);

    return value.length >= min &&
           value.length <= max;

}



/* ==========================================================================
   Number
   ========================================================================== */

export function validateNumber(value) {

    return !Number.isNaN(Number(value));

}

export function validateInteger(value) {

    return Number.isInteger(Number(value));

}

export function validatePositiveNumber(value) {

    return validateNumber(value) &&
           Number(value) >= 0;

}



/* ==========================================================================
   URL
   ========================================================================== */

export function validateUrl(value) {

    if (isEmpty(value)) {

        return false;

    }

    return REGEX.HTTP.test(trim(value));

}



/* ==========================================================================
   Image
   ========================================================================== */

export function validateImageName(value) {

    if (isEmpty(value)) {

        return false;

    }

    value = trim(value);

    return REGEX.IMAGE_EXTENSION.test(value);

}



/* ==========================================================================
   Language
   ========================================================================== */

export function validateLanguage(language) {

    return CONFIG.language.supported
        .includes(language);

}



/* ==========================================================================
   Theme
   ========================================================================== */

export function validateTheme(theme) {

    return [

        "light",

        "dark"

    ].includes(theme);

}



/* ==========================================================================
   Pagination
   ========================================================================== */

export function validatePage(page) {

    return validatePositiveNumber(page) &&
           Number(page) >= 1;

}

export function validateLimit(limit) {

    return validatePositiveNumber(limit) &&
           Number(limit) <= CONFIG.pagination.maximumLimit;

}



/* ==========================================================================
   Search
   ========================================================================== */

export function validateSearch(query) {

    if (isEmpty(query)) {

        return false;

    }

    return trim(query).length >=
           CONFIG.search.minimumCharacters;

}



/* ==========================================================================
   Object
   ========================================================================== */

export function hasRequiredFields(
    object,
    fields = []
) {

    return fields.every(field =>

        !isEmpty(object[field])

    );

}



/* ==========================================================================
   Generic
   ========================================================================== */

export function validate(value, rules = []) {

    return rules.every(rule =>

        rule(value)

    );

}
