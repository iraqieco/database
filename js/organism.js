/* ==========================================================================
   Iraqi Eco
   Organism Details Page
   ========================================================================== */

import { initializeTheme } from "./theme.js";
import { initializeLanguage } from "./language.js";
import { initializeSupabase } from "./supabase.js";

import { getOrganismById } from "./api.js";

import { SCHEMA } from "./schema.js";
import { getQuery, hasValue } from "./helpers.js";
import { createImage, detectImageSource } from "./image.js";
import { error } from "./notifications.js";

const container = document.getElementById("organism-page");

/* ==========================================================================
   Labels
   ========================================================================== */

const LABELS = {

    [SCHEMA.DOMAIN]: "النطاق",
    [SCHEMA.KINGDOM]: "المملكة",
    [SCHEMA.PHYLUM]: "الشعبة",
    [SCHEMA.CLASS]: "الطائفة",
    [SCHEMA.ORDER]: "الرتبة",
    [SCHEMA.FAMILY]: "الفصيلة",
    [SCHEMA.GENUS]: "الجنس",
    [SCHEMA.SPECIES]: "النوع",

    [SCHEMA.DESCRIPTION]: "الوصف",
    [SCHEMA.HABITAT]: "الموطن",
    [SCHEMA.DISTRIBUTION]: "الانتشار",
    [SCHEMA.LOCATION]: "الموقع",

    [SCHEMA.SIZE]: "الحجم",
    [SCHEMA.WEIGHT]: "الوزن",
    [SCHEMA.COLOR]: "اللون",
    [SCHEMA.LIFESPAN]: "العمر",

    [SCHEMA.DIET]: "الغذاء",
    [SCHEMA.BEHAVIOR]: "السلوك",
    [SCHEMA.REPRODUCTION]: "التكاثر",

    [SCHEMA.CONSERVATION_STATUS]: "حالة الحفظ",
    [SCHEMA.THREATS]: "التهديدات",
    [SCHEMA.PROTECTION]: "الحماية",

    [SCHEMA.REFERENCES]: "المراجع",
    [SCHEMA.NOTES]: "ملاحظات"

};

/* ==========================================================================
   Field
   ========================================================================== */

function createField(label, value) {

    const field = document.createElement("div");

    field.className = "organism-field";

    field.innerHTML = `
        <span class="organism-label">${label}</span>
        <span class="organism-value">${value}</span>
    `;

    return field;

}

/* ==========================================================================
   Render
   ========================================================================== */

function render(organism) {

    container.innerHTML = "";

    const page = document.createElement("div");
    page.className = "organism-page";

    /* Image */

    const imageBox = document.createElement("div");
    imageBox.className = "organism-image";

    imageBox.append(

        createImage({

            src: organism[SCHEMA.IMAGE],

            source: detectImageSource(

                organism[SCHEMA.IMAGE]

            ),

            alt:

                organism[SCHEMA.NAME_AR] ||

                organism[SCHEMA.NAME_EN] ||

                ""

        })

    );

    /* Content */

    const content = document.createElement("div");
    content.className = "organism-content";

    const title = document.createElement("h1");
    title.className = "organism-title";

    title.textContent =

        organism[SCHEMA.NAME_AR] ||

        organism[SCHEMA.NAME_EN] ||

        organism[SCHEMA.NAME_KU] ||

        organism[SCHEMA.SCIENTIFIC_NAME];

    content.append(title);
/* SEO */

const pageTitle =
    organism[SCHEMA.NAME_AR] ||
    organism[SCHEMA.NAME_EN] ||
    organism[SCHEMA.SCIENTIFIC_NAME] ||
    "عراقي إيكو";

document.title = `${pageTitle} | عراقي إيكو`;

const description =
    organism[SCHEMA.DESCRIPTION] ||
    `معلومات عن ${pageTitle} في العراق.`;

document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", description);

document
    .querySelector('meta[property="og:title"]')
    ?.setAttribute("content", document.title);

document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute("content", description);

document
    .getElementById("canonical")
    ?.setAttribute("href", window.location.href);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Taxon",

    "name": pageTitle,

    "alternateName":
        organism[SCHEMA.SCIENTIFIC_NAME] || "",

    "description": description,

    "url": window.location.href,

    "image": organism[SCHEMA.IMAGE] || "",

    "identifier": organism.id,

    "taxonRank":
        organism[SCHEMA.SPECIES] ? "Species" : "",

    "isPartOf": {
        "@type": "WebSite",
        "name": "عراقي إيكو",
        "url": "https://iraqieco.github.io/database/"
    }
};

document.getElementById("schema-jsonld").textContent =
    JSON.stringify(schema);
   if (hasValue(organism[SCHEMA.SCIENTIFIC_NAME])) {

        const scientific = document.createElement("div");

        scientific.className =

            "organism-scientific";

        scientific.textContent =

            organism[SCHEMA.SCIENTIFIC_NAME];

        content.append(scientific);

    }

    const section = document.createElement("section");

    section.className = "organism-section";

    const grid = document.createElement("div");

    grid.className = "organism-grid";

    Object.entries(LABELS).forEach(

        ([field, label]) => {

            if (

                hasValue(

                    organism[field]

                )

            ) {

                grid.append(

                    createField(

                        label,

                        organism[field]

                    )

                );

            }

        }

    );

    section.append(grid);

    content.append(section);

    page.append(

        imageBox,

        content

    );

    container.append(page);

}

/* ==========================================================================
   Load
   ========================================================================== */

async function loadOrganism() {

    try {

        const id = getQuery("id");

        if (!id) {

            throw new Error();

        }

        const organism =

            await getOrganismById(id);

        render(organism);

    }

    catch (e) {

        console.error(e);

        error("تعذر تحميل الكائن.");

    }

}

/* ==========================================================================
   Initialize
   ========================================================================== */

async function initialize() {

    await initializeLanguage();

    initializeTheme();

    initializeSupabase();

    await loadOrganism();

}

initialize();
