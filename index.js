/**
 * Expose `unique`
 */

module.exports = unique;

/**
 * Generate unique CSS selector for given DOM element
 *
 * @param {Element} el
 * @return {String}
 * @api private
 */

function unique(el) {
  if (!el || !el.tagName) {
    throw new TypeError('Element expected');
  }

  var sel = selector(el)
  var matches  = document.querySelectorAll(sel);

  // not unique enough (wow!)
  if (matches.length > 1) {
    sel += ':nth-child(' + (prevSibs(el) + 1) +')';
  }

  return sel
}

function prevSibs(el){
  var i = 0
  while (el = el.previousElementSibling) i++;
  return i
}

/**
 * Build a selector string
 *
 * @param {Element} el
 * @return {String}
 * @api prviate
 */

function selector(el) {
  var title = null;
  var alt   = null;
  var selector = ''

  do {
    // IDs are unique enough
    if (el.id) {
      return '#' + el.id + (selector && ('>' + selector));
    }

    // Otherwise, use tag name
    var label = el.tagName.toLowerCase();
    var className = el.getAttribute('class');

    if (className) {
      label += '.' + className.replace(/ /g, '.');
    }

    // Titles & Alt attributes are very useful for specificity and tracking
    if (title = el.getAttribute('title')) {
      label += '[title="' + title + '"]';
    } else if (alt = el.getAttribute('alt')) {
      label += '[alt="' + alt + '"]';
    }

    selector = label + (selector && ('>' + selector));
  } while ((el = el.parentNode) && el.nodeType === 1);

  return selector
}
