window.onload = function() {
  function hideShow() {
    let arrBtnHideSlideContent = document.querySelectorAll(
      ".slider-item__btn-hide"
    );
    let arrElementsContentText = document.querySelectorAll(
      ".slider-item__content-text"
    );
    let arrBtnTextHideSlideContent = document.querySelectorAll(
      ".slider-item__btn-hide-text"
    );

    function toggleHideBlock(arrElements, classNameAdd) {
      for (element of arrElements) {
        element.classList.toggle(classNameAdd);

        if (element.classList.contains(classNameAdd)) {
          for (elemText of arrBtnTextHideSlideContent) {
            elemText.textContent = "развернуть";
          }
        } else {
          for (elemText of arrBtnTextHideSlideContent) {
            elemText.textContent = "скрыть";
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
    let sliderItems = block.querySelectorAll(".slider__item");
    let btnPrev = block.querySelector(".slider__arrow-prev");
    let btnNext = block.querySelector(".slider__arrow-next");
    let currentSlide = block.querySelector(".slider-numeration__current-slide");
    let valueOfSlides = block.querySelector(
      ".slider-numeration__value-of-slides"
    );

    valueOfSlides.textContent = sliderItems.length;

    function hasClassActive(element) {
      return element.classList.contains("slider__item-active");
    }

    function checkSliderArrows() {
      let arr = Array.from(sliderItems);
      let index = arr.findIndex(hasClassActive);

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

    btnNext.addEventListener("click", () => {
      let arr = Array.from(sliderItems);
      let index = arr.findIndex(hasClassActive);

      if (index != arr.length - 1) {
        arr[index].classList.remove("slider__item-active");
        arr[index + 1].classList.add("slider__item-active");
        currentSlide.textContent++;
      }
      checkSliderArrows();
    });

    btnPrev.addEventListener("click", () => {
      let arr = Array.from(sliderItems);
      let index = arr.findIndex(hasClassActive);

      if (index != 0) {
        arr[index].classList.remove("slider__item-active");
        arr[index - 1].classList.add("slider__item-active");
        currentSlide.textContent--;
      }
      checkSliderArrows();
    });
    checkSliderArrows();
  }

  hideShow();
  slider(document.querySelector(".main-profiles"));
};
