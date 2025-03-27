const formContactRegProcedures = document.forms.contactForm;

if(formContactRegProcedures) {
  console.log(formContactRegProcedures)
} else {
  console.log("нет формы такой")
}

const formComments = document.forms.formReviews;
const buttonSubmitContactForm = formContactRegProcedures.querySelector(
  ".registration__formRegisterButton"
);
const buttonSubmitComments = formComments.querySelector(".reviews__formButtonRew")
console.log(formContactRegProcedures)
export { formContactRegProcedures, formComments, buttonSubmitContactForm, buttonSubmitComments };
