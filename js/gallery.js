'use strict';

(function() {
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

  Gallery.prototype.show = function() {
    this.galleryOverlay.classList.remove('invisible');

    this.galleryCloseButton.addEventListener('click', this._onCloseClick);
    this.leftControl.addEventListener('click', this._onLeftClick);
    this.rightControl.addEventListener('click', this._onRightClick);
    document.addEventListener('keydown', this._onDocumentKeyDown);
  };

  Gallery.prototype.hide = function() {
    this.galleryOverlay.classList.add('invisible');
    this.galleryCloseButton.removeEventListener('click', this._onCloseClick);
    this.leftControl.removeEventListener('click', this._onLeftClick);
    this.rightControl.removeEventListener('click', this._onRightClick);
    document.removeEventListener('keydown', this._onDocumentKeyDown);
  };

  Gallery.prototype.setPictures = function(photo) {
    this.photos = photo;
    this.totalPhotosNumber = this.photos.length;
  };

  Gallery.prototype.setCurrentPicture = function(number) {
    var previousImage = this.previewContainer.querySelector('img');
    var currentImage = new Image();
    this.currentImageCounter = number;

    this.currentPicture = this.photos[number];
    currentImage.src = this.currentPicture.element.firstChild.src;
    if (previousImage) {
      this.previewContainer.replaceChild(currentImage, previousImage);
      console.log('yahoo');
    } else {
      this.previewContainer.appendChild(currentImage);
      console.log('noope');
    }
    this.currentPhotoNumberElement.textContent = number + 1;
    this.totalPhotosNumberElement.textContent = this.photos.length;
  };

  Gallery.prototype._onCloseClick = function() {
    this.hide();
  };

  Gallery.prototype._onLeftClick = function() {
    if (this.currentImageCounter > 0) {
      this.setCurrentPicture(this.currentImageCounter - 1);
    }
  };

  Gallery.prototype._onRightClick = function() {
    if (this.currentImageCounter < this.totalPhotosNumber - 1) {
      this.setCurrentPicture(this.currentImageCounter + 1);
    }
  };

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

  window.Gallery = Gallery;
})();
