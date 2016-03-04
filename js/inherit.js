'use strict';

(function() {
  function inherit(Child, Parent) {
    var EmptyCtor = function() {};
    EmptyCtor.prototype = Parent.prototype;
    Child.prototype = new EmptyCtor();
  }
  window.inherit = inherit;
})();
