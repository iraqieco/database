/* ==========================================================================
   Iraqi Eco
   Edit Page
   Part 1/15
   ========================================================================== */

import { SCHEMA } from "./schema.js";

import {

    getOrganismById,

    createOrganism,

    updateOrganism

} from "./api.js";

/* ==========================================================================
   Elements
   ========================================================================== */

const form =

    document.getElementById(

        "organism-form"

    );

const title =

    document.getElementById(

        "page-title"

    );

const params =

    new URLSearchParams(

        window.location.search

    );

const organismId =

    params.get("id");

/* ==========================================================================
   Hidden Fields
   ========================================================================== */

const HIDDEN_FIELDS = new Set([

    SCHEMA.TABLE,

    SCHEMA.ID,

    SCHEMA.CREATED_AT,

    SCHEMA.UPDATED_AT,

    SCHEMA.CREATED_BY,

    SCHEMA.UPDATED_BY

]);

/* ==========================================================================
   Startup
   ========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initialize

);
/* ==========================================================================
   Initialize
   Part 2/15
   ========================================================================== */

async function initialize() {

    createForm();

    createImagePreview();

    watchChanges();

    if (organismId) {

        title.textContent =

            "تعديل الكائن";

        await loadRecord();

    }

    else {

        title.textContent =

            "إضافة كائن";

    }

}

/* ==========================================================================
   Load Record
   ========================================================================== */

async function loadRecord() {

    try {

        const organism =

            await getOrganismById(

                organismId

            );

        fillForm(

            organism

        );

    }

    catch (err) {

        console.error(err);

        alert(

            "تعذر تحميل البيانات."

        );

    }

}
/* ==========================================================================
   Create Form
   Part 3/15
   ========================================================================== */

function createForm() {

    Object.values(SCHEMA).forEach(field => {

        if (

            HIDDEN_FIELDS.has(field)

        ) {

            return;

        }

        const wrapper =

            document.createElement("div");

        wrapper.className =

            "form-group";

        const label =

            document.createElement("label");

        label.htmlFor = field;

        label.textContent =

            formatLabel(field);

        const input =

            createInput(field);

        wrapper.append(

            label,

            input

        );

        form.appendChild(

            wrapper

        );

    });

}

/* ==========================================================================
   Create Input
   ========================================================================== */

function createInput(field) {

    const textareaFields = [

        SCHEMA.DESCRIPTION,
     
        SCHEMA.NOTES,

        SCHEMA.REFERENCES

    ];

    let element;

    if (

        textareaFields.includes(field)

    ) {

        element =

            document.createElement(

                "textarea"

            );

        element.rows = 5;

    }

    else {

        element =

            document.createElement(

                "input"

            );

        element.type = "text";

    }

    element.id = field;

    element.name = field;

    return element;

          }
/* ==========================================================================
   Fill Form
   Part 4/15
   ========================================================================== */

function fillForm(record) {

    Object.entries(record).forEach(

        ([key, value]) => {

            const element =

                document.getElementById(

                    key

                );

            if (!element) {

                return;

            }

            if (

                Array.isArray(value)

            ) {

                element.value =

                    value.join("\n");

            }

            else {

                element.value =

                    value ?? "";

            }

        }

    );

    updateImagePreview();

}

/* ==========================================================================
   Label Formatter
   ========================================================================== */

function formatLabel(text) {

    return text

        .replaceAll("_", " ")

        .replace(/\b\w/g, c =>

            c.toUpperCase()

        );

}
/* ==========================================================================
   Build Record
   Part 5/15
   ========================================================================== */

function buildRecord() {

    const record = {};

    Object.values(SCHEMA).forEach(field => {

        if (

            HIDDEN_FIELDS.has(field)

        ) {

            return;

        }

        const element =

            document.getElementById(

                field

            );

        if (!element) {

            return;

        }

        let value =

            element.value.trim();

        if (

            field === SCHEMA.GALLERY

        ) {

            value = value

                .split("\n")

                .map(item => item.trim())

                .filter(Boolean);

        }

        record[field] = value;

    });

    return record;

}

/* ==========================================================================
   Validation
   ========================================================================== */

function validate(record) {

    if (

        !record[SCHEMA.NAME_AR]

    ) {

        alert(

            "الاسم العربي مطلوب."

        );

        return false;

    }

    return true;

}
/* ==========================================================================
   Save Record
   Part 6/15
   ========================================================================== */

async function saveRecord() {

    let record =

        buildRecord();

    if (

        !validate(record)

    ) {

        return;

    }

    try {

        const now =

            new Date().toISOString();

        record[SCHEMA.UPDATED_AT] =

            now;

        if (organismId) {

            await updateOrganism(

                organismId,

                record

            );

            alert(

                "تم تحديث الكائن بنجاح."
formChanged = false;
            );

        }

        else {

            record[SCHEMA.CREATED_AT] =

                now;

            await createOrganism(

                record

            );

            alert(

                "تمت إضافة الكائن بنجاح."

            );

        }

        window.location.href =

            "admin.html";

    }

    
catch (err) {

    console.error(err);

    alert(
        err?.message ||
        JSON.stringify(err) ||
        "حدث خطأ أثناء الحفظ."
    );

    }

}
/* ==========================================================================
   Form Events
   Part 7/15
   ========================================================================== */

let formChanged = false;

