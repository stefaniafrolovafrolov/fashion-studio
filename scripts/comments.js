const baseURL4API = "http://localhost:3000/backend";
const commentsRateImages = [
  "/images/stars/starun.svg",
  "/images/stars/star00.svg",
  "/images/stars/star05.svg",
  "/images/stars/star10.svg",
  "/images/stars/star15.svg",
  "/images/stars/star20.svg",
  "/images/stars/star25.svg",
  "/images/stars/star30.svg",
  "/images/stars/star35.svg",
  "/images/stars/star40.svg",
  "/images/stars/star45.svg",
  "/images/stars/star50.svg",
];
/*const commentsRateLoads = [
  "/images/loads/un.png",
  "/images/loads/00.png",
  "/images/loads/05.png",
  "/images/loads/10.png",
  "/images/loads/15.png",
  "/images/loads/20.png",
  "/images/loads/25.png",
  "/images/loads/30.png",
  "/images/loads/35.png",
  "/images/loads/40.png",
  "/images/loads/45.png",
  "/images/loads/50.png",
];
const commentsRateClocks = [
  "/images/clock/un.png",
  "/images/clock/00.png",
  "/images/clock/05.png",
  "/images/clock/10.png",
  "/images/clock/15.png",
  "/images/clock/20.png",
  "/images/clock/25.png",
  "/images/clock/30.png",
  "/images/clock/35.png",
  "/images/clock/40.png",
  "/images/clock/45.png",
  "/images/clock/50.png",
];*/
function computeIndex(tempval) {
  return (
    Math.floor(
      (commentsRateImages.length - 1) *
        (tempval < 0.0 ? 0 : tempval >= 0.99 ? 0.99 : tempval)
    ) + 1
  );
}
function getRatingHrefForPages(index, from = commentsRateImages) {
  return from[index];
}
function getRatingHref(index) {
  return commentsRateImages[index];
}
function setRating(index) {
  const rating = document.querySelector(".comments-form-rating");
  rating.style.backgroundImage = `url(${getRatingHref(index)})`;
}
function resetRate() {
  const form = document.querySelector(".reviews__form");
  if (form) {
    const note = document.querySelector(".comments-form-rating");
    if (note) {
      form.rate.value = 0;
      setRating(0);
    }
  }
}
function getPagesSpan(cls, val) {
  return `<SPAN class="${cls}">${val}</SPAN>`;
}
function getPagesHref(cls, val, act = "") {
  return `<A class="${cls}" href="${act}${val}" onclick="event.preventDefault(); reloadCommentFunction.exec(${val});">${val}</A>`;
}
function getPages(num = 1, sel = 1, arg = "page", cls = "page-console-button") {
  const url = new URL(window.location.href);
  if (url.searchParams.has(arg)) url.searchParams.delete(arg);
  url.searchParams.set(arg, "");
  const fnc = url.href;
  const int = Number(sel);
  const pages =
    (int === 1
      ? getPagesSpan(`${cls} ${cls}-first`, "1")
      : getPagesHref(cls, "1", fnc)) +
    (int > 4
      ? getPagesSpan(`${cls} ${cls}-wrap ${cls}-wrap-first`, "...")
      : "") +
    (int > 3 ? getPagesHref(`${cls} ${cls}-prev-prev`, int - 2, fnc) : "") +
    (int > 2 ? getPagesHref(`${cls} ${cls}-prev`, int - 1, fnc) : "") +
    (int > 1 && int < num ? getPagesSpan(`${cls} ${cls}-current`, int) : "") +
    (int < num - 1 ? getPagesHref(`${cls} ${cls}-next`, int + 1, fnc) : "") +
    (int < num - 2
      ? getPagesHref(`${cls} ${cls}-next-next`, int + 2, fnc)
      : "") +
    (int < num - 3
      ? getPagesSpan(`${cls} ${cls}-wrap ${cls}-wrap-last`, "...")
      : "") +
    (int === num && num > 1
      ? getPagesSpan(`${cls} ${cls}-last`, num)
      : num > 1
      ? getPagesHref(`${cls} ${cls}-last`, num, fnc)
      : "");
  return `<DIV class="container-${cls}">${pages}</DIV>`;
}
function fetchBackend(api = "getMe", body = {}, useGet = true) {
  const fetchAPI = async function () {
    if (useGet) {
      return await fetch(baseURL4API + "/" + api, {
        method: "GET",
      });
    } else {
      return await fetch(baseURL4API + "/" + api, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    }
  };
  return fetchAPI()
    .then(async (res) => {
      if (res.ok) return await res.json();
      const body = document.querySelector(".root");
      body.innerHTML = `<H1>HTTP ${res.status || "500"}: ${
        res.message
      }</H1><BR><SPAN>Ошибка на сервере</SPAN>`;
      return Promise.reject(`Server error: ${res.message}`);
    })
    .catch((res) => {
      const body = document.querySelector(".root");
      body.innerHTML = `<H1>HTTP ${res.status || "500"}: ${
        res.message
      }</H1><BR><SPAN>Ошибка запроса</SPAN>`;
      return Promise.reject(`Request error: ${res.message}`);
    });
}
function queryTotalRating() {
  const saved = JSON.parse(localStorage.getItem("comments"));
  const check = [];
  saved.forEach((comment) => check.push(comment.id));
  const rate = fetchBackend("total", { check: check }, false);
  rate.then((answer) => {
    const container = document.querySelector(".comments-total-rating");
    const image = document.querySelector(".comments-total-image");
    const fixed = (answer.total / 2).toFixed(1);
    if (answer.total == -1) {
      container.innerHTML = `Увы, но у мастера пока нет ни одной оценки!`;
      image.src = commentsRateImages[Math.round(answer.total) + 1];
      image.alt = `нет рейтинга`;
      image.title = `0 / 5`;
    } else {
      container.innerHTML = `По вашим отзывам рейтинг мастера ${fixed}`;
      image.src = commentsRateImages[Math.round(answer.total) + 1];
      image.alt = `${fixed}`;
      image.title = `${fixed} / 5`;
    }
  });
}
function makeComment(comment, admin = false) {
  const commentDate = new Date(comment.date);
  const localDate = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
    timeStyle: "short", // long, full, итд
  }).format(commentDate);
  const commentHtml = `


 <div class="content">
            <div class="content__titel">
              <img class="photo" src="./images/zaglushka.png" alt="аватарка профиля" />
              <span class="reviews__name">
                        ${comment.name} 
                      </span>
              <p class="reviews__date">${localDate}</p>
             
              <div class="star">
                  <span class="reviews__stars-desktop">
                      <img src="${getRatingHrefForPages(comment.rate)}" 
                             alt="звездочки" 
                             title="${
                               comment.rate == 0
                                 ? "не поставили"
                                 : (comment.rate - 1) / 2
                             }" />
                  </span>
                      <span class="reviews__stars reviews__stars${
                        comment.rate
                      }">${
    comment.rate == 0 ? `0.0` : ((Number(comment.rate) - 1) / 2).toFixed(1)
  }</span>
              </div>
            </div>
            <div class="content__descr">
              <pre class="reviews__comment">${comment.text}</pre>
            </div>
          </div>`;

  return `<div class="comments-container-item">${commentHtml}${
    admin
      ? `<br>${
          comment.local
            ? `<a class="comments-manage-buttons comments-manage-button-visible"
                      onclick="moveCommentToVisible(${comment.id})" 
                      >Одобрено</a>
                      <code></code>
                      <a class="comments-manage-buttons comments-manage-button-delete"
                      onclick="moveCommentToTrash(${comment.id})">Удалить</a>`
            : `<a class="comments-manage-buttons comments-manage-button-delete"
                      onclick="removeCommentToTrash(${comment.id})">Удалить</a>`
        }`
      : ``
  }</div>`;
}

