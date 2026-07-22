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
.menu-dropdown{

    background:#f5f5f5;

    border-radius:12px;

    margin-bottom:10px;

}

.menu-dropdown summary{

    list-style:none;

    cursor:pointer;

    padding:16px;

    font-weight:bold;

    display:flex;

    justify-content:space-between;

}

.menu-dropdown summary::-webkit-details-marker{

    display:none;

}

.menu-dropdown-content{

    padding:0 16px 16px;

    color:#444;

        }
