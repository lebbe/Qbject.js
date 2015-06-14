

(function() {
  var ap = Array.prototype;
  /* Run f on each element. */
  $.fn.each = function(f) {
    this.forEach(function(element, index, array) {
      f.call(element, index, element);
    });
    return this;
  }
  
  /**
   * Returns a new Qbject with the current nodes plus the new nodes.
   */
  $.fn.add = function (selector) {
    return new $(ap.concat(
      ap.slice.call(this),
      ap.slice.call($(selector))));
  }
  
  $.fn.find = function(selector) {
    var result = $();
    this.forEach(function(a){
      result = result.add(new $(a.querySelectorAll(selector)));
    });
    return result;
  }
})();
