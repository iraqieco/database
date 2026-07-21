/* ==========================================================================
   Iraqi Eco
   Notification Manager
   ========================================================================== */

let container = null;



/* ==========================================================================
   Initialize
   ========================================================================== */

function initialize() {

    if (container) {

        return;

    }

    container = document.createElement("div");

    container.id = "notification-container";

    Object.assign(container.style, {

        position: "fixed",

        top: "20px",

        insetInlineEnd: "20px",

        display: "flex",

        flexDirection: "column",

        gap: "12px",

        zIndex: "5000",

        pointerEvents: "none"

    });

    document.body.appendChild(container);

}



/* ==========================================================================
   Create
   ========================================================================== */

function create(message, type, duration) {

    initialize();

    const notification = document.createElement("div");

    notification.textContent = message;

    notification.style.pointerEvents = "auto";

    notification.style.minWidth = "260px";

    notification.style.maxWidth = "380px";

    notification.style.padding = "14px 18px";

    notification.style.borderRadius = "12px";

    notification.style.color = "#FFFFFF";

    notification.style.fontWeight = "600";

    notification.style.boxShadow = "0 10px 25px rgba(0,0,0,.18)";

    notification.style.transform = "translateY(-10px)";

    notification.style.opacity = "0";

    notification.style.transition = "all .25s ease";



    switch (type) {

        case "success":

            notification.style.background = "#2E7D32";

            break;

        case "warning":

            notification.style.background = "#F9A825";

            break;

        case "error":

            notification.style.background = "#C62828";

            break;

        default:

            notification.style.background = "#1565C0";

    }



    container.appendChild(notification);



    requestAnimationFrame(() => {

        notification.style.opacity = "1";

        notification.style.transform = "translateY(0)";

    });



    setTimeout(() => {

        notification.style.opacity = "0";

        notification.style.transform = "translateY(-10px)";



        setTimeout(() => {

            notification.remove();

        }, 250);

    }, duration);

}



/* ==========================================================================
   Public API
   ========================================================================== */

export function success(message, duration = 3000) {

    create(message, "success", duration);

}



export function info(message, duration = 3000) {

    create(message, "info", duration);

}



export function warning(message, duration = 3000) {

    create(message, "warning", duration);

}



export function error(message, duration = 4000) {

    create(message, "error", duration);

}
