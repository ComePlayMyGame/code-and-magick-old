'use strict';

(function() {
  var reviewsFilterContainer = document.querySelector('.reviews-filter');
  var reviewsListContainer = document.querySelector('.reviews-list');
  var reviewsSection = document.querySelector('.reviews');
  var template = document.querySelector('#review-template');
  var showMoreReviewsButton = document.querySelector('.reviews-controls-more');
  var ratingValue = ['review-rating-two', 'review-rating-three', 'review-rating-four', 'review-rating-five'];
  var IMAGE_TIMEOUT = 3000;
  var XHR_TIMEOUT = 10000;
  var SIX_WEEKS = 42 * 24 * 60 * 60 * 1000;
  var NEUTRAL_RATING = 3;
  var xhr = new XMLHttpRequest();
  var loadedReviews = [];
  var filteredReviews = [];
  var activeFilter = 'reviews-all';
  var PAGE_SIZE = 3;
  var currentPage = 0;

  reviewsFilterContainer.classList.add('invisible');
  reviewsSection.classList.add('reviews-list-loading');

  reviewsFilterContainer.addEventListener('click', function(evt) {
    var selectedElement = evt.target;
    if (selectedElement.classList.contains('reviews-filter-item')) {
      setActiveFilter(selectedElement.htmlFor);
    }
  });

  showMoreReviewsButton.onclick = function() {
    renderReviews(filteredReviews, ++currentPage, false);
  };

  getReviews();

  function getReviews() {
    xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
    xhr.timeout = XHR_TIMEOUT;
    xhr.onload = function(evt) {
      loadedReviews = JSON.parse(evt.target.response);
      filteredReviews = loadedReviews;
      renderReviews(loadedReviews, currentPage, true);
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

  function renderReviews(reviews, pageNumber, replace) {
    var fragment = document.createDocumentFragment();
    var from = pageNumber * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    var pageReviews = reviews.slice(from, to);

    if (replace) {
      currentPage = 0;
      reviewsListContainer.innerHTML = '';
    }
    pageReviews.forEach(function(review) {
      var elementToAdd = getElementFromTemplate(review);
      fragment.appendChild(elementToAdd);
    });
    if (to < filteredReviews.length) {
      showMoreReviewsButton.classList.remove('invisible');
    } else {
      showMoreReviewsButton.classList.add('invisible');
    }
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
    if (activeFilter === id) {
      return;
    }
    currentPage = 0;
    filteredReviews = loadedReviews.slice(0);
    switch (id) {
      case 'reviews-all':
        filteredReviews = loadedReviews;
        activeFilter = 'reviews-all';
        break;
      case 'reviews-recent':
        filteredReviews = filteredReviews.filter(function(item) {
          return Date.parse(item.date) > (Date.now() - SIX_WEEKS);
        }).sort(function(a, b) {
          return Date.parse(b.date) - Date.parse(a.date);
        });
        activeFilter = 'reviews-recent';
        break;
      case 'reviews-good':
        filteredReviews = filteredReviews.filter(function(item) {
          return item.rating >= NEUTRAL_RATING;
        }).sort(function(a, b) {
          return b.rating - a.rating;
        });
        activeFilter = 'reviews-good';
        break;
      case 'reviews-bad':
        filteredReviews = filteredReviews.filter(function(item) {
          return item.rating < NEUTRAL_RATING;
        }).sort(function(a, b) {
          return a.rating - b.rating;
        });
        activeFilter = 'reviews-bad';
        break;
      case 'reviews-popular':
        filteredReviews = filteredReviews.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
        activeFilter = 'reviews-popular';
        break;
    }
    renderReviews(filteredReviews, currentPage, true);
  }

  reviewsFilterContainer.classList.remove('invisible');
})();
