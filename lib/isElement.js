/**
 * Determines if the passed el is a DOM element
 */
export function isElement( el )
{
  let isElem;

  if ( typeof HTMLElement === 'object' )
  {
    isElem = el instanceof HTMLElement;
  }
  else
  {
    isElem = !!el && ( typeof el === 'object' ) && el.nodeType === 1 && typeof el.nodeName === 'string';
  }
  return isElem;
}
