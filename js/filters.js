/* ==========================================================================
   Iraqi Eco
   Filters
   ========================================================================== */

import { SCHEMA } from "./schema.js";
import { normalizeText } from "./helpers.js";
import { t } from "./language.js";
export function initializeFilters(
    organisms,
    container,
    searchInput,
    createCard
) {

    let currentKingdom = "";
    let currentImage = "";
    let currentClass = "";

    function render() {

        const query = normalizeText(
            searchInput.value.trim()
        );

        const filtered = organisms.filter(item => {

            /* البحث */

            const matchesSearch = [

                item[SCHEMA.NAME_AR],
                item[SCHEMA.NAME_EN],
                item[SCHEMA.NAME_KU],
                item[SCHEMA.SCIENTIFIC_NAME],
                item[SCHEMA.OTHER_NAMES]

            ]

            .filter(Boolean)

            .some(text =>
                normalizeText(text).includes(query)
            );

            /* المملكة */

            const matchesKingdom =
                !currentKingdom ||
                item[SCHEMA.KINGDOM] === currentKingdom;

            /* الصور */

            const hasImage =
                item[SCHEMA.IMAGE] &&
                item[SCHEMA.IMAGE].trim() !== "";

            const matchesImage =

                currentImage === "" ||

                (currentImage === "with" && hasImage) ||

                (currentImage === "without" && !hasImage);

            /* الطائفة */

            const matchesClass =
                !currentClass ||
                item[SCHEMA.CLASS] === currentClass;

            return (
                matchesSearch &&
                matchesKingdom &&
                matchesImage &&
                matchesClass
            );

        });

        container.innerHTML = "";

        filtered.forEach(item => {

            container.append(
                createCard(item)
            );

        });
// تحديث أعداد الممالك حسب النتائج الحالية
document.querySelectorAll(".filter-btn").forEach(btn => {

    const kingdom = btn.dataset.kingdom;

    const count = kingdom
        ? filtered.filter(o => o[SCHEMA.KINGDOM] === kingdom).length
        : filtered.length;

    btn.textContent = btn.textContent.replace(/\(\d+\)/, "").trim() + ` (${count})`;

});

// تحديث أعداد الصور حسب النتائج الحالية
const withImages = filtered.filter(o =>
    o[SCHEMA.IMAGE] && o[SCHEMA.IMAGE].trim() !== ""
).length;

const withoutImages = filtered.length - withImages;

document.querySelectorAll(".image-btn").forEach(btn => {

    let count = filtered.length;

    if (btn.dataset.image === "with") count = withImages;
    if (btn.dataset.image === "without") count = withoutImages;

    btn.textContent = btn.textContent.replace(/\(\d+\)/, "").trim() + ` (${count})`;

});
    }

    searchInput.addEventListener(
        "input",
        render
    );
// تحديث عدد الكائنات في أزرار الممالك
document.querySelectorAll(".filter-btn").forEach(btn => {
    const kingdom = btn.dataset.kingdom;

    const count = kingdom
        ? organisms.filter(o => o[SCHEMA.KINGDOM] === kingdom).length
        : organisms.length;

    btn.textContent = `${btn.textContent} (${count})`;
});
    document.querySelectorAll(".filter-btn")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                currentKingdom =
                    btn.dataset.kingdom;

                render();

            });

        });
// تحديث عدد الكائنات في أزرار الصور
const withImages = organisms.filter(o =>
    o[SCHEMA.IMAGE] && o[SCHEMA.IMAGE].trim() !== ""
).length;

const withoutImages = organisms.length - withImages;

document.querySelectorAll(".image-btn").forEach(btn => {
    if (btn.dataset.image === "") {
        btn.textContent += ` (${organisms.length})`;
    } else if (btn.dataset.image === "with") {
        btn.textContent += ` (${withImages})`;
    } else if (btn.dataset.image === "without") {
        btn.textContent += ` (${withoutImages})`;
    }
});
    document.querySelectorAll(".image-btn")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                currentImage =
                    btn.dataset.image;

                render();

            });

        });

    /* فلتر الأصناف */

    document.querySelectorAll(".class-btn")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                currentClass =
                    btn.dataset.class || "";

                render();

            });

        });
const classBtn = document.getElementById("classFilterBtn");
const classDrawer = document.getElementById("classDrawer");
const drawerOverlay = document.getElementById("drawerOverlay");
const closeDrawer = document.getElementById("closeDrawer");
const classList = document.getElementById("classList");

if (classBtn) {

    classBtn.onclick = () => {
        classDrawer.classList.add("open");
        drawerOverlay.classList.add("show");
    };

    closeDrawer.onclick = () => {
        classDrawer.classList.remove("open");
        drawerOverlay.classList.remove("show");
    };

    drawerOverlay.onclick = () => {
        classDrawer.classList.remove("open");
        drawerOverlay.classList.remove("show");
    };

    const classes = [
        ...new Set(
            organisms
                .map(o => o[SCHEMA.CLASS])
                .filter(Boolean)
        )
    ].sort();

    classList.innerHTML = "";

    const all = document.createElement("button");
    all.className = "class-btn";
    all.dataset.class = "";
    all.textContent = t("filter.all");
    classList.appendChild(all);

    classes.forEach(c => {

    const count = organisms.filter(
        o => o[SCHEMA.CLASS] === c
    ).length;

    const btn = document.createElement("button");

    btn.className = "class-btn";
    btn.dataset.class = c;
    btn.dataset.class = c;
    btn.textContent = `${t(`class.${c}`, c)} (${count})`;

    classList.appendChild(btn);

});

    document.querySelectorAll(".class-btn")
        .forEach(btn => {

            btn.onclick = () => {

                currentClass = btn.dataset.class;

                classBtn.textContent =
                    currentClass
    ? t(`class.${currentClass}`, currentClass)
    : t("classes.title");

                classDrawer.classList.remove("open");
                drawerOverlay.classList.remove("show");

                render();

            };

        });

       }
const classSearch = document.getElementById("classSearch");

classSearch.addEventListener("input", () => {

    const q = classSearch.value.trim().toLowerCase();

    document.querySelectorAll(".class-btn").forEach(btn => {

        btn.style.display =
            btn.textContent.toLowerCase().includes(q)
                ? "block"
                : "none";

    });

});
   render();

                   }
