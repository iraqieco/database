/* ==========================================================================
   Iraqi Eco
   Organisms Page
   ========================================================================== */

import { initializeTheme } from "./theme.js";
import { initializeLanguage, t } from "./language.js";
import { initializeSupabase } from "./supabase.js";

import { getOrganisms } from "./api.js";
import { SCHEMA } from "./schema.js";

import {
    createImage,
    detectImageSource
} from "./image.js";

import { error } from "./notifications.js";

/* ==========================================================================
   Elements
   ========================================================================== */

const grid = document.getElementById(
    "organisms-grid"
);

const pagination = document.getElementById(
    "pagination"
);

const LIMIT = 24;

let currentPage = 1;

/* ==========================================================================
   Card
   ========================================================================== */

function createCard(item) {

    const card = document.createElement("article");

    card.className = "organism-card";



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

    body.className = "organism-card-content";



    const title = document.createElement("h3");

    title.className = "organism-card-title";

    title.textContent =

        item[SCHEMA.NAME_AR] ||

        item[SCHEMA.NAME_EN] ||

        item[SCHEMA.NAME_KU] ||

        item[SCHEMA.SCIENTIFIC_NAME] ||

        "-";



    const description = document.createElement("p");

    description.className =

        "organism-card-description";

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
   Pagination
   ========================================================================== */

function renderPagination(

    page,

    total

) {

    pagination.innerHTML = "";



    const pages =

        Math.ceil(total / LIMIT);



    if (pages <= 1) {

        return;

    }



    for (

        let i = 1;

        i <= pages;

        i++

    ) {

        const button =

            document.createElement("button");



        button.className =

            "page-button";



        if (i === page) {

            button.classList.add("active");

        }



        button.textContent = i;



        button.onclick = () => {

            loadPage(i);

        };



        pagination.append(button);

    }

}

/* ==========================================================================
   Load
   ========================================================================== */

async function loadPage(page = 1) {

    try {

        currentPage = page;



        const result =

            await getOrganisms(

                page,

                LIMIT

            );



        grid.innerHTML = "";



        if (

            result.data.length === 0

        ) {

            grid.innerHTML =

                `<div class="empty-state">

                    ${t("noData")}

                </div>`;

            return;

        }



        result.data.forEach(item => {

            grid.append(

                createCard(item)

            );

        });



        renderPagination(

            page,

            result.count

        );



        window.scrollTo({

            top: 0,

            behavior: "smooth"

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

    await loadPage(currentPage);

}

initialize();
