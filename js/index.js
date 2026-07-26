/* ==========================================================================
   Iraqi Eco
   Home Page
   ========================================================================== */
import { translateText } from "./language.js";
import { initializeTheme } from "./theme.js";
import { initializeLanguage } from "./language.js";
import { initializeSupabase } from "./supabase.js";

import {
    getLatestOrganisms,
    deleteOrganism,
    updateOrganism,
    updateOrganismImage
} from "./api.js";
import { SCHEMA } from "./schema.js";

import { createImage, detectImageSource } from "./image.js";

import { t } from "./language.js";

import { error } from "./notifications.js";
import { initializeFilters } from "./filters.js";

let currentOrganism = null;

const menuOverlay = document.getElementById("card-menu-overlay");
const closeMenuBtn = document.getElementById("card-menu-close");
const downloadBtn = document.getElementById("card-download");
const editBtn = document.getElementById("card-edit");
const deleteBtn = document.getElementById("card-delete");
const addImageBtn = document.getElementById("card-add-image");

const imageDialog = document.getElementById("image-dialog");

const imageUrlInput = document.getElementById("image-url-input");

const saveImageBtn = document.getElementById("save-image-btn");

const cancelImageBtn = document.getElementById("cancel-image-btn");
/* ==========================================================================
   Elements
   ========================================================================== */

const latestContainer = document.getElementById("latest-organisms");

const searchForm = document.getElementById("search-form");

const searchInput = document.getElementById("search-input");

let allOrganisms = [];

/* ==========================================================================
   Search
   ========================================================================== */

function initializeSearch() {

    searchForm?.addEventListener("submit", event => {

        event.preventDefault();

        const query = searchInput.value.trim();

        if (!query) return;

        window.location.href =
            `search.html?q=${encodeURIComponent(query)}`;

    });

}

const STATUS = {
    EX: { key: "status.EX", color: "#000000" },
    EW: { key: "status.EW", color: "#5c5c5c" },
    CR: { key: "status.CR", color: "#d32f2f" },
    EN: { key: "status.EN", color: "#f57c00" },
    VU: { key: "status.VU", color: "#fbc02d" },
    NT: { key: "status.NT", color: "#8bc34a" },
    LC: { key: "status.LC", color: "#2e7d32" },
    DD: { key: "status.DD", color: "#607d8b" },
    NE: { key: "status.NE", color: "#9e9e9e" }
};

async function createCard(organism) { {

    const card = document.createElement("article");
    card.className = "organism-card card";

    const image = createImage({
        src: organism[SCHEMA.IMAGE],
        source: detectImageSource(organism[SCHEMA.IMAGE]),
        alt: organism[SCHEMA.NAME_AR] || organism[SCHEMA.SCIENTIFIC_NAME] || ""
    });

    const body = document.createElement("div");
    body.className = "organism-card-content";

    const title = document.createElement("h3");
title.className = "organism-card-title";
title.textContent = await translateText(
    organism[SCHEMA.NAME_AR] || ""
);

const scientific = document.createElement("p");
scientific.className = "organism-card-scientific";
scientific.textContent =
    organism[SCHEMA.SCIENTIFIC_NAME] || "";

const className = document.createElement("p");
className.className = "organism-card-class";
className.innerHTML =
    `<strong>${await translateText("الطائفة")}:</strong> ${await translateText(organism[SCHEMA.CLASS] || "-")}`;

const description = document.createElement("p");
description.className = "organism-card-text";
description.textContent = await translateText(
    organism[SCHEMA.DESCRIPTION] ||
    organism.description ||
    ""
);

    const conservation = document.createElement("p");
    conservation.className = "organism-card-status";

    const statusCode = (organism[SCHEMA.CONSERVATION_STATUS] || "")
        .trim()
        .replace(/\s+/g, "")
        .toUpperCase();

    const status = STATUS[statusCode] || {
        key: null,
        color: "#777"
    };

    conservation.textContent =
        status.key ? t(status.key) : (statusCode || "-");

    conservation.style.background = status.color;
    conservation.style.color = "#fff";
     body.append(
        title,
        scientific,
        className,
        description,
        conservation
    );

    const menuBtn = document.createElement("button");
    menuBtn.className = "card-menu-btn";
    menuBtn.textContent = "⋮";

    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openCardMenu(organism);
    });

    card.append(menuBtn, image, body);

    return card;
}

function openCardMenu(organism) {
    currentOrganism = organism;
    menuOverlay.classList.add("show");
}

function closeCardMenu() {
    currentOrganism = null;
    menuOverlay.classList.remove("show");
}

/* ==========================================================================
   Load
   ========================================================================== */

async function loadLatest() {

    try {

        allOrganisms = await getLatestOrganisms();

        allOrganisms.sort((a, b) => {

            const nameA = (a[SCHEMA.NAME_AR] || "")
                .replace(/^ال/, "");

            const nameB = (b[SCHEMA.NAME_AR] || "")
                .replace(/^ال/, "");

            return nameA.localeCompare(nameB, "ar");

        });

        await initializeFilters(
    allOrganisms,
    latestContainer,
    searchInput,
    createCard
);

    } catch (e) {

        console.error(e);
        error(t("error"));

    }

}

/* ==========================================================================
   Initialize
   ========================================================================== */

async function initialize() {

    try {

        await initializeLanguage();

        initializeTheme();

        initializeSupabase();

        initializeSearch();

        await loadLatest();

    } catch (e) {

        console.error(e);

        alert(e.message);

    }

}

initialize();

closeMenuBtn.addEventListener("click", closeCardMenu);

menuOverlay.addEventListener("click", (e) => {

    if (e.target === menuOverlay) {

        closeCardMenu();

    }

});

downloadBtn.addEventListener("click", () => {

    alert("ميزة تنزيل PDF قيد التطوير.");

    closeCardMenu();

});

editBtn.addEventListener("click", () => {

    if (!currentOrganism) return;

    window.location.href =
        `edit.html?id=${currentOrganism.id}`;

});
addImageBtn.addEventListener("click", () => {

    menuOverlay.classList.remove("show");

imageDialog.style.display = "flex";

    imageUrlInput.value = "";

});

cancelImageBtn.addEventListener("click", () => {

    imageDialog.style.display = "none";

});
saveImageBtn.addEventListener("click", async () => {

    if (!currentOrganism) return;

    const url = imageUrlInput.value.trim();

    if (!url) {
        alert("أدخل رابط الصورة");
        return;
    }

    try {

        await updateOrganism(currentOrganism.id, {
            image: url
        });

        imageDialog.style.display = "none";

        alert("تم حفظ الصورة.");

        location.reload();

    } catch (err) {

        console.error(err);

        alert("فشل حفظ الصورة.");

    }

});
deleteBtn.addEventListener("click", async () => {

    if (!currentOrganism) return;

    if (!confirm("هل تريد حذف هذا الكائن؟")) return;

    try {

        await deleteOrganism(currentOrganism.id);

        closeCardMenu();

        location.reload();

    } catch (err) {

        console.error(err);

        alert("فشل حذف الكائن.");

    }

});  
