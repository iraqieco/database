/* ==========================================================================
   Iraqi Eco
   Home Page
   ========================================================================== */

import { initializeTheme } from "./theme.js";
import { initializeLanguage } from "./language.js";
import { initializeSupabase } from "./supabase.js";

import { getLatestOrganisms } from "./api.js";

import { SCHEMA } from "./schema.js";

import { createImage, detectImageSource } from "./image.js";

import { t } from "./language.js";

import { error } from "./notifications.js";

/* ==========================================================================
   Elements
   ========================================================================== */

const latestContainer = document.getElementById(
    "latest-organisms"
);

const searchForm = document.getElementById(
    "search-form"
);

const searchInput = document.getElementById(
    "search-input"
);

/* ==========================================================================
   Search
   ========================================================================== */

function initializeSearch() {

    searchForm?.addEventListener(

        "submit",

        event => {

            event.preventDefault();

            const query = searchInput.value.trim();

            if (!query) {

                return;

            }

            window.location.href =

                `search.html?q=${encodeURIComponent(query)}`;

        }

    );

}

/* ==========================================================================
   Card
   ========================================================================== */

function createCard(organism) {

    const card = document.createElement("article");

    card.className = "organism-card card";



    const image = createImage({

        src: organism[SCHEMA.IMAGE],

        source: detectImageSource(

            organism[SCHEMA.IMAGE]

        ),

        alt:

            organism[SCHEMA.NAME_AR] ||

            organism[SCHEMA.NAME_EN] ||

            ""

    });



    const body = document.createElement("div");

    body.className = "organism-card-content";



    const title = document.createElement("h3");

    title.className = "organism-card-title";

    title.textContent =

        organism[SCHEMA.NAME_AR] ||

        organism[SCHEMA.NAME_EN] ||

        organism[SCHEMA.NAME_KU] ||

        organism[SCHEMA.SCIENTIFIC_NAME];



    const text = document.createElement("p");

    text.className = "organism-card-text";

    text.textContent =

        organism[SCHEMA.DESCRIPTION_AR] ||

        organism[SCHEMA.DESCRIPTION_EN] ||

        organism[SCHEMA.DESCRIPTION_KU] ||

        "";



    const button = document.createElement("a");

    button.className = "btn btn-primary mt-4";

    button.href =

        `organism.html?id=${organism[SCHEMA.ID]}`;

    button.textContent = t(

        "buttons.readMore",

        "View"

    );



    body.append(

        title,

        text,

        button

    );



    card.append(

        image,

        body

    );



    return card;

}

/* ==========================================================================
   Latest
   ========================================================================== */

async function loadLatest() {

    try {

        const organisms =

            await getLatestOrganisms(8);



        latestContainer.innerHTML = "";



        if (

            organisms.length === 0

        ) {

            latestContainer.innerHTML =

                `<div class="home-empty">

                    ${t("noData")}

                </div>`;

            return;

        }



        organisms.forEach(item => {

            latestContainer.append(

                createCard(item)

            );

        });

    }

    catch (e) {

        console.error(e);

        error(

            t("error")

        );

    }

}

/* ==========================================================================
   Initialize
   ========================================================================== */

async function initialize() {

    await initializeLanguage();

    initializeTheme();

    initializeSupabase();

    initializeSearch();

    await loadLatest();

}

initialize();
