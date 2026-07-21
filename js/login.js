/* ==========================================================================
   Iraqi Eco
   Login Page
   ========================================================================== */

import { initializeTheme } from "./theme.js";
import { initializeLanguage, t } from "./language.js";
import { initializeSupabase, signIn } from "./supabase.js";
import { success, error } from "./notifications.js";

/* ==========================================================================
   Elements
   ========================================================================== */

const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const button = document.getElementById("login-button");

/* ==========================================================================
   Login
   ========================================================================== */

async function login(event) {

    event.preventDefault();

    button.disabled = true;

    try {

        const result = await signIn(

            email.value.trim(),

            password.value

        );

        if (result.error) {

            throw result.error;

        }

        success(

            t(

                "login.success",

                "Login successful."

            )

        );

        window.location.href =

            "admin.html";

    }

    catch (e) {

        console.error(e);

        error(

            t(

                "login.failed",

                "Incorrect email or password."

            )

        );

    }

    finally {

        button.disabled = false;

    }

}

/* ==========================================================================
   Initialize
   ========================================================================== */

async function initialize() {

    await initializeLanguage();

    initializeTheme();

    initializeSupabase();

    form.addEventListener(

        "submit",

        login

    );

}

initialize();
