const menu = document.getElementById("side-menu");

const overlay = document.getElementById("menu-overlay");

const openBtn = document.getElementById("menu-toggle");

const closeBtn = document.getElementById("menu-close");

openBtn.addEventListener("click", () => {

    menu.classList.add("show");

    overlay.classList.add("show");

});

closeBtn.addEventListener("click", closeMenu);

overlay.addEventListener("click", closeMenu);

function closeMenu() {

    menu.classList.remove("show");

    overlay.classList.remove("show");

}
const sourcesToggle = document.getElementById("sources-toggle");
const sourcesBox = document.getElementById("sources-box");

sourcesToggle.addEventListener("click", (e) => {

    e.preventDefault();

    

    if (sourcesBox.style.display === "block") {

        sourcesBox.style.display = "none";

    } else {

        sourcesBox.style.display = "block";

        sourcesBox.scrollIntoView({
            behavior: "smooth"
        });

    }

});
const supportToggle = document.getElementById("support-toggle");
const supportBox = document.getElementById("support-box");

if (supportToggle && supportBox) {

    supportToggle.addEventListener("click", function (e) {

        e.preventDefault();

        supportBox.style.display =
            supportBox.style.display === "block"
                ? "none"
                : "block";

    });

}

const contactToggle = document.getElementById("contact-toggle");
const contactBox = document.getElementById("contact-box");

if (contactToggle && contactBox) {

    contactToggle.addEventListener("click", function (e) {

        e.preventDefault();

        contactBox.style.display =
            contactBox.style.display === "block"
                ? "none"
                : "block";

    });

}
const languageToggle = document.getElementById("language-toggle");
const languageBox = document.getElementById("language-box");

if (languageToggle && languageBox) {

    languageToggle.addEventListener("click", function (e) {

        e.preventDefault();

        languageBox.style.display =
            languageBox.style.display === "block"
                ? "none"
                : "block";

    });

}
