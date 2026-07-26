/* ==========================================================================
   Iraqi Eco
   Filters
   ========================================================================== */

import { SCHEMA } from "./schema.js";
import { normalizeText } from "./helpers.js";

export async function initializeFilters(
    organisms,
    container,
    searchInput,
    createCard
) {

    let currentKingdom = "";
    let currentImage = "";
    let currentClass = "";

    async function render() {

        const query = normalizeText(
            searchInput.value.trim()
        );

        const filtered = organisms.filter(item => {

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

            const matchesKingdom =
                !currentKingdom ||
                item[SCHEMA.KINGDOM] === currentKingdom;

            const hasImage =
                item[SCHEMA.IMAGE] &&
                item[SCHEMA.IMAGE].trim() !== "";

            const matchesImage =
                currentImage === "" ||
                (currentImage === "with" && hasImage) ||
                (currentImage === "without" && !hasImage);

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

        document.querySelectorAll(".filter-btn").forEach(btn => {

            const kingdom = btn.dataset.kingdom;

            const count = kingdom === ""
                ? organisms.length
                : organisms.filter(
                    o => o[SCHEMA.KINGDOM] === kingdom
                ).length;

            const span = btn.querySelector(".count");

            if (span) {
                span.textContent = ` (${count})`;
            }

        });

        container.innerHTML = "";

        for (const item of filtered) {

            const card = await createCard(item);

            container.append(card);

        }

                                          }
       document.querySelectorAll(".filter-btn").forEach(btn => {

        btn.addEventListener("click", async () => {

            document
                .querySelectorAll(".filter-btn")
                .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            currentKingdom = btn.dataset.kingdom;

            await render();

        });

    });

    document.querySelectorAll(".image-btn").forEach(btn => {

        btn.addEventListener("click", async () => {

            document
                .querySelectorAll(".image-btn")
                .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            currentImage = btn.dataset.image;

            await render();

        });

    });

    document.querySelectorAll(".class-btn").forEach(btn => {

        btn.addEventListener("click", async () => {

            document
                .querySelectorAll(".class-btn")
                .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            currentClass = btn.dataset.class;

            await render();

        });

    });

    if (searchInput) {

        searchInput.addEventListener("input", async () => {

            await render();

        });

                                          }

    const totalCounter = document.getElementById("results-count");

    if (totalCounter) {

        totalCounter.textContent =
            `${filtered.length} / ${organisms.length}`;

    }

    await render();

               }
