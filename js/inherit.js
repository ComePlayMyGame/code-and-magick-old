'use strict';

(function() {
  function inherit(Child, Parent) {
    var EmptyCtor = function() {};
    EmptyCtor.prototype = Parent.prototype;
    Child.prototype = Object.create(EmptyCtor.prototype);
  }
  window.inherit = inherit;
})();
