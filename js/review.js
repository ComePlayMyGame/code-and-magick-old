'use strict';

(function() {
  /**
   * Контруктор объекта отзыва
   * @param {Element} data
   * @constructor
   * */
  function Review(data) {
    this._data = data;
  }

  /**
   * Метод отрисовки отзыва на странице
   * @method render
   * @return {Node|*}
   * */
  Review.prototype.render = function() {
    var template = document.querySelector('#review-template');
    /**
     * Массив из названия классов для рейтинга отзыва
     *  @type {Array.<string>}
     * */
    var ratingValue = ['review-rating-two', 'review-rating-three', 'review-rating-four', 'review-rating-five'];
    /**
     * Кол-во милисекунд для ожидания загрузки изображения
     * @const {number}
     * */
    var IMAGE_TIMEOUT = 3000;

    if ('content' in template) {
      this.element = template.content.children[0].cloneNode(true);
    } else {
      this.element = template.children[0].cloneNode(true);
    }
    this.element.querySelector('.review-text').textContent = this._data.description;
    if (this._data.rating > 1) {
      this.element.querySelector('.review-rating').classList.add(ratingValue[+this._data.rating - 2]);
    }

    var imageToReplace = this.element.querySelector('.review-author');
    var reviewAuthorImage = new Image();

    /**
     * Обработчик загрузки изображения
     * */
    reviewAuthorImage.onload = function() {
      clearTimeout(imageLoadTimeout);
      this.element.replaceChild(reviewAuthorImage, imageToReplace);
      reviewAuthorImage.classList.add('review-author');
      reviewAuthorImage.width = 124;
      reviewAuthorImage.height = 124;
      reviewAuthorImage.alt = this._data.author.name;
      reviewAuthorImage.title = this._data.author.name;
    }.bind(this);

    /**
     * Обработчик ошибки при загрузке изображения или его отсутствии
     * */
    reviewAuthorImage.onerror = function() {
      reviewAuthorImage.src = '';
      this.element.classList.add('review-load-failure');
    }.bind(this);

    reviewAuthorImage.src = this._data.author.picture;

    var imageLoadTimeout = setTimeout(function() {
      reviewAuthorImage.src = '';
      this.element.classList.add('review-load-failure');
    }.bind(this), IMAGE_TIMEOUT);

    return this.element;
  };

  module.exports = Review;
})();
