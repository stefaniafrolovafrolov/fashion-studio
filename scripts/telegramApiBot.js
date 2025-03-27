const form = document.getElementById("contactForm");
const submitButton = document.getElementById("submitButton");
const serverErrorMessage = document.getElementById("server-error-message");

const messageValidationFormPtocedures = document.querySelector(
  ".procedures__message-validation"
);

let isSending = false;
let countdownValue = 60;
const timerMessage = document.getElementById("timerMessage");
const countdownDisplay = document.getElementById("countdown");

submitButton.classList.add("registration__formRegisterButton_disabled");
submitButton.disabled = true;

function areFieldsValid() {
  const formData = new FormData(form);
  const nameValue = formData.get("name");
  const phoneValue = formData.get("phone");
  return nameValue && phoneValue;
}

function areFieldsValid() {
  const formData = new FormData(form);
  const nameValue = formData.get("name");
  const phoneValue = formData.get("phone");

  const isNameValid = nameValue && nameValue.length >= 2;
  const isPhoneValid = phoneValue && phoneValue.length === 11;

  return isNameValid && isPhoneValid;
}

form.addEventListener("input", function () {
  if (areFieldsValid()) {
    submitButton.disabled = false;
    submitButton.classList.remove("registration__formRegisterButton_disabled");
    submitButton.classList.add("registration__formRegisterButton_valid");
  } else {
    submitButton.disabled = true;
    submitButton.classList.add("registration__formRegisterButton_disabled");
    submitButton.classList.remove("registration__formRegisterButton_valid");
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (isSending) {
    alert("Пожалуйста, подождите 1 минуту перед повторной отправкой.");
    return;
  }

  timerMessage.style.display = "block";
  countdownValue = 60;
  countdownDisplay.textContent = countdownValue;

  const countdownInterval = setInterval(() => {
    countdownValue--;
    countdownDisplay.textContent = countdownValue;
    if (countdownValue <= 0) {
      clearInterval(countdownInterval);
      timerMessage.style.display = "none";
      isSending = false;
    }
  }, 1000);

  isSending = true;
  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
  };

  if (!areFieldsValid()) {
    console.error("Заполните все поля!");
    messageValidationFormPtocedures.style.display = "block";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Отправка...";
  submitButton.classList.add("registration__formRegisterButton_disabled");
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
      const successMessage = document.querySelector(".success-message");
      successMessage.style.display = "block";
      form.reset();

      setTimeout(() => {
        successMessage.style.display = "none";
      }, 6000);
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      serverErrorMessage.style.display = "block";
      serverErrorMessage.textContent =
        "Ошибка сервера. Пожалуйста, попробуйте позже.";
    })
    .finally(() => {
      submitButton.classList.add("registration__formRegisterButton_disabled");
      submitButton.classList.remove("registration__formRegisterButton_valid");
      submitButton.textContent = "Отправить";
      submitButton.disabled = true;
      setTimeout(() => {
        isSending = false;
        submitButton.disabled = true;
        form.reset();
        submitButton.classList.add("registration__formRegisterButton_disabled");
      }, 60000);
    });
});
