const formModalPopup = document.forms.contactFormPopup;

if (formModalPopup) {
  formModalPopup;
} else {
  console.log("модалка не найдена");
}

const buttonSubmitModalForm = formModalPopup.querySelector(
  ".modal__form-button"
);

if (buttonSubmitModalForm) {
  buttonSubmitModalForm;
} else {
  console.log("кнопка для модалки не найдена");
}

export { formModalPopup, buttonSubmitModalForm };
