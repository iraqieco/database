/* ==========================================================================
   Iraqi Eco
   Constants
   ========================================================================== */

export const LANGUAGES = Object.freeze({

    ar: {
        code: "ar",
        name: "العربية",
        nativeName: "العربية",
        direction: "rtl",
        locale: "ar-IQ"
    },

    en: {
        code: "en",
        name: "English",
        nativeName: "English",
        direction: "ltr",
        locale: "en-US"
    },

    ku: {
        code: "ku",
        name: "Kurdish",
        nativeName: "کوردی",
        direction: "rtl",
        locale: "ku"
    }

});



export const IMAGE_SOURCE = Object.freeze({

    URL: "url",

    GITHUB: "github"

});



export const ORGANISM_GROUPS = Object.freeze({

    ANIMAL: "animal",

    PLANT: "plant",

    FUNGUS: "fungus",

    BACTERIA: "bacteria",

    ARCHAEA: "archaea",

    PROTIST: "protist",

    VIRUS: "virus",

    ALGAE: "algae",

    OTHER: "other"

});



export const CONSERVATION_STATUS = Object.freeze({

    EX: "EX",

    EW: "EW",

    CR: "CR",

    EN: "EN",

    VU: "VU",

    NT: "NT",

    LC: "LC",

    DD: "DD",

    NE: "NE"

});



export const SORT_OPTIONS = Object.freeze({

    NEWEST: "newest",

    OLDEST: "oldest",

    NAME_ASC: "name-asc",

    NAME_DESC: "name-desc",

    RANDOM: "random"

});



export const STORAGE_KEYS = Object.freeze({

    LANGUAGE: "iraqiEco.language",

    THEME: "iraqiEco.theme",

    CACHE: "iraqiEco.cache",

    USER: "iraqiEco.user"

});



export const EVENTS = Object.freeze({

    LANGUAGE_CHANGED: "languageChanged",

    THEME_CHANGED: "themeChanged",

    LOGIN: "login",

    LOGOUT: "logout"

});



export const HTTP_STATUS = Object.freeze({

    OK: 200,

    CREATED: 201,

    BAD_REQUEST: 400,

    UNAUTHORIZED: 401,

    FORBIDDEN: 403,

    NOT_FOUND: 404,

    CONFLICT: 409,

    SERVER_ERROR: 500

});



export const REGEX = Object.freeze({

    MULTIPLE_SPACES: /\s+/g,

    HTTP: /^https?:\/\//i,

    IMAGE_EXTENSION: /\.(jpg|jpeg|png|gif|webp|svg)$/i

});



export const DEFAULTS = Object.freeze({

    LANGUAGE: "ar",

    THEME: "light",

    PAGE: 1,

    LIMIT: 24

});
