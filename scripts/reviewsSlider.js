const slider2 = document.querySelector(".reviews__container");
console.log(slider2);
const prevButton2 = document.querySelector(".reviews__button-left");
const nextButton2 = document.querySelector(".reviews__button-right");
console.log(prevButton);

const slides2 = Array.from(slider2.querySelector(".reviews__card"));
console.log(slides);

const slideCount2 = slides2.length;
let slideIndex2 = 0;

prevButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

function showPreviousSlide() {
  slideIndex2 = (slideIndex2 - 1 + slideCount) % slideCount;
  updateSlider();
}

function showNextSlide() {
  slideIndex2 = (slideIndex2 + 1) % slideCount;
  updateSlider();
}

function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex2) {
      slide.style.display = "block";
    } else {
      slide.style.display = "none";
    }
  });
}

updateSlider();
