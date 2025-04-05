import {
  buttonClose,
  modal,
  overlay,
  openModalHandler,
  closeModalHandler,
  overlayCloseHandler,
  escapeCloseHandler,
} from "./modal.js";

const buttonBlogPage = document.querySelector(".intro-section__box-btn");
buttonBlogPage.addEventListener("click", openModalHandler);
buttonClose.addEventListener("click", closeModalHandler);
overlay.addEventListener("click", closeModalHandler);
modal.addEventListener("click", overlayCloseHandler);
document.addEventListener("keydown", escapeCloseHandler);