/* ==========================================================================
   Watch Changes
   ========================================================================== */

function watchChanges() {

    form.addEventListener(

        "input",

        () => {

            formChanged = true;

        }

    );

    form.addEventListener(

        "submit",

        async event => {

            event.preventDefault();

            await saveRecord();

        }

    );

}

/* ==========================================================================
   Before Unload
   ========================================================================== */

window.addEventListener(

    "beforeunload",

    event => {

        if (!formChanged) {

            return;

        }

        event.preventDefault();

        event.returnValue = "";

    }

);
/* ==========================================================================
   Image Preview
   Part 8/15
   ========================================================================== */

let previewImage;

/* ==========================================================================
   Create Preview
   ========================================================================== */

function createImagePreview() {

    const imageInput =

        document.getElementById(

            SCHEMA.IMAGE

        );

    if (!imageInput) {

        return;

    }

    previewImage =

        document.createElement("img");

    previewImage.id =

        "image-preview";

    previewImage.alt =

        "Preview";

    previewImage.style.maxWidth =

        "250px";

    previewImage.style.display =

        "none";

    imageInput.parentNode.appendChild(

        previewImage

    );

    imageInput.addEventListener(

        "input",

        updateImagePreview

    );

}

/* ==========================================================================
   Update Preview
   ========================================================================== */

function updateImagePreview() {

    if (!previewImage) {

        return;

    }

    const value =

        document.getElementById(

            SCHEMA.IMAGE

        ).value.trim();

    if (!value) {

        previewImage.style.display =

            "none";

        previewImage.removeAttribute("src");

        return;

    }

    previewImage.src = value;

    previewImage.style.display =

        "block";

}
/* ==========================================================================
   Helpers
   Part 9/15
   ========================================================================== */

function cleanRecord(record) {

    const result = {};

    Object.entries(record).forEach(

        ([key, value]) => {

            if (

                Array.isArray(value)

            ) {

                if (value.length) {

                    result[key] = value;

                }

                return;

            }

            if (

                value === null ||

                value === undefined

            ) {

                return;

            }

            const text =

                String(value).trim();

            if (text !== "") {

                result[key] = text;

            }

        }

    );

    return result;

}

/* ==========================================================================
   Prepare Record
   ========================================================================== */

function prepareRecord(record) {

    return cleanRecord(

        record

    );

}
/* ==========================================================================
   Reset Form
   Part 11/15
   ========================================================================== */

function resetForm() {

    form.reset();

    formChanged = false;

    updateImagePreview();

}

/* ==========================================================================
   Cancel Button
   ========================================================================== */

const cancelButton =

    document.getElementById(

        "cancel-button"

    );

if (cancelButton) {

    cancelButton.addEventListener(

        "click",

        event => {

            event.preventDefault();

            if (

                formChanged &&

                !confirm(

                    "سيتم فقدان التعديلات، هل تريد المتابعة؟"

                )

            ) {

                return;

            }

            window.location.href =

                "admin.html";

        }

    );

}
/* ==========================================================================
   Utilities
   Part 12/15
   ========================================================================== */

function getField(field) {

    return document.getElementById(

        field

    );

}

function setField(field, value) {

    const element =

        getField(field);

    if (!element) {

        return;

    }

    if (

        Array.isArray(value)

    ) {

        element.value =

            value.join("\n");

    }

    else {

        element.value =

            value ?? "";

    }

}

function clearField(field) {

    const element =

        getField(field);

    if (!element) {

        return;

    }

    element.value = "";

}

function isEditMode() {

    return organismId !== null;

}
/* ==========================================================================
   Keyboard Shortcuts
   Part 13/15
   ========================================================================== */

document.addEventListener(

    "keydown",

    event => {

        if (

            event.ctrlKey &&

            event.key.toLowerCase() === "s"

        ) {

            event.preventDefault();

            saveRecord();

        }

        if (

            event.key === "Escape"

        ) {

            const active =

                document.activeElement;

            if (

                active &&

                typeof active.blur ===

                    "function"

            ) {

                active.blur();

            }

        }

    }

);
/* ==========================================================================
   Final Checks
   Part 14/15
   ========================================================================== */

function checkRequiredFields() {

    const required = [

        SCHEMA.NAME_AR

    ];

    for (const field of required) {

        const element =

            document.getElementById(

                field

            );

        if (

            !element ||

            !element.value.trim()

        ) {

            element?.focus();

            return false;

        }

    }

    return true;

}

/* ==========================================================================
   Public API
   ========================================================================== */

window.editPage = Object.freeze({

    save: saveRecord,

    reset: resetForm,

    validate: checkRequiredFields,

    load: loadRecord

});
/* ==========================================================================
   End of File
   Part 15/15
   ========================================================================== */

/*
    Iraqi Eco
    Edit Page

    يعتمد هذا الملف على:

    - schema.js
    - api.js
    - config.js
    - helpers.js
    - supabase.js

    ويوفر:

    ✔ إنشاء النموذج تلقائياً
    ✔ تحميل سجل للتعديل
    ✔ إنشاء سجل جديد
    ✔ التحقق من البيانات
    ✔ معاينة الصورة
    ✔ اكتشاف التعديلات
    ✔ اختصار Ctrl + S للحفظ
    ✔ تنبيه قبل مغادرة الصفحة
*/
