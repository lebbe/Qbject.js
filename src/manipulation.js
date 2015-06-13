

(function(window, undefined) {

  function addRemoveClasses($items, classes, addRemove) {
    classes && $items.forEach(function(node, i) {

      ((typeof classes === 'function') ?
       classes.bind(node)(i, node.className) :
       classes)
        .trim().split(/\s+/).forEach(function(styleClass) {  
          node.classList[addRemove](styleClass);
        });
    });
    return $items;
  }

  $.fn.addClass = function(classes) {
    return addRemoveClasses(this, classes, 'add');
  }

  $.fn.removeClass = function(classes) {
    return addRemoveClasses(this, classes, 'remove');
  }

  /**
   * Without argument: Return html representation of first
   * object in Qbject-array as string.
   * With argument: Use it as html for all elements in array.
   */
  $.fn.html = function(html) {
    if(html) {
      this.forEach(function(a) {a.outerHTML = html;});
      return this;
    } else {
      if(this.length > 0)
        return this[0].outerHTML;
    }
    return '';
  }
  
  /**
   * Insert content, specified by the parameter, to the end of each element in 
   * the set of matched elements.
   */
  $.fn.append = function(content) {
    var $content = $(content);
    this.forEach(function(a) {
      a.appendChild($content.clone()[0]);
    });
    return this;
  }

  $.fn.clone = function(content) {
    var result = $();
    this.forEach(function(a) {
      result = result.add($(a).html());
    });
    return result;
  };
})(window);
