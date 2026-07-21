/* ==========================================
   Iraqi Eco - Language Manager
   ========================================== */

let currentLanguage = load("language", CONFIG.site.defaultLanguage);

let translations = {};


/* ==========================
   تحميل ملف اللغة
========================== */

async function loadLanguage(language) {

    try {

        const response = await fetch(`lang/${language}.json`);

        translations = await response.json();

        currentLanguage = language;

        save("language", language);

        applyLanguage();

    }

    catch (error) {

        console.error("Language Error:", error);

    }

}


/* ==========================
   ترجمة عنصر واحد
========================== */

function translate(key) {

    return translations[key] ?? key;

}


/* ==========================
   تطبيق الترجمة
========================== */

function applyLanguage() {

    document.documentElement.lang = currentLanguage;

    if (currentLanguage === "ar" || currentLanguage === "ku") {

        document.documentElement.dir = "rtl";

    }

    else {

        document.documentElement.dir = "ltr";

    }

    document.title = CONFIG.site.name;

    document
        .querySelectorAll("[data-lang]")
        .forEach(element => {

            const key = element.dataset.lang;

            element.textContent = translate(key);

        });

    document
        .querySelectorAll("[data-placeholder]")
        .forEach(element => {

            const key = element.dataset.placeholder;

            element.placeholder = translate(key);

        });

}


/* ==========================
   تغيير اللغة
========================== */

async function changeLanguage(language) {

    if (
        !CONFIG.site.supportedLanguages.includes(language)
    ) {

        return;

    }

    await loadLanguage(language);

}


/* ==========================
   اللغة الحالية
========================== */

function getLanguage() {

    return currentLanguage;

}


/* ==========================
   بداية التشغيل
========================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        loadLanguage(currentLanguage);

    }

);
