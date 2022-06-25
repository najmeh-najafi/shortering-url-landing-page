const menuBtn = document.querySelector(".c-menu-btn");
const menu = document.querySelector(".c-menu-wrapper");

function openCloseMenu(e) {
    e.target.classList.toggle("fa-bars");
    e.target.classList.toggle("fa-times")
     menu.classList.toggle("js-open")
}
menuBtn.addEventListener("click", openCloseMenu);