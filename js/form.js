'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  var review = formContainer.querySelector('.review-form');
  var marks = review.querySelectorAll('.review-mark-label');
  var userName = review.querySelector('.review-form-field-name');
  var reviewDescription = review.querySelector('.review-form-field-text');
  var submitReview = review.querySelector('.review-submit');
  var hintsContainer = review.querySelector('.review-fields');
  var hintUserName = hintsContainer.querySelector('.review-fields-name');
  var hintReviewDesciption = hintsContainer.querySelector('.review-fields-text');
  var minGoodRating = 3;
  //Начальные данные
  userName.required = true;
  submitReview.disabled = true;
  setVisibileIfInputValid();
  setMarksEvent();

  userName.onkeyup = function() {
    setVisibileIfInputValid();
    if (userName.validity.valid) {
      submitReview.disabled = !formIsValid();
    } else {
      submitReview.disabled = true;
    }
  };

  reviewDescription.onkeyup = function() {
    setVisibileIfInputValid();
    if (reviewDescription.validity.valid) {
      submitReview.disabled = !formIsValid();
    } else {
      submitReview.disabled = true;
    }
  };

  function setMarksEvent() {
    minGoodRating -= 1;
    for (var i = 0; i < marks.length; i++) {
      if (i < minGoodRating) {
        marks[i].onclick = function() {
          reviewDescription.required = true;
          setVisibileIfInputValid();
          submitReview.disabled = (userName.validity.valid && reviewDescription.validity.valid);
        };
      } else {
        marks[i].onclick = function() {
          reviewDescription.required = false;
          setVisibileIfInputValid();
          submitReview.disabled = userName.validity.valid;
        };
      }
    }
  }

  function setVisibileIfInputValid() {
    if (userName.validity.valid) {
      hintUserName.classList.add('invisible');
      if (reviewDescription.validity.valid) {
        hintReviewDesciption.classList.add('invisible');
        hintsContainer.classList.add('invisible');
      } else {
        hintReviewDesciption.classList.remove('invisible');
        hintsContainer.classList.remove('invisible');
      }
    } else {
      hintUserName.classList.remove('invisible');
      hintsContainer.classList.remove('invisible');
    }
  }

  function formIsValid() {
    var isValid = true;
    for (var i = 0; i < review.length; i++) {
      isValid = review[i].validity.valid;
      if (!isValid) {
        break;
      }
    }
    return isValid;
  }
})();