function reloadComments(page) {
  const comments = document.querySelector(".container-comments-area");
  const arr = JSON.parse(localStorage.getItem("comments"));
  const validate = [];
  arr.forEach((item) => validate.push(item.id));
  const items = fetchBackend(
    "list?page=" + page,
    { validate: validate },
    false
  );
  items.then((item) => {
    // !!! Потенциальыне ошибки !!! нет проверки на наличие всех
    if (item.comments.length === 0 && item.selected != 1)
      return reloadCommentFunction.exec(1);
    const url = new URL(window.location.href);
    url.searchParams.set("page", item.selected);
    window.history.replaceState(null, "", url.href);
    const pages = getPages(item.pages, item.selected);
    const localArr = JSON.parse(localStorage.getItem("comments")).filter(
      (value) => !item.invalid.includes(value.id)
    );
    localStorage.setItem("comments", JSON.stringify(localArr));
    const list = [];
    item.comments.forEach((comment) => {
      if (comment.local) {
        const loc = localArr.filter((item) => item.id === comment.id);
        if (loc.length > 0) {
          list.push(makeComment(loc[0], false));
        } else {
          list.push(`<DIV class="comments-container-item">
  Ошибка: комментарий не доступен до прохождения модерации
</DIV>`);
        }
      } else {
        list.push(makeComment(comment, false));
      }
    });
    comments.innerHTML = `${pages}<DIV class="reviews__item">${list.join(
      ""
    )}</DIV>${pages}`;
    queryTotalRating();
  });
}
const reloadCommentFunction = {
  exec: reloadComments,
};
function getPageData() {
  const url = new URL(window.location.href);
  commentsRateImages.forEach(
    (item, index) => (commentsRateImages[index] = url.origin + item)
  );

  resetRate();
  if (!localStorage.getItem("comments")) {
    localStorage.setItem("comments", JSON.stringify([]));
  }
  const commentsForm = document.querySelector(".reviews__form");
  if (commentsForm) {
    const commentsFormRating = document.querySelector(".comments-form-rating");
    if (commentsFormRating) {
      commentsFormRating.addEventListener("click", (event) => {
        event.preventDefault();
        const rect = commentsFormRating.getBoundingClientRect();
        commentsForm.rate.value = computeIndex(
          (event.clientX - rect.left) / event.target.offsetWidth
        );
      });
      commentsFormRating.addEventListener("mouseout", (event) => {
        event.preventDefault();

        url.href = window.location.href;
        const index = Number(commentsForm.rate.value);
        if (Number(commentsForm.rate.value) === 0) {
          resetRate();
        } else {
          setRating(index);
        }
      });
      commentsFormRating.addEventListener("mousemove", (event) => {
        event.preventDefault();

        url.href = window.location.href;
        const rect = commentsFormRating.getBoundingClientRect();
        commentsFormRating.innerHTML = "";
        setRating(
          computeIndex((event.clientX - rect.left) / event.target.offsetWidth)
        );
      });
    }
  }

  url.href = window.location.href;
  reloadCommentFunction.exec(url.searchParams.get("page") || 1);
}
function truncateName(name = "") {
  const words = name.split(" ");
  console.log(words, words[0].substring(0, 1).toLocaleUpperCase());
  switch (words.length) {
    case 1:
      return name;
    case 2:
      return `${words[0]} ${words[1].substring(0, 1).toLocaleUpperCase()}.`;
    default:
      return `${words[0]} ${words[1]
        .substring(0, 1)
        .toLocaleUpperCase()}. ${words[2]
        .substring(0, 1)
        .toLocaleUpperCase()}.`;
  }
}

