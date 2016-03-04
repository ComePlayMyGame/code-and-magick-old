'use strict';

(function() {
  /**
   * Функция принимает два конструктора и записывает в прототип дочернего
   * конструктора child методы и свойства родительского конструктора parent через пустой конструктор
   * @param {object} Child
   * @param {object} Parent
   * */
  function inherit(Child, Parent) {
    var EmptyCtor = function() {};
    EmptyCtor.prototype = Parent.prototype;
    Child.prototype = new EmptyCtor();
  }
  window.inherit = inherit;
})();
