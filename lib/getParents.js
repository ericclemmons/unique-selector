import { isElement } from './isElement';

/**
 * Returns all the element and all of its parents
 * @param { DOM Element }
 * @return { Array of DOM elements }
 */
export function getParents( el )
{
  const parents = [];
  let currentElement = el;
  while( isElement( currentElement ) )
  {
    parents.push( currentElement );
    currentElement = currentElement.parentNode;
  }

  return parents;
}
