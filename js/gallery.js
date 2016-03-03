'use strict';

(function() {
  function Gallery() {
    this.galleryOverlay = document.querySelector('.overlay-gallery');
    this.galleryCloseButton = this.galleryOverlay.querySelector('.overlay-gallery-close');
    this.leftControl = this.galleryOverlay.querySelector('.overlay-gallery-control-left');
    this.rightControl = this.galleryOverlay.querySelector('.overlay-gallery-control-right');

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

  Gallery.prototype._onCloseClick = function() {
    this.hide();
  };

  Gallery.prototype._onLeftClick = function() {
    console.log('клик по кнопке влево');
  };

  Gallery.prototype._onRightClick = function() {
    console.log('клик по кнопке вправо');
  };

  Gallery.prototype._onDocumentKeyDown = function(evt) {
    if (evt.keyCode === 27) {
      this._onCloseClick();
    }
  };

  var gallerySection = document.querySelector('.photogallery');
  var pictures = gallerySection.querySelectorAll('.photogallery-image');

  Array.prototype.forEach.call(pictures, function(item) {
    item.addEventListener('click', function() {
      var picture = new Gallery();
      picture.show();
    });
  });

  window.Gallery = Gallery;
})();
