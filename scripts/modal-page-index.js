import {
  buttonClose,
  modal,
  overlay,
  openModalHandler,
  closeModalHandler,
  overlayCloseHandler,
  escapeCloseHandler,
} from "./modal.js";

const buttonCircle = document.querySelector(".header__button-circle");
const buttonsServices = document.querySelectorAll(".services__btn");
const buttonCard = document.querySelector(".proposal__btn");
const buttonCardMaster = document.querySelectorAll(".item__btn");

buttonCircle.addEventListener("click", openModalHandler);
buttonCard.addEventListener("click", openModalHandler);
buttonClose.addEventListener("click", closeModalHandler);
overlay.addEventListener("click", closeModalHandler);
modal.addEventListener("click", overlayCloseHandler);
document.addEventListener("keydown", escapeCloseHandler);

buttonsServices.forEach((button) => {
  button.addEventListener("click", openModalHandler);
});

buttonCardMaster.forEach((button) => {
  button.addEventListener("click", openModalHandler);
});
