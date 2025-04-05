/*const buttonCircle = document.querySelector(".header__button-circle");
const buttonClose = document.querySelector(".modal-close");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const buttonsServices = document.querySelectorAll(".services__btn");
const buttonCard = document.querySelector(".proposal__btn");
const buttonCardMaster = document.querySelectorAll(".item__btn");
const noScroll = document.querySelector("html");

function openModalHandler(e) {
  e.preventDefault();
  console.log(buttonBlogPage);
  modal.classList.add("active");
  overlay.classList.add("active");
  noScroll.classList.add("body-no-scroll");
}

function closeModalHandler() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  noScroll.classList.remove("body-no-scroll");
}

function overlayCloseHandler(e) {
  if (e.target === modal) {
    closeModalHandler();
  }
}

function escapeCloseHandler(e) {
  if (e.key === "Escape") {
    closeModalHandler();
  }
}

buttonCircle.addEventListener("click", openModalHandler);
buttonCard.addEventListener("click", openModalHandler);
buttonBlogPage.addEventListener("click", openModalHandler);
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
*/

export const buttonClose = document.querySelector(".modal-close");
export const modal = document.querySelector(".modal");
export const overlay = document.querySelector(".overlay");
export const noScroll = document.querySelector("html");

export function openModalHandler(e) {
  e.preventDefault();
  modal.classList.add("active");
  overlay.classList.add("active");
  noScroll.classList.add("body-no-scroll");
}

export function closeModalHandler() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  noScroll.classList.remove("body-no-scroll");
}

export function overlayCloseHandler(e) {
  if (e.target === modal) {
    closeModalHandler();
  }
}

export function escapeCloseHandler(e) {
  if (e.key === "Escape") {
    closeModalHandler();
  }
}
