'use strict';

(function() {
  /**
   * Конструктор объекта Gallery
   * @constructor
   * */
  function Gallery() {
    this.galleryOverlay = document.querySelector('.overlay-gallery');
    this.galleryCloseButton = this.galleryOverlay.querySelector('.overlay-gallery-close');
    this.leftControl = this.galleryOverlay.querySelector('.overlay-gallery-control-left');
    this.rightControl = this.galleryOverlay.querySelector('.overlay-gallery-control-right');
    this.previewContainer = this.galleryOverlay.querySelector('.overlay-gallery-preview');
    this.currentPhotoNumberElement = this.previewContainer.querySelector('.preview-number-current');
    this.totalPhotosNumberElement = this.previewContainer.querySelector('.preview-number-total');

    this._onCloseClick = this._onCloseClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    this._onLeftClick = this._onLeftClick.bind(this);
    this._onRightClick = this._onRightClick.bind(this);
  }

  /**
   * Показывает галерею и вешает обработчики событий на кнопки в галерее
   * @method show
   * */
  Gallery.prototype.show = function() {
    this.galleryOverlay.classList.remove('invisible');

    this.galleryCloseButton.addEventListener('click', this._onCloseClick);
    this.leftControl.addEventListener('click', this._onLeftClick);
    this.rightControl.addEventListener('click', this._onRightClick);
    document.addEventListener('keydown', this._onDocumentKeyDown);
  };

  /**
   * Скрывает галерею и удаляет обработчики событий с кнопок галереи
   * @method hide
   * */
  Gallery.prototype.hide = function() {
    this.galleryOverlay.classList.add('invisible');
    this.galleryCloseButton.removeEventListener('click', this._onCloseClick);
    this.leftControl.removeEventListener('click', this._onLeftClick);
    this.rightControl.removeEventListener('click', this._onRightClick);
    document.removeEventListener('keydown', this._onDocumentKeyDown);
  };

  /**
   * Получает массив скриншотов и сохраняет его
   * @param {Array.<Photo>} photo
   * */
  Gallery.prototype.setPictures = function(photo) {
    this.photos = photo;
    this.totalPhotosNumber = this.photos.length;
  };

  /**
   * Показываем текущую фотографию в галерее
   * @param {number} number
   * */
  Gallery.prototype.setCurrentPicture = function(number) {
    var previousImage = this.previewContainer.querySelector('img');
    var currentImage = new Image();
    this.currentImageCounter = number;

    this.currentPicture = this.photos[number];
    currentImage.src = this.currentPicture.element.firstChild.src;
    if (previousImage) {
      this.previewContainer.replaceChild(currentImage, previousImage);
    } else {
      this.previewContainer.appendChild(currentImage);
    }
    this.currentPhotoNumberElement.textContent = number + 1;
    this.totalPhotosNumberElement.textContent = this.photos.length;
  };

  /**
   * Обработчик события клика на крестик в галерее, который скрывает её
   * @method _onCloseClick
   * @private
   * */
  Gallery.prototype._onCloseClick = function() {
    this.hide();
  };

  /**
   * Обработчик события клика на кнопку влево, которая меняет текущую фотографию в галерее
   * @method _onLeftClick
   * @private
   * */
  Gallery.prototype._onLeftClick = function() {
    if (this.currentImageCounter > 0) {
      this.setCurrentPicture(this.currentImageCounter - 1);
    }
  };

  /**
   * Обработчик события клика на кнопку вправо, которая меняет текущую фотографию в галерее
   * @method _onRightClick
   * @private
   * */
  Gallery.prototype._onRightClick = function() {
    if (this.currentImageCounter < this.totalPhotosNumber - 1) {
      this.setCurrentPicture(this.currentImageCounter + 1);
    }
  };

  /**
   * Обработчик события клика на кнопку ESC, которая скрывает галерею при нажатии на кнопку
   * @method _onDocumentKeyDown
   * @private
   * @param {Event} evt
   * */
  Gallery.prototype._onDocumentKeyDown = function(evt) {
    if (evt.keyCode === 27) {
      this._onCloseClick();
    }
  };

  var gallerySection = document.querySelector('.photogallery');
  var pictures = gallerySection.querySelectorAll('.photogallery-image');
  var picture = new Gallery();

  Array.prototype.forEach.call(pictures, function(item) {
    item.addEventListener('click', function() {
      picture.show();
    });
  });

  module.exports = Gallery;
})();
