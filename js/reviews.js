/*global reviews*/
'use strict';

(function() {
  var reviewsFilterContainer = document.querySelector('.reviews-filter');
  var reviewsListContainer = document.querySelector('.reviews-list');

  reviewsFilterContainer.classList.add('invisible');

  reviews.forEach(function(review) {
    var elementToAdd = getElementFromTemplate(review);
    reviewsListContainer.appendChild(elementToAdd);
  });

  function getElementFromTemplate(data) {
    var RATING_TWO = 2;
    var RATING_THREE = 3;
    var RATING_FOUR = 4;
    var RATING_FIVE = 5;
    var element = null;
    var template = document.querySelector('#review-template');

    if ('content' in template) {
      element = template.content.children[0].cloneNode(true);
    } else {
      element = template.children[0].cloneNode(true);
    }
    element.querySelector('.review-text').textContent = data.description;
    switch (data.rating) {
      case RATING_TWO :
        element.querySelector('.review-rating').classList.add('review-rating-two');
        break;
      case RATING_THREE :
        element.querySelector('.review-rating').classList.add('review-rating-three');
        break;
      case RATING_FOUR :
        element.querySelector('.review-rating').classList.add('review-rating-four');
        break;
      case RATING_FIVE :
        element.querySelector('.review-rating').classList.add('review-rating-five');
        break;
    }

    var imageToReplace = element.querySelector('.review-author');
    var reviewContainer = imageToReplace.parentNode;
    var reviewAuthorImage = new Image();

    reviewAuthorImage.onload = function() {
      clearTimeout(imageLoadTimeout);
      reviewContainer.replaceChild(reviewAuthorImage, imageToReplace);
      reviewAuthorImage.classList.add('review-author');
      reviewAuthorImage.width = 124;
      reviewAuthorImage.height = 124;
      reviewAuthorImage.alt = data.author.name;
      reviewAuthorImage.title = data.author.name;
    };

    reviewAuthorImage.onerror = function() {
      reviewAuthorImage.src = '';
      reviewContainer.classList.add('review-load-failure');
    };

    reviewAuthorImage.src = data.author.picture;

    var IMAGE_TIMEOUT = 3000;
    var imageLoadTimeout = setTimeout(function() {
      reviewAuthorImage.src = '';
      reviewContainer.classList.add('review-load-failure');
    }, IMAGE_TIMEOUT);

    return element;
  }

  reviewsFilterContainer.classList.remove('invisible');
})();
