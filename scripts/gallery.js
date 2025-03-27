document.addEventListener("DOMContentLoaded", function () {
  const tabLinks = document.querySelectorAll(
    ".photogallery-section__tabs-link"
  );
  const tabPanes = document.querySelectorAll(".viewer__pane");

  function switchTab(e) {
    e.preventDefault();

    // Удаляем активный класс у всех табов
    tabLinks.forEach((link) =>
      link.classList.remove("photogallery-section__tabs-link_active")
    );
    tabPanes.forEach((pane) => pane.classList.remove("viewer__pane_active"));

    // Добавляем активный класс кликнутому табу
    const clickedTab = e.target;
    clickedTab.classList.add("photogallery-section__tabs-link_active");

    // Показываем соответствующий контент
    const tabId = clickedTab.getAttribute("data-tab");
    document.getElementById(tabId).classList.add("viewer__pane_active");
  }

  // Добавляем обработчики событий для каждого таба
  tabLinks.forEach((tab) => {
    tab.addEventListener("click", switchTab);
  });
});

const openModal = document.querySelector(".intro-section__box-btn");
const closeModal = document.querySelector(".modal-close");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const noScroll = document.querySelector("html");

// --------- Галерея------------
// По клику открываем картинку на модальном окне
document
  .querySelectorAll(".viewer__box .viewer__box-item img")
  .forEach((img) => {
    img.addEventListener("click", () => {
      document.querySelector(".gallery").style.display = "block";
      document.querySelector(".gallery .gallery__content-picture").src =
        img.getAttribute("src");
      overlay.classList.add("active");
      noScroll.classList.add("body-no-scroll");
    });
  });
// По клику закрываем поп ап галлереи
document.querySelector(".gallery__close").addEventListener("click", () => {
  document.querySelector(".gallery").style.display = "none";
  overlay.classList.remove("active");
  noScroll.classList.remove("body-no-scroll");
});
document.querySelector(".overlay").addEventListener("click", () => {
	overlay.classList.remove("active");
	noScroll.classList.remove("body-no-scroll");
  document.querySelector(".gallery").style.display = "none";
});
// Закрываем поп ап при нажатии на Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
	  overlay.classList.remove("active");
    document.querySelector(".gallery").style.display = "none";
    noScroll.classList.remove("body-no-scroll");
  }
});