/* ==========================================================================
   Iraqi Eco
   Supabase Client
   ========================================================================== */

import { CONFIG } from "./config.js";

/* ==========================================================================
   Client
   ========================================================================== */

let client = null;



/* ==========================================================================
   Initialize
   ========================================================================== */

export function initializeSupabase() {

    if (client) {

        return client;

    }

    if (!window.supabase) {

        throw new Error(

            "Supabase library is not loaded."

        );

    }

    client = window.supabase.createClient(

        CONFIG.supabase.url,

        CONFIG.supabase.anonKey

    );

    return client;

}



/* ==========================================================================
   Get Client
   ========================================================================== */

export function getClient() {

    if (!client) {

        return initializeSupabase();

    }

    return client;

}



/* ==========================================================================
   Health Check
   ========================================================================== */

export async function isConnected() {

    try {

        const { error } = await getClient()

            .from(CONFIG.database.table)

            .select("id")

            .limit(1);

        return !error;

    }

    catch {

        return false;

    }

}



/* ==========================================================================
   Authentication
   ========================================================================== */

export async function signIn(

    email,

    password

) {

    return await getClient()

        .auth

        .signInWithPassword({

            email,

            password

        });

}



export async function signOut() {

    return await getClient()

        .auth

        .signOut();

}



export async function getUser() {

    const {

        data,

        error

    } = await getClient()

        .auth

        .getUser();

    if (error) {

        return null;

    }

    return data.user;

}



/* ==========================================================================
   Session
   ========================================================================== */

export async function getSession() {

    const {

        data,

        error

    } = await getClient()

        .auth

        .getSession();

    if (error) {

        return null;

    }

    return data.session;

}



/* ==========================================================================
   Auth Listener
   ========================================================================== */

export function onAuthChange(callback) {

    return getClient()

        .auth

        .onAuthStateChange(

            (_, session) => {

                callback(session);

            }

        );

}



/* ==========================================================================
   Auto Initialize
   ========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        initializeSupabase();

    }

);
