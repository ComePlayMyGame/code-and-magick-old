'use strict';

(function() {
  var Review = require('review');
  var reviewsFilterContainer = document.querySelector('.reviews-filter');
  var reviewsListContainer = document.querySelector('.reviews-list');
  var reviewsSection = document.querySelector('.reviews');
  var showMoreReviewsButton = document.querySelector('.reviews-controls-more');
  /**
   * Таймаут для XHR сессии
   * @const {number}
   * */
  var XHR_TIMEOUT = 10000;
  /**
   * Кол-во милисекунд в 6-ти неделях
   * @const {number}
   * */
  var SIX_WEEKS = 42 * 24 * 60 * 60 * 1000;
  /**
   * Средний рейтинг, который будет влиять на необходимость поля Описание
   * @const {number}
   * */
  var NEUTRAL_RATING = 3;
  var xhr = new XMLHttpRequest();
  var loadedReviews = [];
  var filteredReviews = [];
  var activeFilter = 'reviews-all';
  /**
   * Размер одной страницы отзывов
   * @const {number}
   * */
  var PAGE_SIZE = 3;
  var currentPage = 0;

  reviewsFilterContainer.classList.add('invisible');
  reviewsSection.classList.add('reviews-list-loading');

  /**
   * Добавляем обработчик событий по нажатию на фильтры в отзывах,
   * который устанавливает выбранный фильтр
   * */
  reviewsFilterContainer.addEventListener('click', function(evt) {
    var selectedElement = evt.target;
    if (selectedElement.checked === true) {
      setActiveFilter(selectedElement.value);
    }
  });

  /**
   * Добавляем обработчик событий, который срабатывает по нажатию на кнопку
   * "Еще отзывы" и добавляет в конец списка отзывы, если еще есть подходящие
   * */
  showMoreReviewsButton.addEventListener('click', function() {
    renderReviews(filteredReviews, ++currentPage, false);
  });

  getReviews();

  /**
   * Загрузка списка отзывов и отработка ошибок при загрузке
   * */
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

  /**
   *
   * @param {Array.<Object>} reviews
   + @param {number} pageNumber
   + @param {boolean=} replace
   * */
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
      var ReviewElement = new Review(review);
      ReviewElement.render();
      fragment.appendChild(ReviewElement.element);
    });
    if (to < filteredReviews.length) {
      showMoreReviewsButton.classList.remove('invisible');
    } else {
      showMoreReviewsButton.classList.add('invisible');
    }
    reviewsListContainer.appendChild(fragment);
  }

  /**
   * Установка выбранного фильтра
   * @param {string} id
   * */
  function setActiveFilter(id) {
    var renderedElements = reviewsListContainer.querySelectorAll('.review');

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

    Array.prototype.forEach.call(renderedElements, function(element) {
      reviewsListContainer.removeChild(element);
    });
    renderReviews(filteredReviews, currentPage, true);
  }

  reviewsFilterContainer.classList.remove('invisible');
})();
