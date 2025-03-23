const form = document.getElementById("contactForm");
const selectSingleInputs = document.querySelectorAll(".__select__input");
const selectSingleTitle = document.querySelector(".__select__title");
const errorMessage = document.getElementById("procedures-error");
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

const selectSingle = document.querySelector(".__select");
const selectSingle_title = selectSingle.querySelector(".__select__title");
const selectSingle_labels = selectSingle.querySelectorAll(".__select__label");

selectSingle_title.addEventListener("click", () => {
  if ("active" === selectSingle.getAttribute("data-state")) {
    selectSingle.setAttribute("data-state", "");
  } else {
    selectSingle.setAttribute("data-state", "active");
  }
});

for (let i = 0; i < selectSingle_labels.length; i++) {
  selectSingle_labels[i].addEventListener("click", (evt) => {
    selectSingle_title.textContent = evt.target.textContent;
    selectSingle.setAttribute("data-state", "");
  });
}

function areFieldsValid() {
  const formData = new FormData(form);
  const nameValue = formData.get("name");
  const phoneValue = formData.get("phone");
  const selectedOption = Array.from(selectSingleInputs).find(
    (input) => input.checked
  );
  return nameValue && phoneValue && selectedOption;
}

function areFieldsValid() {
  const formData = new FormData(form);
  const nameValue = formData.get("name");
  const phoneValue = formData.get("phone");
  const selectedOption = Array.from(selectSingleInputs).find(
    (input) => input.checked
  );

  const isNameValid = nameValue && nameValue.length >= 2;
  const isPhoneValid = phoneValue && phoneValue.length === 11;
  const isSelectedOptionValid = selectedOption !== undefined;

  return isNameValid && isPhoneValid && isSelectedOptionValid;
}

form.addEventListener("input", function () {
  
  if (areFieldsValid()) {
    errorMessage.style.display = "none";
    submitButton.disabled = false;
    submitButton.classList.remove("registration__formRegisterButton_disabled");
    submitButton.classList.add("registration__formRegisterButton_valid");
  } else {
    errorMessage.style.display = "block"; // Показываем сообщение об ошибке
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

  const selectedOption = Array.from(selectSingleInputs).find(
    (input) => input.checked
  );

  if (!selectedOption) {
    console.error("Не выбрана процедура!");

    errorMessage.style.display = "block";

    return;
  } else {
    errorMessage.style.display = "none";
  }

  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    procedures: selectedOption.value,
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

  fetch("http:localhost/backend/submit-form", {
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
        selectSingleTitle.textContent = "Выберите процедуру";
      }, 1000);

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
      submitButton.textContent = "Оставить заявку";
      submitButton.disabled = true;
      setTimeout(() => {
        isSending = false;
        submitButton.disabled = true;
      }, 60000);
    });
});
