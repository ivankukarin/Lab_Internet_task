window.onload = function() {
  localStorage.menu = false;
  let topArrow;
  let buttonsArrow = document.querySelectorAll(".slick-arrow");

  function defineHeights(element) {
    let top = element.getBoundingClientRect().top;
    let bottom = element.getBoundingClientRect().bottom;
    height = bottom - top;
    return height;
  }

  for (arrow of buttonsArrow) {
    topArrow = getComputedStyle(arrow).top;
  }

  let heightContentTextSliderWithoutPx = defineHeights(
    document.querySelector(".slider-item__content-text")
  );

  let topArrowMinusHeightContentTextSlider =
    Number(topArrow.slice(0, -2)) -
    Number(heightContentTextSliderWithoutPx) +
    "px";

  function hideShowTextBlockProfiles() {
    let arrBtnHideSlideContent = document.querySelectorAll(
      ".slider-item__btn-hide"
    );
    let arrElementsContentText = document.querySelectorAll(
      ".slider-item__content-text"
    );
    let arrBtnTextHideSlideContent = document.querySelectorAll(
      ".slider-item__btn-hide-text"
    );

    function toggleHideBlock(arrElements, checkClassName) {
      for (element of arrElements) {
        element.classList.toggle(checkClassName);

        if (element.classList.contains(checkClassName)) {
          for (textOfButton of arrBtnTextHideSlideContent) {
            textOfButton.textContent = "развернуть";
          }
          for (arrow of buttonsArrow) {
            arrow.style.top = topArrowMinusHeightContentTextSlider;
          }
        } else {
          for (textOfButton of arrBtnTextHideSlideContent) {
            textOfButton.textContent = "скрыть";
          }
          for (arrow of buttonsArrow) {
            arrow.style.top = topArrow;
          }
        }
      }
    }

    for (button of arrBtnHideSlideContent) {
      button.addEventListener("click", () => {
        toggleHideBlock(
          arrElementsContentText,
          "slider-item__content-text-hide"
        );
      });
    }
  }

  function slider(block) {
    let sliderItems = block.querySelectorAll(".slick-slide");
    let btnPrev = block.querySelector(".slick-prev");
    let btnNext = block.querySelector(".slick-next");
    let numberOfCurrentSlide = block.querySelector(
      ".slider-numeration__current-slide"
    );
    let valueOfSlides = block.querySelector(
      ".slider-numeration__value-of-slides"
    );

    valueOfSlides.textContent = sliderItems.length;

    function hasClassActive(element) {
      return element.classList.contains("slick-active");
    }

    function checkSliderArrows() {
      let arr = Array.from(sliderItems);
      let index = arr.findIndex(hasClassActive);
      numberOfCurrentSlide.textContent = index + 1;

      if (index + 1 < arr.length) {
        if (!btnNext.classList.contains("slider__arrow-active"))
          btnNext.classList.add("slider__arrow-active");
      } else {
        btnNext.classList.remove("slider__arrow-active");
      }

      if (index != 0) {
        if (!btnPrev.classList.contains("slider__arrow-active"))
          btnPrev.classList.add("slider__arrow-active");
      } else {
        btnPrev.classList.remove("slider__arrow-active");
      }
    }

    // function setTopAtNumeration(element) {
    //   let numberOfCurrentSlide = document.querySelector(
    //     ".slider-numeration__current-slide"
    //   );
    //   element.style.top = getComputedStyle(numberOfCurrentSlide).top;
    // }

    for (arrow of buttonsArrow) {
      arrow.addEventListener("click", () => {
        checkSliderArrows();
      });
    }

    block.addEventListener("mouseup", checkSliderArrows);
    block.addEventListener("touchend", checkSliderArrows);
  }

  let headerTop = document.querySelector(".nav-wrapper");
  let headerMain = document.querySelector(".header-main");
  let buttonMenu = document.querySelector(".nav-bar__btn-menu");
  let headerMenu = document.querySelector(".header-menu");
  let headerPhone = document.querySelector(".nav-bar__phone");
  let headerSocial = document.querySelector(".nav-bar__social");

  buttonMenu.addEventListener("click", unhideMenu);

  function unhideMenu() {
    headerTop.classList.add("nav-wrapper__white");
    headerMain.classList.toggle("header-main__menu-white");
    headerMenu.classList.toggle("header-menu__unhide");
    headerPhone.classList.toggle("nav-bar__phone-menu");
    headerSocial.classList.toggle("nav-bar__social-menu");
    buttonMenu.classList.toggle("nav-bar__btn-menu-open");

    if (headerMain.classList.contains("header-main__menu-white")) {
      window.scrollTo(pageXOffset, 0);
      document.body.style.overflow = "hidden";
      localStorage.menu = true;
    } else {
      document.body.style.overflow = "";
      localStorage.menu = false;
      headerTop.classList.remove("nav-wrapper__white");
    }
  }

  window.addEventListener("scroll", () => {
    if (localStorage.menu === "false") {
      let header = document.querySelector(".header");
      let positionElementOnScreen = header.getBoundingClientRect().bottom;
      let headerTopHeight = getComputedStyle(headerTop).height;
      headerTopHeight = Number(headerTopHeight.slice(0, -2));

      if (header.getBoundingClientRect().width <= 320) {
        positionElementOnScreen = positionElementOnScreen - 320;
      }
      if (positionElementOnScreen <= headerTopHeight) {
        headerTop.classList.add("nav-wrapper__white");
      } else {
        headerTop.classList.remove("nav-wrapper__white");
      }
    }
  });

  hideShowTextBlockProfiles();
  slider(document.querySelector(".main-profiles"));
};
