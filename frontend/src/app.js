// Menu
const menuBtn = document.getElementById("menu-btn");
const menu = document.querySelector("#mobile-menu > ul");
const menuIcon = document.getElementById("menu-icon");

if (menuBtn) {
  menuBtn.addEventListener("click", toggleMenu);
}

function toggleMenu() {
  if (!menu || !menuIcon) return;

  const isOpen = menu.classList.contains("w-[16rem]");

  if (isOpen) {
    menu.classList.remove("w-[16rem]", "max-w-[16rem]", "opacity-100", "pointer-events-auto", "overflow-visible");
    menu.classList.add("w-0", "max-w-0", "opacity-0", "pointer-events-none", "overflow-hidden");
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
    return;
  }

  menu.classList.remove("w-0", "max-w-0", "opacity-0", "pointer-events-none", "overflow-hidden");
  menu.classList.add("w-[16rem]", "max-w-[16rem]", "opacity-100", "pointer-events-auto", "overflow-visible");

  menuIcon.classList.remove("fa-bars");
  menuIcon.classList.add("fa-times");
}
