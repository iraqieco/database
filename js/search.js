/* ==========================================================================
   Iraqi Eco
   Search Engine
   ========================================================================== */

import { searchOrganisms } from "./api.js";
import { normalizeText } from "./helpers.js";

/* ==========================================================================
   Normalize Query
   ========================================================================== */

export function prepareQuery(query = "") {

    return normalizeText(query);

}



/* ==========================================================================
   Search
   ========================================================================== */

export async function search(query) {

    query = prepareQuery(query);

    if (!query) {

        return [];

    }

    return await searchOrganisms(query);

}



/* ==========================================================================
   Filter
   ========================================================================== */

export function filter(data = [], query = "") {

    query = prepareQuery(query);

    if (!query) {

        return data;

    }

    return data.filter(item =>

        Object.values(item)

            .filter(value =>

                typeof value === "string"

            )

            .some(value =>

                normalizeText(value)

                    .includes(query)

            )

    );

}



/* ==========================================================================
   Sort
   ========================================================================== */

export function sortByName(data = [], field) {

    return [...data].sort((a, b) =>

        (a[field] || "")

            .localeCompare(

                b[field] || "",

                undefined,

                {

                    sensitivity: "base"

                }

            )

    );

}



/* ==========================================================================
   Pagination
   ========================================================================== */

export function paginate(

    data = [],

    page = 1,

    limit = 24

) {

    const start = (page - 1) * limit;

    return data.slice(

        start,

        start + limit

    );

}



/* ==========================================================================
   Search Controller
   ========================================================================== */

export async function executeSearch({

    query,

    onLoading = () => {},

    onSuccess = () => {},

    onError = () => {}

}) {

    try {

        onLoading(true);

        const results = await search(query);

        onSuccess(results);

    }

    catch (error) {

        console.error(error);

        onError(error);

    }

    finally {

        onLoading(false);

    }

}
