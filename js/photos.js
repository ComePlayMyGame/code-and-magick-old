'use strict';

(function() {
  var Photo = require('photo');
  var Gallery = require('gallery');
  var photosContainer = document.querySelector('.photogallery');
  var photoGallery = photosContainer.querySelectorAll('.photogallery-image');
  var gallery = new Gallery();

  var currentPhotoGallery = Array.prototype.map.call(photoGallery, function(item) {
    return new Photo(item);
  });

  gallery.setPictures(currentPhotoGallery);

  currentPhotoGallery.forEach(function(photo, index) {
    photo.element.addEventListener('click', function(evt) {
      evt.preventDefault();
      gallery.show();
      gallery.setCurrentPicture(index);
    });
  });
})();
