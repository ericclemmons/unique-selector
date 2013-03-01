/**
 * Expose `unique`
 */

module.exports = unique;

/**
 * Generate unique CSS selector for given DOM element
 *
 * @param {Element} el
 * @return {String}
 */

function unique(el) {
  if (!el || !el.tagName) {
    throw new TypeError('Element expected');
  }

  if (el === document) return 'HTML'

  return selector(el)
}

/**
 * Build a selector string
 *
 * @param {Element} el
 * @return {String}
 * @api prviate
 */

function selector(el) {
  var selector = ''
  var body = document.body

  do {
    // IDs are unique enough
    if (el.id) {
      return '#' + el.id + (selector && ('>' + selector));
    }
    if (el === body) {
      return 'BODY'+ (selector && ('>' + selector));
    }

    var label = el.tagName
    // avoid documents
    if (!label) return selector
    var className = el.getAttribute('class');

    if (className) {
      label += '.' + className.replace(/ /g, '.');
    }

    label += ':nth-child(' + index(el) +')';
    selector = label + (selector && ('>' + selector));

  } while (el = el.parentNode);

  return selector
}

function index(el){
  var i = 1
  while (el = el.previousElementSibling) i++;
  return i
}
