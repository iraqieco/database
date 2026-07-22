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
