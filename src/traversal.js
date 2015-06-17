

(function() {
  var ap = Array.prototype;

  $.fn.each = function(f) {
    this.forEach(function(element, index, array) {
      f.call(element, index, element);
    });
    return this;
  }
  
  $.fn.add = function (selector) {
    return new $(ap.concat(
      ap.slice.call(this),
      ap.slice.call($(selector))));
  }

  $.fn.children = function() {
    var result = $();
    this.forEach(function(node) {
      result = result.add(new $(node.children));
    });
    return result;
  };
  
  $.fn.find = function(selector) {
    var result = $();
    this.forEach(function(a){
      result = result.add(new $(a.querySelectorAll(selector)));
    });
    return result;
  }

  $.fn.is = function(selector) {
    for(var i = 0; i < this.length; i++) {
      var candidates = this[i].parentNode.querySelectorAll(selector);
      for(var j = 0; j < candidates.length; j++)
        if(candidates[j] === this[i])
          return true;
    }
    return false;
  };
})();
