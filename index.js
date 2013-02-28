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

  var selector = selectors(el).join(' > ');
  var matches  = document.querySelectorAll(selector);

  // not unique enough (wow!)
  if (matches.length > 1) {
    selector += ':nth-child(' + (prevSibs(el) + 1) +')';
  }

  return selector;
}

function prevSibs(el){
  var i = 0
  while (el = el.previousElementSibling) i++;
  return i
}

/**
 * CSS selectors to generate unique selector for DOM element
 *
 * @param {Element} el
 * @return {Array}
 * @api prviate
 */

function selectors(el) {
  var parts = [];
  var label = null;
  var title = null;
  var alt   = null;

  do {
    // IDs are unique enough
    if (el.id) {
      label = '#' + el.id;
    } else {
      // Otherwise, use tag name
      label     = el.tagName.toLowerCase();
      var className = el.getAttribute('class');

      // Tag names could use classes for specificity
      if (className && className.length) {
        label += '.' + className.split(' ').join('.');
      }
    }

    // Titles & Alt attributes are very useful for specificity and tracking
    if (title = el.getAttribute('title')) {
      label += '[title="' + title + '"]';
    } else if (alt = el.getAttribute('alt')) {
      label += '[alt="' + alt + '"]';
    }

    parts.unshift(label);
  } while (!el.id && (el = el.parentNode) && el.tagName);

  // Some selectors should have matched at least
  if (!parts.length) {
    throw new Error('Failed to identify CSS selector');
  }

  return parts;
}
