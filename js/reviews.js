/*global reviews*/
'use strict';

(function() {
  var reviewsFilterContainer = document.querySelector('.reviews-filter');
  var reviewsListContainer = document.querySelector('.reviews-list');
  var template = document.querySelector('#review-template');
  var ratingValue = ['review-rating-two', 'review-rating-three', 'review-rating-four', 'review-rating-five'];
  var IMAGE_TIMEOUT = 3000;

  reviewsFilterContainer.classList.add('invisible');

  reviews.forEach(function(review) {
    var elementToAdd = getElementFromTemplate(review);
    reviewsListContainer.appendChild(elementToAdd);
  });

  function getElementFromTemplate(data) {
    var element = null;

    if ('content' in template) {
      element = template.content.children[0].cloneNode(true);
    } else {
      element = template.children[0].cloneNode(true);
    }
    element.querySelector('.review-text').textContent = data.description;
    if (data.rating > 1) {
      element.querySelector('.review-rating').classList.add(ratingValue[+data.rating - 2]);
    }

    var imageToReplace = element.querySelector('.review-author');
    var reviewAuthorImage = new Image();

    reviewAuthorImage.onload = function() {
      clearTimeout(imageLoadTimeout);
      element.replaceChild(reviewAuthorImage, imageToReplace);
      reviewAuthorImage.classList.add('review-author');
      reviewAuthorImage.width = 124;
      reviewAuthorImage.height = 124;
      reviewAuthorImage.alt = data.author.name;
      reviewAuthorImage.title = data.author.name;
    };

    reviewAuthorImage.onerror = function() {
      reviewAuthorImage.src = '';
      element.classList.add('review-load-failure');
    };

    reviewAuthorImage.src = data.author.picture;

    var imageLoadTimeout = setTimeout(function() {
      reviewAuthorImage.src = '';
      element.classList.add('review-load-failure');
    }, IMAGE_TIMEOUT);

    return element;
  }

  reviewsFilterContainer.classList.remove('invisible');
})();
