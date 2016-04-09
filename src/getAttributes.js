/**
 * Returns the Attribute selectors of the element
 * @param  { DOM Element } element
 * @param  { Array } array of attributes to ignore
 * @return { Array }
 */
export function getAttributes( el, attributesToIgnore = ['id', 'class', 'length'] )
{
  const { attributes } = el;
  const attributeKeys = Object.keys( attributes );

  return attributeKeys.reduce( ( sum, next ) =>
  {
    if ( ! ( this.attributesToIgnore.indexOf( next ) > -1 ) )
    {
      sum.push( `[${next}=${attributes[ next ]}]` );
    }
    return sum;
  }, [] );
}
