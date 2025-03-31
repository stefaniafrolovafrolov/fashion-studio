const formAppointmentRequest = document.forms.contactForm;

if (formAppointmentRequest) {
  formAppointmentRequest;
} else {
  console.log("форма отправка контактов не найдена");
}

const buttonSubmitContactForm = formAppointmentRequest.querySelector(
  ".registration__formRegisterButton"
);

if (buttonSubmitContactForm) {
  buttonSubmitContactForm;
} else {
  console.log("кнопка для отправки контактов не найдена");
}

export { formAppointmentRequest, buttonSubmitContactForm };
