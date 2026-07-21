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

        url: "https://rmqtopxawrrgntcqqnpa.supabase.co",

        anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtcXRvcHhhd3JyZ250Y3FxbnBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3OTIxMzQsImV4cCI6MjA5ODM2ODEzNH0.HoExHY9oNFdryWUC2u2UELLPfBNhH3P4L3zS03dvELA"

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

    
