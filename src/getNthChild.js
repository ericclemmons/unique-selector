import { isElement } from './isElement';

/**
 * Returns the selectors based on the position of the element relative to its siblings
 * @param  { Object } element
 * @return { Array }
 */
export function getNthChild( element )
{
  let counter = 0;
  let k;
  let sibling;
  const { parentNode } = element;

  if( Boolean( parentNode ) )
  {
    const { childNodes } = parentNode;
    const len = childNodes.length;
    for ( k = 0; k < len; k++ )
    {
      sibling = childNodes[ k ];
      if( isElement( sibling ) )
      {
        counter++;
        if( sibling === element )
        {
          return `:nth-child(${counter})`;
        }
      }
    }
  }
  return null;
}
