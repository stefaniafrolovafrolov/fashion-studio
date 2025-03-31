const formComments = document.forms.formReviews;

if (formComments) {
  formComments;
} else {
  console.log("форма коментариев не найдена");
}

const buttonSubmitComments = formComments.querySelector(
  ".reviews__formButtonRew"
);

if (buttonSubmitComments) {
  buttonSubmitComments;
} else {
  console.log("кнопка для отправки коментариев не найдена");
}

export { formComments, buttonSubmitComments };
