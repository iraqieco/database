/* ==========================================================================
   Iraqi Eco
   UI Utilities
   ========================================================================== */

import { createImage } from "./image.js";
import { hasValue } from "./helpers.js";

/* ==========================================================================
   Query
   ========================================================================== */

export function $(selector, parent = document) {

    return parent.querySelector(selector);

}

export function $$(selector, parent = document) {

    return [...parent.querySelectorAll(selector)];

}



/* ==========================================================================
   Visibility
   ========================================================================== */

export function show(element) {

    if (!element) {

        return;

    }

    element.hidden = false;

}



export function hide(element) {

    if (!element) {

        return;

    }

    element.hidden = true;

}



/* ==========================================================================
   Text
   ========================================================================== */

export function setText(element, value = "") {

    if (!element) {

        return;

    }

    element.textContent = hasValue(value)

        ? value

        : "";

}



/* ==========================================================================
   HTML
   ========================================================================== */

export function setHTML(element, html = "") {

    if (!element) {

        return;

    }

    element.innerHTML = html;

}



/* ==========================================================================
   Image
   ========================================================================== */

export function setImage(

    element,

    {

        src = "",

        alt = "",

        source

    } = {}

) {

    if (!element) {

        return;

    }

    const image = createImage({

        src,

        alt,

        source

    });

    element.replaceWith(image);

    return image;

}



/* ==========================================================================
   Loading
   ========================================================================== */

export function setLoading(element, loading) {

    if (!element) {

        return;

    }

    element.disabled = loading;

    element.classList.toggle(

        "is-loading",

        loading

    );

}



/* ==========================================================================
   Clear
   ========================================================================== */

export function clear(element) {

    if (!element) {

        return;

    }

    element.innerHTML = "";

}



/* ==========================================================================
   Append
   ========================================================================== */

export function append(

    parent,

    ...children

) {

    if (!parent) {

        return;

    }

    parent.append(...children);

}



/* ==========================================================================
   Card
   ========================================================================== */

export function createCard({

    title = "",

    content = ""

} = {}) {

    const card = document.createElement("article");

    card.className = "card";

    card.innerHTML = `
        <div class="card-body">
            <h3>${title}</h3>
            <p>${content}</p>
        </div>
    `;

    return card;

}



/* ==========================================================================
   Empty State
   ========================================================================== */

export function createEmpty(message = "") {

    const element = document.createElement("div");

    element.className = "empty-state";

    element.textContent = message;

    return element;

}



/* ==========================================================================
   Loader
   ========================================================================== */

export function createLoader() {

    const loader = document.createElement("div");

    loader.className = "loader";

    return loader;

}



/* ==========================================================================
   Remove
   ========================================================================== */

export function remove(element) {

    if (element) {

        element.remove();

    }

}



/* ==========================================================================
   Event
   ========================================================================== */

export function on(

    element,

    event,

    callback,

    options

) {

    if (!element) {

        return;

    }

    element.addEventListener(

        event,

        callback,

        options

    );

}
