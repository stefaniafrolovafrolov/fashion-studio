const formContactRegProcedures = document.forms.contactForm;

if (formContactRegProcedures) {
  formContactRegProcedures;
} else {
  console.log("форма не найдена");
}

const formComments = document.forms.formReviews;

if (formComments) {
  formComments;
} else {
  console.log("форма не найдена");
}
const buttonSubmitContactForm = formContactRegProcedures.querySelector(
  ".registration__formRegisterButton"
);
const buttonSubmitComments = formComments.querySelector(
  ".reviews__formButtonRew"
);

export {
  formContactRegProcedures,
  formComments,
  buttonSubmitContactForm,
  buttonSubmitComments,
};
