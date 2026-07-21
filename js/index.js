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
import { initializeFilters } from "./filters.js";
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
let allOrganisms = [];
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
            organism[SCHEMA.SCIENTIFIC_NAME] ||
            ""

    });

    const body = document.createElement("div");

    body.className = "organism-card-content";

    const title = document.createElement("h3");

    title.className = "organism-card-title";

    title.textContent =
        organism[SCHEMA.NAME_AR] || "";

    const scientific = document.createElement("p");

    scientific.className =
        "organism-card-scientific";

    scientific.textContent =
        organism[SCHEMA.SCIENTIFIC_NAME] || "";

    const className = document.createElement("p");

    className.className =
        "organism-card-class";

    className.innerHTML =
        `<strong>الطائفة:</strong> ${organism[SCHEMA.CLASS] || "-"}`;

    const description = document.createElement("p");

    description.className =
        "organism-card-text";

    const text =
        organism[SCHEMA.DESCRIPTION] || "";

    description.textContent =
        text.length > 120
            ? text.substring(0, 120) + "..."
            : text;

    const conservation = document.createElement("p");

    conservation.className =
        "organism-card-status";

    conservation.innerHTML =
        `<strong>حالة الحفظ:</strong> ${organism[SCHEMA.CONSERVATION_STATUS] || "-"}`;

    const button = document.createElement("a");

    button.className =
        "btn btn-primary mt-4";

    button.href =
        `organism.html?id=${organism[SCHEMA.ID]}`;

    button.textContent =
        "عرض التفاصيل";

    body.append(
        title,
        scientific,
        className,
        description,
        conservation,
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

        allorganisms =
            await getLatestOrganisms();

        initializeFilters(
    allOrganisms,
    latestContainer,
    searchInput,
    createCard
);

/* ==========================================================================
   Initialize
   ========================================================================== */

async function loadLatest() {

    try {

        allOrganisms =
            await getLatestOrganisms();

        initializeFilters(
            allOrganisms,
            latestContainer,
            searchInput,
            createCard
        );

    }

    catch (e) {

        console.error(e);

        error(
            t("error")
        );

    }

}
