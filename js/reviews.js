'use strict';

(function() {
  var reviewsFilterContainer = document.querySelector('.reviews-filter');
  var reviewsListContainer = document.querySelector('.reviews-list');
  var reviewsSection = document.querySelector('.reviews');
  var filters = document.querySelectorAll('input[name="reviews"]');
  var template = document.querySelector('#review-template');
  var ratingValue = ['review-rating-two', 'review-rating-three', 'review-rating-four', 'review-rating-five'];
  var IMAGE_TIMEOUT = 3000;
  var XHR_TIMEOUT = 10000;
  var xhr = new XMLHttpRequest();
  var loadedReviews = [];

  reviewsFilterContainer.classList.add('invisible');
  reviewsSection.classList.add('reviews-list-loading');

  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function(evt) {
      var selectedId = evt.target.id;
      setActiveFilter(selectedId);
    };
  }

  getReviews();

  function getReviews() {
    xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
    xhr.timeout = XHR_TIMEOUT;
    xhr.onload = function(evt) {
      loadedReviews = JSON.parse(evt.target.response);
      renderReviews(loadedReviews);
      reviewsSection.classList.remove('reviews-list-loading');
    };
    xhr.error = function() {
      reviewsSection.classList.remove('reviews-list-loading');
      reviewsSection.classList.add('reviews-load-failure');
    };
    xhr.ontimeout = function() {
      reviewsSection.classList.remove('reviews-list-loading');
      reviewsSection.classList.add('reviews-load-failure');
    };
    xhr.send();
  }

  function renderReviews(reviews) {
    var fragment = document.createDocumentFragment();
    reviewsListContainer.innerHTML = '';
    reviews.forEach(function(review) {
      var elementToAdd = getElementFromTemplate(review);
      fragment.appendChild(elementToAdd);
    });
    reviewsListContainer.appendChild(fragment);
  }

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

  function setActiveFilter(id) {
    var filteredReviews = loadedReviews.slice(0);
    switch (id) {
      case 'reviews-all':
        filteredReviews = loadedReviews;
        break;
      case 'reviews-recent':
        filteredReviews = filteredReviews.filter(function(item) {
          return Date.parse(item.date) > (Date.now() - 42 * 24 * 60 * 60 * 1000);
        }).sort(function(a, b) {
          return Date.parse(b.date) - Date.parse(a.date);
        });
        break;
      case 'reviews-good':
        filteredReviews = filteredReviews.filter(function(item) {
          return item.rating > 2;
        }).sort(function(a, b) {
          return b.rating - a.rating;
        });
        break;
      case 'reviews-bad':
        filteredReviews = filteredReviews.filter(function(item) {
          return item.rating < 3;
        }).sort(function(a, b) {
          return a.rating - b.rating;
        });
        break;
      case 'reviews-popular':
        filteredReviews = filteredReviews.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
        break;
    }
    renderReviews(filteredReviews);
  }

  reviewsFilterContainer.classList.remove('invisible');
})();
