/**
 * Poor mans ECMASCRIPT 5 "jQuery".
 *
 * - Use document.querySelectorAll for queries.
 * - Point $ prototype to Array.prototype.
 * - Implement jQuery API as I need it.
 * 
 *
 * I use this for my small pet projects that are only meant for running in
 * Chrome/Opera (homemade browser plugins for my specific needs). I might also 
 * begin use this for a Safari-project soon.
 *
 */
(function(window, undefined) {
  /* Used to see if an object is an instance of Qbject. Exposed in the field 
   * __qobject.  */
  var UID = 'qbject1.0';
  /* While this is false, functions sent to $ will be stacked in the array
   * onDomready. */
  var domready = false;
  /* Functions in this array will be called on the DomContentLoaded event. */
  var onDomready = [];
  
  function onDomReady(event) {
    domready = true;
    onDomready.forEach(function(a) {a()});
    onDomready = undefined;
    document.removeEventListener('DOMContentLoaded', onDomReady);
  }
  
  document.addEventListener('DOMContentLoaded', onDomReady);
  
  /**
   * Handle calls on $.
   */
  window.$ = function $(selector) {
    /* No arguments or empty string or something else falsy as argument,
     * return the empty Qbject. */
    if(!selector) {
      return new $([]);
    }

    /* Strings is interpreted as selectors or HTML. */
    if(typeof selector === 'string') {
      selector = selector.trim();
      if(selector.indexOf('<') !== 0)
        return new $(document.querySelectorAll(selector));
      var div = document.createElement('div');
      div.innerHTML = selector;
      return new $(div.children);
    }
    
    /* Feeding $ with a function: Make sure the function are run after dom
     * ready. */
    if(typeof selector === 'function') {
      if(domready)
	selector();
      else
	onDomready.push(selector);
    }
    
    /* Feeding $ with an $-instance returns the instance. */
    if(selector.__qobject && selector.__qobject === UID)
      return selector;
    
    /* If argument is array. assume the array consists of DOM Nodes. */
    if(selector.length && typeof selector.length === 'number') {
      for(var i = 0; i < selector.length; i++) {
	this.push(selector[i]);
      }
      
      return this;
    }
    /* If argument is a DOM Node, do basically the same as if argument is
     * array of DOM Nodes. */
    if(selector instanceof Node) return new $([selector]);
  }
  // Make it array-like, inherit all array methods.
  // Also for API-compatibility, let $.fn point to prototype.
  $.prototype = [];
  $.fn = $.prototype;
  $.fn.__qobject = UID;

  $.fn.toString = function() {
    return this.length > 0 ? this
      .map(function(e) {return e.outerHTML;})
      .reduce(function(a, b) {return a + '\n' + b}) : '';
  }
})(this);
