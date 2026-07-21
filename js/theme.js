/* ==========================================
   Iraqi Eco - Theme Manager
   ========================================== */

const THEME_KEY = "theme";


/* ==========================
   الحصول على السمة المحفوظة
========================== */

function getSavedTheme() {

    return load(THEME_KEY, null);

}


/* ==========================
   حفظ السمة
========================== */

function saveTheme(theme) {

    save(THEME_KEY, theme);

}


/* ==========================
   اكتشاف سمة النظام
========================== */

function getSystemTheme() {

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

}


/* ==========================
   تطبيق السمة
========================== */

function applyTheme(theme) {

    document.documentElement.setAttribute(
        "data-theme",
        theme
    );

    saveTheme(theme);

}


/* ==========================
   تبديل السمة
========================== */

function toggleTheme() {

    const current =
        document.documentElement.getAttribute("data-theme");

    const next =
        current === "dark"
            ? "light"
            : "dark";

    applyTheme(next);

}


/* ==========================
   تحميل السمة
========================== */

function initTheme() {

    let theme = getSavedTheme();

    if (!theme) {

        theme = CONFIG.theme.default;

        if (theme === "system") {
            theme = getSystemTheme();
        }

    }

    applyTheme(theme);

}


/* ==========================
   متابعة تغيير سمة النظام
========================== */

window.matchMedia("(prefers-color-scheme: dark)")
.addEventListener("change", event => {

    const saved = getSavedTheme();

    if (saved === null) {

        applyTheme(
            event.matches
                ? "dark"
                : "light"
        );

    }

});


/* ==========================
   زر تبديل السمة
========================== */

document.addEventListener(
    "click",
    event => {

        if (event.target.closest("[data-theme-toggle]")) {

            toggleTheme();

        }

    }
);


/* ==========================
   بداية التشغيل
========================== */

document.addEventListener(
    "DOMContentLoaded",
    initTheme
);
