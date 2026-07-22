/* ==========================================================================
   Iraqi Eco
   Image Manager
   ========================================================================== */

import { CONFIG } from "./config.js";
import { IMAGE_SOURCE } from "./constants.js";
import { isEmpty, isUrl, trim } from "./helpers.js";

/* ==========================================================================
   Build Image URL
   ========================================================================== */

export function getImageUrl(image, source = IMAGE_SOURCE.URL) {

    if (isEmpty(image)) {

    return "assets/images/no-image.png";

    }
    

    image = trim(image);

    if (isUrl(image)) {

        return image;

    }

    switch (source) {

        case IMAGE_SOURCE.GITHUB:

            return CONFIG.images.githubBase + image;

        case IMAGE_SOURCE.URL:

        default:

            return image;

    }

}



/* ==========================================================================
   Gallery
   ========================================================================== */

export function getGallery(images = [], source = IMAGE_SOURCE.URL) {

    if (!Array.isArray(images)) {

        return [];

    }

    return images

        .filter(image => !isEmpty(image))

        .map(image => getImageUrl(image, source));

}



/* ==========================================================================
   Create Image Element
   ========================================================================== */

export function createImage({
    src = "",
    alt = "",
    className = "",
    loading = "lazy",
    source = IMAGE_SOURCE.URL
} = {}) {

    const image = document.createElement("img");

    image.src = getImageUrl(src, source);
    image.alt = alt;
    image.loading = loading;
    image.decoding = "async";
    image.className = className;

    image.onerror = () => {
        image.src = "assets/images/no-image.png";
    };

    return image;
}
/* ==========================================================================
   Replace Broken Images
   ========================================================================== */

export function fixBrokenImages(parent = document) {

    parent

        .querySelectorAll("img")

        .forEach(image => {

            image.onerror = () => {

                image.src = CONFIG.images.placeholder;

            };

        });

}



/* ==========================================================================
   Detect Source
   ========================================================================== */

export function detectImageSource(image = "") {

    if (isEmpty(image)) {

        return IMAGE_SOURCE.URL;

    }

    image = trim(image);

    if (isUrl(image)) {

        return IMAGE_SOURCE.URL;

    }

    return IMAGE_SOURCE.GITHUB;

}



/* ==========================================================================
   Validate Image
   ========================================================================== */

export function isValidImage(image = "") {

    if (isEmpty(image)) {

        return false;

    }

    return true;

}
