let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

// accordion section
//uses classList, setAttribute, and querySelectorAll
//if you want this to work in IE8/9 youll need to polyfill these
(function () {
  var d = document,
    accordionToggles = d.querySelectorAll(".js-accordionTrigger"),
    setAria,
    setAccordionAria,
    switchAccordion,
    touchSupported = "ontouchstart" in window,
    pointerSupported = "pointerdown" in window;

  skipClickDelay = function (e) {
    e.preventDefault();
    e.target.click();
  };

  setAriaAttr = function (el, ariaType, newProperty) {
    el.setAttribute(ariaType, newProperty);
  };
  setAccordionAria = function (el1, el2, expanded) {
    switch (expanded) {
      case "true":
        setAriaAttr(el1, "aria-expanded", "true");
        setAriaAttr(el2, "aria-hidden", "false");
        break;
      case "false":
        setAriaAttr(el1, "aria-expanded", "false");
        setAriaAttr(el2, "aria-hidden", "true");
        break;
      default:
        break;
    }
  };
  //function
  switchAccordion = function (e) {
    console.log("triggered");
    e.preventDefault();
    var thisAnswer = e.target.parentNode.nextElementSibling;
    var thisQuestion = e.target;
    if (thisAnswer.classList.contains("is-collapsed")) {
      setAccordionAria(thisQuestion, thisAnswer, "true");
    } else {
      setAccordionAria(thisQuestion, thisAnswer, "false");
    }
    thisQuestion.classList.toggle("is-collapsed");
    thisQuestion.classList.toggle("is-expanded");
    thisAnswer.classList.toggle("is-collapsed");
    thisAnswer.classList.toggle("is-expanded");

    thisAnswer.classList.toggle("animateIn");
  };
  for (var i = 0, len = accordionToggles.length; i < len; i++) {
    if (touchSupported) {
      accordionToggles[i].addEventListener(
        "touchstart",
        skipClickDelay,
        false
      );
    }
    if (pointerSupported) {
      accordionToggles[i].addEventListener(
        "pointerdown",
        skipClickDelay,
        false
      );
    }
    accordionToggles[i].addEventListener("click", switchAccordion, false);
  }
})();