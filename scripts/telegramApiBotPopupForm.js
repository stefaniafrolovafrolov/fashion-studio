const formPopup = document.getElementById("contactFormPopup");
const submitButtonFormPopup = document.getElementById("submitButtonFormPopup");

const serverErrorMessageFormPopup = document.getElementById(
  "server-error-message-formPopup"
);

/*const messageValidationFormPtocedures = document.querySelector(
  ".procedures__message-validation"
);*/

let isSendingFormPopup = false;
let countdownValueFormPopup = 60;
const timerMessageFormPopup = document.getElementById("timerMessage-formPopup");
const countdownDisplayFormPopup = document.getElementById(
  "countdown-formPopup"
);

submitButtonFormPopup.classList.add(
  "registration__formRegisterButton-formPopup_disabled"
);
submitButtonFormPopup.disabled = true;

function areFieldsValidPopupForm() {
  const formData = new FormData(formPopup);
  const nameValueFormPopup = formData.get("name");
  const phoneValueFormPopup = formData.get("phone");
  return nameValueFormPopup && phoneValueFormPopup;
}

function areFieldsValidPopupForm() {
  const formData = new FormData(formPopup);
  const nameValueFormPopup = formData.get("name");
  const phoneValueFormPopup = formData.get("phone");

  const isNameValidFormPopup =
    nameValueFormPopup && nameValueFormPopup.length >= 2;
  const isPhoneValidFormPopup =
    phoneValueFormPopup && phoneValueFormPopup.length === 11;

  return isNameValidFormPopup && isPhoneValidFormPopup;
}

formPopup.addEventListener("input", function () {
  if (areFieldsValidPopupForm()) {
    submitButtonFormPopup.disabled = false;
    submitButtonFormPopup.classList.remove(
      "registration__formRegisterButton-formPopup_disabled"
    );
    submitButtonFormPopup.classList.add(
      "registration__formRegisterButton-formPopup_valid"
    );
  } else {
    submitButtonFormPopup.disabled = true;
    submitButtonFormPopup.classList.add(
      "registration__formRegisterButton-formPopup_disabled"
    );
    submitButtonFormPopup.classList.remove(
      "registration__formRegisterButton-formPopup_valid"
    );
  }
});

formPopup.addEventListener("submit", function (e) {
  e.preventDefault();

  if (isSendingFormPopup) {
    alert("Пожалуйста, подождите 1 минуту перед повторной отправкой.");
    return;
  }

  timerMessageFormPopup.style.display = "block";
  countdownValueFormPopup = 60;
  countdownDisplayFormPopup.textContent = countdownValueFormPopup;

  const countdownInterval = setInterval(() => {
    countdownValueFormPopup--;
    countdownDisplayFormPopup.textContent = countdownValueFormPopup;
    if (countdownValueFormPopup <= 0) {
      clearInterval(countdownInterval);
      timerMessageFormPopup.style.display = "none";
      isSendingFormPopup = false;
    }
  }, 1000);

  isSendingFormPopup = true;
  const formData = new FormData(formPopup);

  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
  };

  /*if (!areFieldsValid()) {
    console.error("Заполните все поля!");
    messageValidationFormPtocedures.style.display = "block";
    return;
  }*/

  submitButtonFormPopup.disabled = true;
  submitButtonFormPopup.textContent = "Отправка...";
  submitButtonFormPopup.classList.add(
    "registration__formRegisterButton-formPopup_disabled"
  );
  serverErrorMessage.style.display = "none";

  fetch("http://localhost:3000/backend/submit-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const successMessageFormPopup = document.querySelector(
        ".success-message-formPopup"
      );
      successMessageFormPopup.style.display = "block";
      formPopup.reset();

      setTimeout(() => {
        successMessageFormPopup.style.display = "none";
      }, 6000);
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      serverErrorMessageFormPopup.style.display = "block";
      serverErrorMessageFormPopup.textContent =
        "Ошибка сервера. Пожалуйста, попробуйте позже.";
    })
    .finally(() => {
      submitButtonFormPopup.classList.add(
        "registration__formRegisterButton-formPopup_disabled"
      );
      submitButtonFormPopup.classList.remove(
        "registration__formRegisterButton-formPopup_valid"
      );
      submitButtonFormPopup.textContent = "Записаться";
      submitButtonFormPopup.disabled = true;
      setTimeout(() => {
        isSending = false;
        submitButtonFormPopup.disabled = true;
        formPopup.reset();
        submitButtonFormPopup.classList.add(
          "registration__formRegisterButton-formPopup_disabled"
        );
      }, 60000);
    });
});
