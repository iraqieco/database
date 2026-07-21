/* ==========================================================================
   Iraqi Eco
   Database Schema
   ========================================================================== */

export const SCHEMA = Object.freeze({

    /* ===========================
       Table
    =========================== */

    TABLE: "organisms",



    /* ===========================
       Primary Key
    =========================== */

    ID: "id",



    /* ===========================
       Basic Information
    =========================== */

    NAME_AR: "name_ar",

    NAME_EN: "name_en",

    NAME_KU: "name_ku",

    SCIENTIFIC_NAME: "scientific_name",

    OTHER_NAMES: "other_names",



    /* ===========================
       Classification
    =========================== */

    DOMAIN: "domain",

    KINGDOM: "kingdom",

    PHYLUM: "phylum",

    CLASS: "class",

    ORDER: "order",

    FAMILY: "family",

    GENUS: "genus",

    SPECIES: "species",

    GROUP: "group",



    /* ===========================
       Description
    =========================== */

    DESCRIPTION: "description"



    /* ===========================
       Distribution
    =========================== */

    HABITAT: "habitat",

    DISTRIBUTION: "distribution",

    LOCATION: "location",



    /* ===========================
       Physical Information
    =========================== */

    SIZE: "size",

    WEIGHT: "weight",

    COLOR: "color",

    LIFESPAN: "lifespan",



    /* ===========================
       Biology
    =========================== */

    DIET: "diet",

    REPRODUCTION: "reproduction",

    BEHAVIOR: "behavior",

    ACTIVITY: "activity",



    /* ===========================
       Conservation
    =========================== */

    CONSERVATION_STATUS: "conservation_status",

    THREATS: "threats",

    PROTECTION: "protection",



    /* ===========================
       Images
    =========================== */

    IMAGE: "image",

    IMAGE_SOURCE: "image_source",

    GALLERY: "gallery",



    /* ===========================
       References
    =========================== */

    REFERENCES: "references",

    NOTES: "notes",



    /* ===========================
       Metadata
    =========================== */

    CREATED_AT: "created_at",

    UPDATED_AT: "updated_at",

    CREATED_BY: "created_by",

    UPDATED_BY: "updated_by"

});
