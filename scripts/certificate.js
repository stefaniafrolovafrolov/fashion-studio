document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".certificate-image__box-item");
  const leftButton = document.querySelector(".certificate-image__buttons-prev");
  const rightButton = document.querySelector(
    ".certificate-image__buttons-next"
  );
  let currentIndex = 0;
  let displayCount = 3;
  const mobileSize = 560;
  const tabletSize = 700;
  function updateSlider() {
    images.forEach((img) => {
      img.style.display = "none";
    });

    for (let i = 0; i < displayCount; i++) {
      const index = currentIndex + i;
      images[index].style.display = "block";
    }
  }

  function updateDisplayCount() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= mobileSize) {
      displayCount = 1;
      console.log("1");
    } else if (screenWidth <= tabletSize) {
      displayCount = 1;
      console.log("2");
    } else {
      displayCount = 3;
      console.log("3");
    }
    updateSlider();
  }

  leftButton.addEventListener("click", () => {
    currentIndex = (currentIndex + images.length - 3) % (images.length - 2);
    updateSlider();
  });

  rightButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % (images.length - 2);
    updateSlider();
  });

  updateDisplayCount();
  window.addEventListener("resize", updateDisplayCount);
});
