/**
 * Expose `unique`
 */

import { getID, } from './lib/getID';
import { getClassSelectors, } from './lib/getClasses';
import { getCombinations, } from './lib/getCombinations';
import { getAttributes, } from './lib/getAttributes';
import { getNthChild, } from './lib/getNthChild';
import { getTag, } from './lib/getTag';
import { isUnique, } from './lib/isUnique';
import { getParents, } from './lib/getParents';


/**
 * Returns all the selectors of the elmenet
 * @param  { Object } element
 * @return { Object }
 */
function getAllSelectors( el, selectors, attributesToIgnore ) {
  const funcs =
    {
      'Tag'        : getTag,
      'NthChild'   : getNthChild,
      'Attributes' : elem => getAttributes( elem, attributesToIgnore ),
      'Class'      : getClassSelectors,
      'ID'         : getID,
    };

  return selectors.reduce( ( res, next ) => {
    res[ next ] = funcs[ next ]( el );
    return res;
  }, {} );
}

/**
 * Tests uniqueNess of the element inside its parent
 * @param  { Object } element
 * @param { String } Selectors
 * @return { Boolean }
 */
function testUniqueness( element, selector ) {
  const { parentNode, } = element;
  const elements = parentNode.querySelectorAll( selector );
  return elements.length === 1 && elements[ 0 ] === element;
}

/**
 * Tests all selectors for uniqueness and returns the first unique selector.
 * @param  { Object } element
 * @param  { Array } selectors
 * @return { String }
 */
function getFirstUnique( element, selectors ) {
  return selectors.find( testUniqueness.bind( null, element ) );
}

/**
 * Checks all the possible selectors of an element to find one unique and return it
 * @param  { Object } element
 * @param  { Array } items
 * @param  { String } tag
 * @return { String }
 */
function getUniqueCombination( element, items, tag ) {
  let combinations = getCombinations( items, 3 ),
    firstUnique = getFirstUnique( element, combinations );

  if( firstUnique ) {
    return firstUnique;
  }

  if( tag ) {
    combinations = combinations.map( combination => tag + combination );
    firstUnique = getFirstUnique( element, combinations );

    if( firstUnique ) {
      return firstUnique;
    }
  }

  return null;
}

/**
 * Returns a uniqueSelector based on the passed options
 * @param  { DOM } element
 * @param  { Array } options
 * @return { String }
 */
function getUniqueSelector( element, selectorTypes, attributesToIgnore, excludeRegex ) {
  let foundSelector;

  const elementSelectors = getAllSelectors( element, selectorTypes, attributesToIgnore );

  if( excludeRegex && excludeRegex instanceof RegExp ) {
    elementSelectors.ID = excludeRegex.test( elementSelectors.ID ) ? null : elementSelectors.ID;
    elementSelectors.Class = elementSelectors.Class.filter( className => !excludeRegex.test( className ) );
  }

  for( let selectorType of selectorTypes ) {
    const { ID, Tag, Class : Classes, Attributes, NthChild, } = elementSelectors;
    switch ( selectorType ) {
    case 'ID' :
      if ( Boolean( ID ) && testUniqueness( element, ID ) ) {
        return ID;
      }
      break;

    case 'Tag':
      if ( Boolean( Tag ) && testUniqueness( element, Tag ) ) {
        return Tag;
      }
      break;

    case 'Class':
      if ( Boolean( Classes ) && Classes.length ) {
        foundSelector = getUniqueCombination( element, Classes, Tag );
        if (foundSelector) {
          return foundSelector;
        }
      }
      break;

    case 'Attributes':
      if ( Boolean( Attributes ) && Attributes.length ) {
        foundSelector = getUniqueCombination( element, Attributes, Tag );
        if ( foundSelector ) {
          return foundSelector;
        }
      }
      break;

    case 'NthChild':
      if ( NthChild ) {
        return NthChild;
      }
    }
  }
  return '*';
}

/**
 * Generate unique CSS selector for given DOM element
 *
 * @param {Element} el
 * @return {String}
 * @api private
 */

export function unique( el, options={} ) {
  const {
    selectorTypes = ['ID', 'Class', 'Tag', 'NthChild',],
    attributesToIgnore = ['id', 'class', 'length',],
    excludeRegex = null,
  } = options;
  const allSelectors = [];
  const parents = getParents( el );

  for( let elem of parents ) {
    const selector = getUniqueSelector( elem, selectorTypes, attributesToIgnore, excludeRegex );
    if( selector ) {
      allSelectors.push( selector );
    }
  }

  const selectors = [];
  for( let it of allSelectors ) {
    selectors.unshift( it );
    const selector = selectors.join( ' > ' );
    if( isUnique( el, selector ) ) {
      return selector;
    }
  }

  return null;
}
