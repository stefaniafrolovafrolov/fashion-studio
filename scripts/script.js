document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".mobile-header__gamburger-button");
  const menu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");

  let isOpen = false;

  burger.addEventListener("click", () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  function openMenu() {
    menu.classList.remove("close");
    menu.classList.add("open");

    burger.classList.add("open");
    document.body.classList.add("no-scroll");
    isOpen = true;
  }

  function closeMenu() {
    menu.classList.remove("open");
    menu.classList.add("close");

    burger.classList.remove("open");
    document.body.classList.remove("no-scroll");
    isOpen = false;
  }
});
