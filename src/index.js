/**
 * Expose `unique`
 */

import { getID } from './getID';
import { getClassSelectors } from './getClasses';
import { getCombinations } from './getCombinations';
import { getAttributes } from './getAttributes';
import { getNthChild } from './getNthChild';
import { getTag } from './getTag';
import { isUnique } from './isUnique';
import { getParents } from './getParents';


/**
 * Returns all the selectors of the elmenet
 * @param  { Object } element
 * @return { Object }
 */
function getAllSelectors( el, selectors, attributesToIgnore )
{
  const funcs =
    {
      'Tag'        : getTag,
      'NthChild'   : getNthChild,
      'Attributes' : elem => getAttributes( elem, attributesToIgnore ),
      'Class'      : getClassSelectors,
      'ID'         : getID,
    };

  return selectors.reduce( ( res, next ) =>
  {
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
function testUniqueness( element, selector )
{
  const { parentNode } = element;
  const elements = parentNode.querySelectorAll( selector );
  return elements.length === 1 && elements[ 0 ] === element;
}

/**
 * Checks all the possible selectors of an element to find one unique and return it
 * @param  { Object } element
 * @param  { Array } items
 * @param  { String } tag
 * @return { String }
 */
function getUniqueCombination( element, items, tag )
{
  const combinations = getCombinations( items, 3 );
  const uniqCombinations = combinations.filter( testUniqueness.bind( this, element ) );
  if( uniqCombinations.length ) return uniqCombinations[ 0 ];

  if( Boolean( tag ) )
  {
      const combinations = items.map( item => tag + item );
      const uniqCombinations = combinations.filter( testUniqueness.bind( this, element ) );
      if( uniqCombinations.length ) return uniqCombinations[ 0 ];
  }

  return null;
}

/**
 * Returns a uniqueSelector based on the passed options
 * @param  { DOM } element
 * @param  { Array } options
 * @return { String }
 */
function getUniqueSelector( element, selectorTypes, attributesToIgnore )
{
  let foundSelector;

  const elementSelectors = getAllSelectors( element, selectorTypes, attributesToIgnore );

  for( let selectorType of selectorTypes )
  {
      const { ID, Tag, Class : Classes, Attributes, NthChild } = elementSelectors;
      switch ( selectorType )
      {
        case 'ID' :
        if ( Boolean( ID ) && testUniqueness( element, ID ) )
        {
            return ID;
        }
        break;

        case 'Tag':
          if ( Boolean( Tag ) && testUniqueness( element, Tag ) )
          {
              return Tag;
          }
          break;

        case 'Class':
          if ( Boolean( Classes ) && Classes.length )
          {
            foundSelector = getUniqueCombination( element, Classes, Tag );
            if (foundSelector) {
              return foundSelector;
            }
          }
          break;

        case 'Attributes':
          if ( Boolean( Attributes ) && Attributes.length )
          {
            foundSelector = getUniqueCombination( element, Attributes, Tag );
            if ( foundSelector )
            {
              return foundSelector;
            }
          }
          break;

        case 'NthChild':
          if ( Boolean( NthChild ) )
          {
            return NthChild
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

export default function unique( el, options={} )
{
  const { selectorTypes=[ 'ID', 'Class', 'Tag', 'NthChild' ], attributesToIgnore= ['id', 'class', 'length'] } = options;
  const allSelectors = [];
  const parents = getParents( el );

  for( let elem of parents )
  {
    const selector = getUniqueSelector( elem, selectorTypes, attributesToIgnore );
    if( Boolean( selector ) )
    {
      allSelectors.push( selector );
    }
  }

  const selectors = [];
  for( let it of allSelectors )
  {
    selectors.unshift( it );
    const selector = selectors.join( ' > ' );
    if( isUnique( el, selector ) )
    {
      return selector;
    }
  }

  return null;
}
