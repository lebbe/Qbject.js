

(function(window, undefined) {

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
      result.push($(a).html());
    });
    return result;
  };
})(window);
