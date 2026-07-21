/* ==========================================================================
   Iraqi Eco
   Admin Panel
   ========================================================================== */

import {
    initializeSupabase,
    signOut
} from "./supabase.js";

import {
    initializeTheme
} from "./theme.js";

import {
    initializeLanguage,
    t
} from "./language.js";

import {
    getOrganisms,
    deleteOrganism
} from "./api.js";

import {
    SCHEMA
} from "./schema.js";

import {
    createImage,
    detectImageSource
} from "./image.js";

import {
    success,
    error
} from "./notifications.js";

/* ==========================================================================
   Elements
   ========================================================================== */

const tableContainer =
    document.getElementById("admin-table");

const logoutButton =
    document.getElementById("logout-button");

const newButton =
    document.getElementById("new-button");

/* ==========================================================================
   Table
   ========================================================================== */

function createTable(data) {

    const table =
        document.createElement("table");

    table.className = "admin-table";

    table.innerHTML = `
        <thead>
            <tr>
                <th>الصورة</th>
                <th>الاسم</th>
                <th>الاسم العلمي</th>
                <th>الإجراءات</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody =
        table.querySelector("tbody");

    data.forEach(item => {

        const row =
            document.createElement("tr");

        /* Image */

        const imageCell =
            document.createElement("td");

        imageCell.append(

            createImage({

                src: item[SCHEMA.IMAGE],

                source: detectImageSource(

                    item[SCHEMA.IMAGE]

                ),

                alt:

                    item[SCHEMA.NAME_AR] ||

                    ""

            })

        );

        imageCell.firstChild.classList.add(
            "admin-image"
        );

        /* Name */

        const nameCell =
            document.createElement("td");

        nameCell.textContent =

            item[SCHEMA.NAME_AR] ||

            item[SCHEMA.NAME_EN] ||

            item[SCHEMA.NAME_KU] ||

            "-";

        /* Scientific */

        const scientificCell =
            document.createElement("td");

        scientificCell.textContent =

            item[SCHEMA.SCIENTIFIC_NAME] ||

            "-";

        /* Actions */

        const actionsCell =
            document.createElement("td");

        actionsCell.className =
            "admin-actions";

        const edit =
            document.createElement("button");

        edit.className =
            "btn btn-primary";

        edit.textContent =
            t("buttons.edit");

        edit.onclick = () => {

            window.location.href =

                `edit.html?id=${item[SCHEMA.ID]}`;

        };

        const remove =
            document.createElement("button");

        remove.className =
            "btn btn-danger";

        remove.textContent =
            t("buttons.delete");

        remove.onclick = async () => {

            if (

                !confirm(

                    "هل تريد حذف هذا الكائن؟"

                )

            ) {

                return;

            }

            try {

                await deleteOrganism(

                    item[SCHEMA.ID]

                );

                success(

                    "تم الحذف."

                );

                load();

            }

            catch (e) {

                console.error(e);

                error(

                    t("error")

                );

            }

        };

        actionsCell.append(

            edit,

            remove

        );

        row.append(

            imageCell,

            nameCell,

            scientificCell,

            actionsCell

        );

        tbody.append(row);

    });

    return table;

}

/* ==========================================================================
   Load
   ========================================================================== */

async function load() {

    try {

        tableContainer.innerHTML = "";

        const result =
            await getOrganisms(
                1,
                1000
            );

        if (

            result.data.length === 0

        ) {

            tableContainer.innerHTML =
                `<div class="admin-empty">

                    ${t("noData")}

                </div>`;

            return;

        }

        tableContainer.append(

            createTable(

                result.data

            )

        );

    }

    catch (e) {

        console.error(e);

        error(

            t("error")

        );

    }

}

/* ==========================================================================
   Events
   ========================================================================== */

logoutButton.addEventListener(

    "click",

    async () => {

        await signOut();

        window.location.href =
            "login.html";

    }

);

newButton.addEventListener(

    "click",

    () => {

        window.location.href =
            "edit.html";

    }

);

/* ==========================================================================
   Initialize
   ========================================================================== */

async function initialize() {

    await initializeLanguage();

    initializeTheme();

    initializeSupabase();

    await load();

}

initialize();
