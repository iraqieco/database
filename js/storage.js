/* ==========================================================================
   Iraqi Eco
   Storage Manager
   ========================================================================== */

import { CONFIG } from "./config.js";



/* ==========================================================================
   Local Storage
   ========================================================================== */

export function setItem(key, value) {

    try {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

        return true;

    }

    catch (error) {

        console.error(error);

        return false;

    }

}



export function getItem(key, defaultValue = null) {

    try {

        const value = localStorage.getItem(key);

        if (value === null) {

            return defaultValue;

        }

        return JSON.parse(value);

    }

    catch (error) {

        console.error(error);

        return defaultValue;

    }

}



export function removeItem(key) {

    try {

        localStorage.removeItem(key);

        return true;

    }

    catch (error) {

        console.error(error);

        return false;

    }

}



export function hasItem(key) {

    return localStorage.getItem(key) !== null;

}



export function clearStorage() {

    localStorage.clear();

}



/* ==========================================================================
   Language
   ========================================================================== */

export function setLanguage(language) {

    return setItem(

        CONFIG.storage.language,

        language

    );

}



export function getLanguage() {

    return getItem(

        CONFIG.storage.language,

        CONFIG.language.default

    );

}



/* ==========================================================================
   Theme
   ========================================================================== */

export function setTheme(theme) {

    return setItem(

        CONFIG.storage.theme,

        theme

    );

}



export function getTheme() {

    return getItem(

        CONFIG.storage.theme,

        CONFIG.theme.default

    );

}



/* ==========================================================================
   Cache
   ========================================================================== */

export function setCache(key, value) {

    return setItem(

        `${CONFIG.storage.cache}.${key}`,

        {

            value,

            createdAt: Date.now()

        }

    );

}



export function getCache(key) {

    const cache = getItem(

        `${CONFIG.storage.cache}.${key}`

    );

    if (!cache) {

        return null;

    }

    const expired =

        Date.now() - cache.createdAt >

        CONFIG.cache.lifetime;

    if (expired) {

        removeItem(

            `${CONFIG.storage.cache}.${key}`

        );

        return null;

    }

    return cache.value;

}



export function clearCache() {

    Object.keys(localStorage).forEach(key => {

        if (

            key.startsWith(

                CONFIG.storage.cache

            )

        ) {

            localStorage.removeItem(key);

        }

    });

}
