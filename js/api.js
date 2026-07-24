/* ==========================================================================
   Iraqi Eco
   Database API
   ========================================================================== */

import { CONFIG } from "./config.js";
import { SCHEMA } from "./schema.js";
import { getClient } from "./supabase.js";
import { normalizeText } from "./helpers.js";

/* ==========================================================================
   Table
   ========================================================================== */

const TABLE = SCHEMA.TABLE;

/* ==========================================================================
   Get All
   ========================================================================== */

export async function getOrganisms(
    page = 1,
    limit = CONFIG.pagination.defaultLimit
) {

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await getClient()

        .from(TABLE)

        .select("*", {

            count: "exact"

        })

        .range(from, to)

        .order(

            SCHEMA.NAME_AR,

            {

                ascending: true

            }

        );

    if (error) {

        throw error;

    }

    return {

        data,

        count

    };

}

/* ==========================================================================
   Get By ID
   ========================================================================== */

export async function getOrganismById(id) {

    const { data, error } = await getClient()

        .from(TABLE)

        .select("*")

        .eq(

            SCHEMA.ID,

            id

        )

        .single();

    if (error) {

        throw error;

    }

    return data;

}

/* ==========================================================================
   Search
   ========================================================================== */

export async function searchOrganisms(query) {

    query = normalizeText(query);

    const { data, error } = await getClient()

        .from(TABLE)

        .select("*");

    if (error) {

        throw error;

    }

    return data.filter(item => {

        return [

            item[SCHEMA.NAME_AR],

            item[SCHEMA.NAME_EN],

            item[SCHEMA.NAME_KU],

            item[SCHEMA.SCIENTIFIC_NAME],

            item[SCHEMA.OTHER_NAMES]

        ]

        .filter(Boolean)

        .some(value =>

            normalizeText(value)

            .includes(query)

        );

    });

}

/* ==========================================================================
   Insert
   ========================================================================== */

export async function createOrganism(record) {

    const { data, error } = await getClient()

        .from(TABLE)

        .insert(record)

        .select()

        .single();

    if (error) {

        throw error;

    }

    return data;

}

/* ==========================================================================
   Update
   ========================================================================== */

export async function updateOrganism(id, record) {

    const { data, error } = await getClient()

        .from(TABLE)

        .update(record)

        .eq(

            SCHEMA.ID,

            id

        )

        .select()

        .maybesingle();

    if (error) {

        throw error;

    }

    return data;

}

/* ==========================================================================
   Delete
   ========================================================================== */

export async function deleteOrganism(id) {

    const { error } = await getClient()

        .from(TABLE)

        .delete()

        .eq(

            SCHEMA.ID,

            id

        );

    if (error) {

        throw error;

    }

    return true;

}

/* ==========================================================================
   Latest
   ========================================================================== */

export async function getLatestOrganisms() {

    const { data, error } = await getClient()

        .from(TABLE)

        .select("*")

        .order(

            SCHEMA.NAME_AR,

            {

                ascending: true

            }

        );

    if (error) {

        throw error;

    }

    return data;

}
/* ==========================================================================
   Count
   ========================================================================== */

export async function getOrganismsCount() {

    const { count, error } = await getClient()

        .from(TABLE)

        .select(

            SCHEMA.ID,

            {

                count: "exact",

                head: true

            }

        );

    if (error) {

        throw error;

    }

    return count;

}

