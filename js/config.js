/* ==========================================
   Iraqi Eco - Configuration
   ========================================== */

const CONFIG = {

    /* ==========================
       Website
    ========================== */

    site: {

        name: "عراقي إيكو",

        description: "قاعدة بيانات الكائنات الحية في العراق",

        version: "1.0.0",

        defaultLanguage: "ar",

        supportedLanguages: [
            "ar",
            "en",
            "ku"
        ]

    },



    /* ==========================
       Supabase
    ========================== */

    supabase: {

        url: "ضع_رابط_مشروع_Supabase_هنا",

        anonKey: "ضع_مفتاح_Anon_هنا"

    },



    /* ==========================
       Database
    ========================== */

    database: {

        table: "organisms",

        primaryKey: "id"

    },



    /* ==========================
       Images
    ========================== */

    images: {

        mode: "auto",

        githubBase:
            "https://raw.githubusercontent.com/USERNAME/REPOSITORY/main/assets/images/",

        placeholder:
            "assets/placeholders/no-image.webp"

    },



    /* ==========================
       Search
    ========================== */

    search: {

        ignoreExtraSpaces: true,

        trimText: true,

        caseSensitive: false,

        minCharacters: 1

    },



    /* ==========================
       Theme
    ========================== */

    theme: {

        default: "light",

        allowDarkMode: true

    },



    /* ==========================
       Pagination
    ========================== */

    pagination: {

        organismsPerPage: 24

    },



    /* ==========================
       Cache
    ========================== */

    cache: {

        enabled: true,

        duration: 300000

    },



    /* ==========================
       Date & Time
    ========================== */

    locale: {

        ar: "ar-IQ",

        en: "en-US",

        ku: "ku"

    }



};



/* ==========================================
   Freeze Configuration
   ========================================== */

Object.freeze(CONFIG);
