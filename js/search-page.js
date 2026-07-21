/* ==========================================================================
   Iraqi Eco
   Search Page
   ========================================================================== */

import { initializeTheme } from "./theme.js";
import { initializeLanguage, t } from "./language.js";
import { initializeSupabase } from "./supabase.js";

import { search } from "./search.js";
import { SCHEMA } from "./schema.js";
import { getQuery } from "./helpers.js";
import { createImage, detectImageSource } from "./image.js";
import { error } from "./notifications.js";

/* ==========================================================================
   Elements
   ========================================================================== */

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const results = document.getElementById("search-results");

/* ==========================================================================
   Card
   ========================================================================== */

function createCard(item) {

    const card = document.createElement("article");

    card.className = "search-card";

    const image = createImage({

        src: item[SCHEMA.IMAGE],

        source: detectImageSource(

            item[SCHEMA.IMAGE]

        ),

        alt:

            item[SCHEMA.NAME_AR] ||

            item[SCHEMA.NAME_EN] ||

            ""

    });

    const body = document.createElement("div");

    body.className = "search-card-body";

    const title = document.createElement("h3");

    title.className = "search-card-title";

    title.textContent =

        item[SCHEMA.NAME_AR] ||

        item[SCHEMA.NAME_EN] ||

        item[SCHEMA.NAME_KU] ||

        item[SCHEMA.SCIENTIFIC_NAME];

    const description = document.createElement("p");

    description.className =

        "search-card-description";

    description.textContent =

        item[SCHEMA.DESCRIPTION_AR] ||

        item[SCHEMA.DESCRIPTION_EN] ||

        item[SCHEMA.DESCRIPTION_KU] ||

        "";

    const button = document.createElement("a");

    button.className = "btn btn-primary";

    button.href =

        `organism.html?id=${item[SCHEMA.ID]}`;

    button.textContent =

        t("buttons.readMore");

    body.append(

        title,

        description,

        button

    );

    card.append(

        image,

        body

    );

    return card;

}

/* ==========================================================================
   Render
   ========================================================================== */

async function performSearch(query) {

    try {

        results.innerHTML =

            `<div class="search-loading">

                ${t("loading")}

            </div>`;

        const data = await search(query);

        results.innerHTML = "";

        if (!data.length) {

            results.innerHTML =

                `<div class="search-empty">

                    ${t("notFound")}

                </div>`;

            return;

        }

        data.forEach(item => {

            results.append(

                createCard(item)

            );

        });

    }

    catch (e) {

        console.error(e);

        error(t("error"));

    }

}

/* ==========================================================================
   Events
   ========================================================================== */

form.addEventListener(

    "submit",

    event => {

        event.preventDefault();

        const query = input.value.trim();

        if (!query) {

            return;

        }

        history.replaceState(

            {},

            "",

            `?q=${encodeURIComponent(query)}`

        );

        performSearch(query);

    }

);

/* ==========================================================================
   Initialize
   ========================================================================== */

async function initialize() {

    await initializeLanguage();

    initializeTheme();

    initializeSupabase();

    const query = getQuery("q");

    if (query) {

        input.value = query;

        performSearch(query);

    }

}

initialize();
