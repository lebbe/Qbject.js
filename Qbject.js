(function(window, undefined) {
    var UID = "qbject1.0";
    var domready = false;
    var onDomready = [];
    function onDomReady(event) {
        domready = true;
        onDomready.forEach(function(a) {
            a();
        });
        onDomready = undefined;
        document.removeEventListener("DOMContentLoaded", onDomReady);
    }
    document.addEventListener("DOMContentLoaded", onDomReady);
    window.$ = function $(selector) {
        if (!selector) {
            return new $([]);
        }
        if (typeof selector === "string") {
            selector = selector.trim();
            if (selector.indexOf("<") !== 0) return new $(document.querySelectorAll(selector));
            var div = document.createElement("div");
            div.innerHTML = selector;
            return new $(div.children);
        }
        if (typeof selector === "function") {
            if (domready) selector(); else onDomready.push(selector);
        }
        if (selector.__qobject && selector.__qobject === UID) return selector;
        if (selector.length && typeof selector.length === "number") {
            for (var i = 0; i < selector.length; i++) {
                this.push(selector[i]);
            }
            return this;
        }
        if (selector instanceof Node) return new $([ selector ]);
    };
    $.prototype = [];
    $.fn = $.prototype;
    $.fn.__qobject = UID;
    $.fn.toString = function() {
        return this.length > 0 ? this.map(function(e) {
            return e.outerHTML;
        }).reduce(function(a, b) {
            return a + "\n" + b;
        }) : "";
    };
})(this);

(function() {
    var add = "add";
    var remove = "remove";
    function addRemoveClasses($items, classes, addRemove, toggle) {
        classes && $items.forEach(function(node, i) {
            (typeof classes === "function" ? classes.bind(node)(i, node.className) : classes).trim().split(/\s+/).forEach(function(styleClass) {
                var classList = node.classList;
                if (toggle) {
                    if (classList.contains(styleClass)) classList[remove](styleClass); else classList[add](styleClass);
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
        for (var i = 0; i < this.length; i++) if (this[i].classList.contains(className)) return true;
        return false;
    };
    $.fn.toggleClass = function(classes, swizz) {
        return addRemoveClasses(this, classes, swizz ? add : remove, swizz === undefined);
    };
    $.fn.html = function(html) {
        if (html) {
            this.forEach(function(a) {
                a.outerHTML = html;
            });
            return this;
        } else {
            if (this.length > 0) return this[0].outerHTML;
        }
        return "";
    };
    $.fn.append = function(content) {
        var $content = $(content);
        this.forEach(function(a) {
            a.appendChild($content.clone()[0]);
        });
        return this;
    };
    $.fn.appendTo = function(target) {
        target = $(target);
        this.forEach(function(nodeFrom) {
            if (target.length === 1) {
                target[0].appendChild(nodeFrom);
            } else {
                target.forEach(function(nodeTarget) {
                    nodeTarget.appendChild($(nodeFrom).clone()[0]);
                });
            }
        });
    };
    $.fn.clone = function(content) {
        var result = $();
        this.forEach(function(a) {
            result = result.add($(a).html());
        });
        return result;
    };
})();

(function() {
    var ap = Array.prototype;
    $.fn.each = function(f) {
        this.forEach(function(element, index, array) {
            f.call(element, index, element);
        });
        return this;
    };
    $.fn.add = function(selector) {
        return new $(ap.concat(ap.slice.call(this), ap.slice.call($(selector))));
    };
    $.fn.find = function(selector) {
        var result = $();
        this.forEach(function(a) {
            result = result.add(new $(a.querySelectorAll(selector)));
        });
        return result;
    };
})();