function submitComment() {
  const form = document.getElementById("formReviews");
  console.log(form);
  const thanks = document.querySelector(".comments-form-warning");

  const errorMessage = document.getElementById("server-error-message");

  const show = document.querySelector(".comments-form-timeout");
  const submitButton = form.send;

  submitButton.disabled = true;
  submitButton.classList.remove("reviews__formButtonRew_valid");
  submitButton.classList.add("reviews__formButtonRew_disabled");

  thanks.style.display = "block";

  errorMessage.textContent = "";

  const counter = [60];

  let isTimerActive = false;
  show.innerHTML = `${counter[0]}`;

  const toProc = () => {
    const rating = document.querySelector(".comments-form-rating");
    counter[0] -= 1;
    if (counter[0] == 0) {
      submitButton.disabled = true;
      submitButton.classList.remove("reviews__formButtonRew_valid");

      submitButton.classList.add("reviews__formButtonRew_disabled");
      thanks.style.display = "none";

      isTimerActive = false;
      form.reset();

      rating.style.backgroundImage = "url('../images/stars/starun.svg')";

      console.log(form.rate.value + "тут поле рейтинга");
    } else {
      show.innerHTML = `${counter[0]}`;
      setTimeout(toProc, 1000);
    }
  };

  isTimerActive = true;
  setTimeout(toProc, 1000);

  const nameText = truncateName(form.name.value);
  const commentText = form.text.value.trim();

  const checkFormValidity = () => {
    const nameText = truncateName(form.name.value.trim());
    const commentText = form.text.value.trim();
    const rateValue = form.rate.value;

    if (
      nameText &&
      commentText.length >= 2 &&
      commentText.length < 1000 &&
      rateValue
    ) {
      submitButton.disabled = false;
      submitButton.classList.remove("reviews__formButtonRew_disabled");
      submitButton.classList.add("reviews__formButtonRew_valid");
    } else {
      submitButton.disabled = true;
      submitButton.classList.remove("reviews__formButtonRew_valid");
      submitButton.classList.add("reviews__formButtonRew_disabled");
    }
  };

  form.addEventListener("input", () => {
    if (isTimerActive) {
      submitButton.disabled = true;
      submitButton.classList.remove("reviews__formButtonRew_valid");
      submitButton.classList.add("reviews__formButtonRew_disabled");
    } else {
      submitButton.disabled = false;
      submitButton.classList.remove("reviews__formButtonRew_disabled");
      submitButton.classList.add("reviews__formButtonRew_valid");

      checkFormValidity();
    }
  });

  const prepare = {
    name: nameText,
    phone: form.phone.value,
    rate: form.rate.value,
    text: commentText,
  };

  const data = fetchBackend("add", prepare, false);

  form.reset();
  resetRate();

  data
    .then((item) => {
      prepare.id = item.id;
      prepare.date = item.date;

      const arr = JSON.parse(localStorage.getItem("comments")) || [];
      arr.push(prepare);
      localStorage.setItem("comments", JSON.stringify(arr));
      const url = new URL(window.location.href);
      reloadCommentFunction.exec(url.searchParams.get("page") || 1);
    })
    .catch((error) => {
      console.error("Ошибка при отправке комментария:", error);
      errorMessage.textContent =
        "Ошибка на сервере! Пожалуйста, попробуйте еще раз.";
      errorMessage.style.display = "block";
      thanks.style.display = "none";
      submitButton.disabled = true;
      submitButton.classList.add("reviews__formButtonRew_disabled");
      submitButton.classList.remove("reviews__formButtonRew_valid");
    });
}
