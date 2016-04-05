/**
 * Expose `unique`
 */

import isElement from './isElement';

module.exports = unique;




/**
 * Generate unique CSS selector for given DOM element
 *
 * @param {Element} el
 * @return {String}
 * @api private
 */

function unique( el )
{
  if ( !isElement( el ) )
  {
    throw new TypeError( 'Element expected' );
  }

  var selector  = selectors(el).join(' > ');
  var matches   = document.querySelectorAll(selector);

  // If selector is not unique enough (wow!), then
  // force the `nth-child` pseido selector
  if (matches.length > 1) {
    for (var i = 0; i < matches.length; i++) {
      if (el === matches[i]) {
        // Recalculate index based on position of el amongst siblings
        i = [].indexOf.call(el.parentNode.children, el);

        selector += ':nth-child(' + (i + 1) + ')';
        break;
      }
    }
  }

  return selector;
};

/**
 * Get class names for an element
 *
 * @pararm {Element} el
 * @return {Array}
 */

function getClassNames(el) {
    var className = el.getAttribute('class');
    if (!className || !className.length) { return []; }

    // remove duplicate whitespace
    className = className.replace(/\s+/g, ' ');

    // trim leading and trailing whitespace
    className = className.replace(/^\s+|\s+$/g, '');

    // split into separate classnames
    return className.split(' ');
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
  var name  = null;
  var value = null;

  do {
    // IDs are unique enough
    if (el.id) {
      label = '#' + el.id;
    } else {
      // Otherwise, use tag name
      label     = el.tagName.toLowerCase();

      var classNames = getClassNames(el);

      // Tag names could use classes for specificity
      if (classNames.length) {
        label += '.' + classNames.join('.');
      }
    }

    // Titles & Alt attributes are very useful for specificity and tracking
    if (title = el.getAttribute('title')) {
      label += '[title="' + title + '"]';
    } else if (alt = el.getAttribute('alt')) {
      label += '[alt="' + alt + '"]';
    } else if (name = el.getAttribute('name')) {
      label += '[name="' + name + '"]';
    }

    if (value = el.getAttribute('value')) {
      label += '[value="' + value + '"]';
    }

    parts.unshift(label);
  } while (!el.id && (el = el.parentNode) && el.tagName);

  // Some selectors should have matched at least
  if (!parts.length) {
    throw new Error('Failed to identify CSS selector');
  }

  return parts;
}
