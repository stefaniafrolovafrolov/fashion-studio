/*setInterval(() => {
  const h = document.querySelector(".header");
  const v = document.querySelector(".header__bgvideo");
  const a = 1920 / 1080;
  if (h.clientWidth > h.clientHeight) {
    v.style.width = `${h.clientWidth}px`;
    v.style.height = `${h.clientWidth * a}px`;
  } else {
    v.style.width = `${h.clientHeight * a}px`;
    v.style.height = `${h.clientHeight}px`;
  }
  console.log(v.style.width)
  console.log(v.style.height)
}, 1000);
*/

setInterval(() => {
  const h = document.querySelector(".header");
  const v = document.querySelector(".header__bgvideo");
  const a = 1920 / 1080;

  if (h.clientWidth > h.clientHeight) {
    v.style.width = `${Math.floor(h.clientWidth)}px`;
    v.style.height = `${Math.floor(h.clientWidth * a)}px`;
  } else {
    v.style.width = `${Math.floor(h.clientHeight * a)}px`;
    v.style.height = `${Math.floor(h.clientHeight)}px`;
  }

  console.log(v.style.width);
  console.log(v.style.height);
}, 1000);
