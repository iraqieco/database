/* ==========================================================================
   Iraqi Eco
   Global Configuration
   ========================================================================== */

export const CONFIG = Object.freeze({

    /* ===========================
       Website
    =========================== */

    site: {

        name: "عراقي إيكو",

        description: "قاعدة بيانات الكائنات الحية في العراق",

        version: "1.0.0",

        author: "Iraqi Eco"

    },



    /* ===========================
       Languages
    =========================== */

    language: {

        default: "ar",

        supported: [

            "ar",

            "en",

            "ku"

        ]

    },



    /* ===========================
       Theme
    =========================== */

    theme: {

        default: "light",

        allowDarkMode: true

    },



    /* ===========================
       Supabase
    =========================== */

    supabase: {

        url: "",

        anonKey: ""

    },



    /* ===========================
       Database
    =========================== */

    database: {

        table: "organisms",

        pageSize: 24

    },



    /* ===========================
       Images
    =========================== */

    images: {

        placeholder:
            "assets/placeholders/no-image.webp",

        githubBase:
            "https://raw.githubusercontent.com/USERNAME/REPOSITORY/main/assets/images/",

        allowedExtensions: [

            "jpg",

            "jpeg",

            "png",

            "webp",

            "gif",

            "svg"

        ]

    },



    /* ===========================
       Search
    =========================== */

    search: {

        minimumCharacters: 1,

        ignoreCase: true,

        trim: true,

        collapseSpaces: true

    },



    /* ===========================
       Cache
    =========================== */

    cache: {

        enabled: true,

        lifetime: 300000

    },



    /* ===========================
       Pagination
    =========================== */

    pagination: {

        defaultLimit: 24,

        maximumLimit: 100

    },



    /* ===========================
       Local Storage Keys
    =========================== */

    storage: {

        language: "iraqiEco.language",

        theme: "iraqiEco.theme",

        cache: "iraqiEco.cache"

    },



    /* ===========================
       Routes
    =========================== */

    routes: {

        home: "index.html",

        organisms: "organisms.html",

        organism: "organism.html",

        search: "search.html",

        login: "login.html",

        admin: "admin.html"

    }

});

    
