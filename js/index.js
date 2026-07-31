/* ==========================================================================
   Iraqi Eco
   Home Page
   ========================================================================== */

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
const shareBtn = document.getElementById("card-share");
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

function createCard(organism) {

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
    title.textContent = organism[SCHEMA.NAME_AR] || "";

    const scientific = document.createElement("p");
    scientific.className = "organism-card-scientific";
    scientific.textContent = organism[SCHEMA.SCIENTIFIC_NAME] || "";

    const className = document.createElement("p");
    className.className = "organism-card-class";
    className.innerHTML =
    `<strong>${t("label.class")}:</strong> ${
        organism[SCHEMA.CLASS]
            ? t(`class.${organism[SCHEMA.CLASS]}`, organism[SCHEMA.CLASS])
            : "-"
    }`;
    const description = document.createElement("p");
    description.className = "organism-card-text";
    description.textContent =
        organism[SCHEMA.DESCRIPTION] ||
        organism.description ||
        "";

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
card.addEventListener("click", (e) => {

    if (e.target === menuBtn) return;

    window.location.href =
    `organism/${organism.id}`;
});
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

        initializeFilters(
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

  

   
downloadBtn.addEventListener("click", async () => {

    if (!currentOrganism) return;

    const cards = document.querySelectorAll(".organism-card");

    let targetCard = null;

    cards.forEach(card => {

        const title = card.querySelector(".organism-card-title");

        if (
            title &&
            title.textContent.trim() ===
            (currentOrganism[SCHEMA.NAME_AR] || "").trim()
        ) {
            targetCard = card;
        }

    });

    if (!targetCard) {
        alert("تعذر العثور على البطاقة.");
        return;
    }

    const menu = targetCard.querySelector(".card-menu-btn");

    if (menu) {
        menu.style.display = "none";
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(targetCard, {
        backgroundColor: "#ffffff",
        scale: 4,
        useCORS: true
    });

    if (menu) {
        menu.style.display = "";
    }

    const link = document.createElement("a");

    link.download =
        (currentOrganism[SCHEMA.NAME_AR] || "organism") + ".png";

    link.href = canvas.toDataURL("image/png", 1);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

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
shareBtn.addEventListener("click", async () => {

    if (!currentOrganism) return;

    const url =
        `${window.location.origin}${window.location.pathname.replace("index.html", "")}organism.html?id=${currentOrganism.id}`;

    try {

        if (navigator.share) {

            await navigator.share({

                title: currentOrganism[SCHEMA.NAME_AR] ||
                       currentOrganism[SCHEMA.SCIENTIFIC_NAME],

                text: currentOrganism[SCHEMA.DESCRIPTION] || "",

                url

            });

        } else {

            await navigator.clipboard.writeText(url);

            alert("تم نسخ الرابط.");

        }

    } catch (e) {

        console.log(e);

    }

    closeCardMenu();

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
