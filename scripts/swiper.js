const swiper = new Swiper(".awards-slider", {
  slidesPerView: 3,
  spaceBetween: 135,
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    1420: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

const swiperSert = new Swiper(".certificates__slider", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  centeredSlides: true,
  navigation: {
    nextEl: ".certificates__button--next",
    prevEl: ".certificates__button--prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

function initSlider(
  containerSelector,
  itemSelector,
  prevBtnSelector,
  nextBtnSelector,
  activeClass
) {
  const container = document.querySelector(containerSelector);
  const slides = container.querySelectorAll(itemSelector);
  const arrowLeft = document.querySelector(prevBtnSelector);
  const arrowRight = document.querySelector(nextBtnSelector);
  const countSlide = slides.length;
  let current = 0;

  function showSlide(index) {
    slides.forEach((s) => s.classList.remove(activeClass));
    slides[index].classList.add(activeClass);

    arrowLeft.disabled = current === 0;
    arrowRight.disabled = current === countSlide - 1;
  }

  arrowLeft.addEventListener("click", () => {
    if (current > 0) {
      current--;
      showSlide(current);
    }
  });

  arrowRight.addEventListener("click", () => {
    if (current < countSlide - 1) {
      current++;
      showSlide(current);
    }
  });

  showSlide(current);
}

initSlider(
  ".services",
  ".services__item",
  ".services-arrow-prev",
  ".services-arrow-next",
  "service-card-show"
);

initSlider(
  ".masters",
  ".item",
  ".masters-arrow-prev",
  ".masters-arrow-next",
  "service-card-show"
);

const stars = document.querySelectorAll(".rating .star");

stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    stars.forEach((s) => s.classList.remove("active"));

    for (let i = 0; i <= index; i++) {
      stars[i].classList.add("active");
    }

    alert(index + 1);
  });
});
