window.onload = function() {
  localStorage.menu = false;
  let topArrow;
  let buttonsArrow = document.querySelectorAll(".slick-arrow");

  function defineHeights(element) {
    let top = element.getBoundingClientRect().top;
    let bottom = element.getBoundingClientRect().bottom;
    height = bottom - top;
    console.log(height);
    return height;
  }

  for (arrow of buttonsArrow) {
    topArrow = getComputedStyle(arrow).top;
    console.log(topArrow);
  }

  let heightContentTextSliderWithoutPx = defineHeights(
    document.querySelector(".slider-item__content-text")
  );
  console.log(heightContentTextSliderWithoutPx);
  let topArrowMinusHeightContentTextSlider =
    Number(topArrow.slice(0, -2)) -
    Number(heightContentTextSliderWithoutPx) +
    "px";
  console.log(topArrowMinusHeightContentTextSlider);

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

    console.log(buttonsArrow);

    for (arrow of buttonsArrow) {
      arrow.addEventListener("click", () => {
        checkSliderArrows();
      });
    }

    block.addEventListener("mouseup", checkSliderArrows);
    block.addEventListener("touchend", checkSliderArrows);

    // btnNext.addEventListener("click", () => {
    //   let arr = Array.from(sliderItems);
    //   let index = arr.findIndex(hasClassActive);

    //   if (index != arr.length - 1) {
    //     arr[index].classList.remove("slider__item-active");
    //     arr[index + 1].classList.add("slider__item-active");
    //     currentSlide.textContent++;
    //   }
    //   checkSliderArrows();
    // });

    // btnPrev.addEventListener("click", () => {
    //   let arr = Array.from(sliderItems);
    //   let index = arr.findIndex(hasClassActive);

    //   if (index != 0) {
    //     arr[index].classList.remove("slider__item-active");
    //     arr[index - 1].classList.add("slider__item-active");
    //     currentSlide.textContent=index
    //   }
    //   checkSliderArrows();
    // });
  }

  // function addWhiteHeaderTop (element){
  //   if (!element.classList.contains("header-top__white")){
  //     element.classList.add("header-top__white")
  //   }
  // }

  // function removeWhiteHeaderTop (element){
  //   if (element.classList.contains("header-top__white")){
  //     element.classList.remove("header-top__white")
  //   }
  // }

  let headerTop = document.querySelector(".header-top");
  let headerMain = document.querySelector(".header-main");
  let buttonMenu = document.querySelector(".header-list__btn-menu");
  let headerMenu = document.querySelector(".header-menu");
  let headerPhone = document.querySelector(".header-list__phone");
  let headerSocial = document.querySelector(".header-list__social");

  buttonMenu.addEventListener("click", unhideMenu);

  function unhideMenu() {
    headerTop.classList.add("header-top__white");
    headerMain.classList.toggle("header-main__menu-white");
    headerMenu.classList.toggle("header-menu__unhide");
    headerPhone.classList.toggle("header-list__phone-menu");
    headerSocial.classList.toggle("header-list__social-menu");
    buttonMenu.classList.toggle("header-list__btn-menu-open");

    if (headerMain.classList.contains("header-main__menu-white")) {
      window.scrollTo(pageXOffset, 0);
      document.body.style.overflow = "hidden";
      localStorage.menu = true;
    } else {
      document.body.style.overflow = "";
      localStorage.menu = false;
      headerTop.classList.remove("header-top__white");
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
        headerTop.classList.add("header-top__white");
      } else {
        headerTop.classList.remove("header-top__white");
      }
    }
  });

  //   document.body.style.overflow = 'hidden'

  //  document.body.style.overflow = ''

  hideShowTextBlockProfiles();
  slider(document.querySelector(".main-profiles"));
};
