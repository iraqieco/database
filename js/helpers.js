/* ==========================================
   Iraqi Eco - Helper Functions
   ========================================== */

/**
 * هل القيمة فارغة؟
 */
function isEmpty(value) {

    return (
        value === null ||
        value === undefined ||
        String(value).trim() === ""
    );

}

/**
 * تنظيف النص
 */
function cleanText(text = "") {

    let value = String(text);

    if (CONFIG.search.trimText) {
        value = value.trim();
    }

    if (CONFIG.search.ignoreExtraSpaces) {
        value = value.replace(/\s+/g, " ");
    }

    return value;

}

/**
 * تحويل النص للبحث
 */
function normalizeText(text = "") {

    return cleanText(text).toLowerCase();

}

/**
 * هل هو رابط؟
 */
function isUrl(value = "") {

    return /^https?:\/\//i.test(cleanText(value));

}

/**
 * الحصول على رابط الصورة
 */
function getImageUrl(image) {

    if (isEmpty(image)) {
        return CONFIG.images.placeholder;
    }

    image = cleanText(image);

    if (isUrl(image)) {
        return image;
    }

    return CONFIG.images.githubBase + image;

}

/**
 * معالجة خطأ الصورة
 */
function imageError(img) {

    img.src = CONFIG.images.placeholder;

}

/**
 * اختصار النص
 */
function limitText(text = "", length = 150) {

    text = cleanText(text);

    if (text.length <= length) {
        return text;
    }

    return text.substring(0, length) + "...";

}

/**
 * تنسيق التاريخ
 */
function formatDate(date) {

    if (isEmpty(date)) {
        return "";
    }

    return new Date(date).toLocaleDateString(
        CONFIG.locale[CONFIG.site.defaultLanguage]
    );

}

/**
 * إنشاء عنصر HTML
 */
function createElement(tag, className = "") {

    const element = document.createElement(tag);

    if (!isEmpty(className)) {
        element.className = className;
    }

    return element;

}

/**
 * البحث عن عنصر
 */
function $(selector) {

    return document.querySelector(selector);

}

/**
 * البحث عن عدة عناصر
 */
function
