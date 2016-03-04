/*global docCookies*/
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
  setValuesFromCookies();
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

  review.onsubmit = function(evt) {
    evt.preventDefault();
    var currentDate = new Date();
    var myBday = new Date(currentDate);
    var currentYear = currentDate.getFullYear();
    var daysFromBday;
    var formattedDateToExpire;
    /**
     * Месяц моего дня рождения
     * @const {number}
     * */
    var BDAY_MONTH = 9;
    /**
     * День месяца
     * @const{number}
     * */
    var BDAY_DATE = 26;

    myBday.setDate(BDAY_DATE);
    myBday.setMonth(BDAY_MONTH - 1);
    if (currentDate - myBday < 0) {
      myBday.setFullYear(currentYear - 1);
    }
    daysFromBday = currentDate - myBday;
    formattedDateToExpire = new Date(+currentDate + daysFromBday);
    docCookies.setItem('name', userName.value.toString(), formattedDateToExpire);
    docCookies.setItem('rating', review['review-mark'].value.toString(), formattedDateToExpire);
    review.submit();
  };

  /**
   * Устанавливает значение имени пользователя и рейтинга из cookies
   * */
  function setValuesFromCookies() {
    if (docCookies.hasItem('name')) {
      userName.value = docCookies.getItem('name');
    }
    if (docCookies.hasItem('rating')) {
      marks[(docCookies.getItem('rating') - 1)].checked = true;
    }
  }

  /**
   * Делает кнопку отправки активной или неактивной и показывает подсказки для не заполненных полей
   * */
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

  /**
   * Проверяет заполнено ли поле формы и убирает подсказку, если заполнено
   * @param {Element} fieldName
   * @param {Element} hint
   * @returns {boolean}
   * */
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
