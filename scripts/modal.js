function createModal({
  openButtonSelector,
  closeButtonSelector,
  modalSelector,
  overlaySelector,
  noScrollSelector,
}) {
  const openModal = document.querySelector(openButtonSelector);
  const closeModal = document.querySelector(closeButtonSelector);
  const modal = document.querySelector(modalSelector);
  const overlay = document.querySelector(overlaySelector);
  const noScroll = document.querySelector(noScrollSelector);

  if (!openModal || !closeModal || !modal || !overlay || !noScroll) {
    console.error("Не все элементы найдены для модального окна");
    return;
  }

  // Открытие модального окна
  const openModalHandler = (e) => {
    e.preventDefault();
    modal.classList.add("active");
    overlay.classList.add("active");
    noScroll.classList.add("body-no-scroll");
  };

  // Закрытие модального окна
  const closeModalHandler = () => {
    modal.classList.remove("active");
    overlay.classList.remove("active");
    noScroll.classList.remove("body-no-scroll");
  };

  // Закрытие при клике вне окна
  const overlayCloseHandler = (event) => {
    if (event.target === modal) {
      closeModalHandler();
    }
  };

  // Закрытие при нажатии на Escape
  const escapeCloseHandler = (e) => {
    if (e.key === "Escape") {
      closeModalHandler();
    }
  };

  // Добавляем обработчики событий
  openModal.addEventListener("click", openModalHandler);
  closeModal.addEventListener("click", closeModalHandler);
  overlay.addEventListener("click", closeModalHandler);
  modal.addEventListener("click", overlayCloseHandler);
  document.addEventListener("keydown", escapeCloseHandler);

  return {
    open: openModalHandler,
    close: closeModalHandler,
  };
}
