

(function(window, undefined) {

  // Minification helpers
  var add = 'add';
  var remove = 'remove';

  function addRemoveClasses($items, classes, addRemove, toggle) {
    classes && $items.forEach(function(node, i) {

      ((typeof classes === 'function') ?
       classes.bind(node)(i, node.className) :
       classes).trim().split(/\s+/)
        .forEach(function(styleClass) {
          var classList = node.classList;
          if(toggle) {
            if(classList.contains(styleClass))
              classList[remove](styleClass);
            else
              classList[add](styleClass);
          } else {
            classList[addRemove](styleClass);
          }
        });
    });
    return $items;
  }

  $.fn.addClass = function(classes) {
    return addRemoveClasses(this, classes, add);
  };

  $.fn.removeClass = function(classes) {
    return addRemoveClasses(this, classes, remove);
  };

  $.fn.hasClass = function(className) {
    for(var i = 0; i < this.length; i++)
      if(this[i].classList.contains(className))
        return true;
    return false;
  };

  $.fn.toggleClass = function(classes, swizz) {
    // If fourth parameter 'toggle' is true, the third parameter does not mean anything
    return addRemoveClasses(this, classes, swizz ? add : remove, swizz === undefined);
  };

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
