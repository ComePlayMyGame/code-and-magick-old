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
  var marks = review.elements['review-mark'];
  var userName = review.querySelector('.review-form-field-name');
  var reviewDescription = review.querySelector('.review-form-field-text');
  var submitReview = review.querySelector('.review-submit');
  var hintsContainer = review.querySelector('.review-fields');
  var hintUserName = hintsContainer.querySelector('.review-fields-name');
  var hintReviewDescription = hintsContainer.querySelector('.review-fields-text');

  userName.required = true;
  setSubmitButtonEnableAndSetHintsInvisible();

  for (var i = 0; i < marks.length; i++) {
    marks[i].onchange = function() {
      setSubmitButtonEnableAndSetHintsInvisible();
    };
  }

  userName.onkeyup = function() {
    setSubmitButtonEnableAndSetHintsInvisible();
  };

  reviewDescription.onkeyup = function() {
    setSubmitButtonEnableAndSetHintsInvisible();
  };

  userName.onchange = function() {
    setSubmitButtonEnableAndSetHintsInvisible();
  };

  reviewDescription.onchange = function() {
    setSubmitButtonEnableAndSetHintsInvisible();
  };

  function setSubmitButtonEnableAndSetHintsInvisible() {
    reviewDescription.required = review['review-mark'].value < 3;
    var isUserValid = isFieldValid(userName, hintUserName);
    var isReviewValid = isFieldValid(reviewDescription, hintReviewDescription);

    if (isUserValid && isReviewValid) {
      hintsContainer.classList.add('invisible');
    } else {
      hintsContainer.classList.remove('invisible');
    }
    submitReview.disabled = !(isUserValid && isReviewValid);
  }

  function isFieldValid(fieldName, hintFieldName) {
    var isValid = fieldName.validity.valid;
    if (isValid) {
      hintFieldName.classList.add('invisible');
    } else {
      hintFieldName.classList.remove('invisible');
    }
    return !fieldName.required || fieldName.required && isValid;
  }
})();
