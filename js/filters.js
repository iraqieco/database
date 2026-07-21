/* ==========================================================================
   Iraqi Eco
   Filters
   ========================================================================== */

import { SCHEMA } from "./schema.js";
import { normalizeText } from "./helpers.js";

export function initializeFilters(
    organisms,
    container,
    searchInput,
    createCard
) {

    let currentKingdom = "";
    let currentImage = "";

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

            return (
                matchesSearch &&
                matchesKingdom &&
                matchesImage
            );

        });

        container.innerHTML = "";

        filtered.forEach(item => {

            container.append(
                createCard(item)
            );

        });

    }

    searchInput.addEventListener(
        "input",
        render
    );

    document.querySelectorAll(".filter-btn")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                currentKingdom =
                    btn.dataset.kingdom;

                render();

            });

        });

    document.querySelectorAll(".image-btn")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                currentImage =
                    btn.dataset.image;

                render();

            });

        });

    render();

}
