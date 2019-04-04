/**
 * Returns the Attribute selectors of the element
 * @param  { DOM Element } element
 * @param  { Array } array of attributes to ignore
 * @return { Array }
 */
export function getAttributes( el, attributesToIgnore = ['id', 'class', 'length'] )
{
  const { attributes } = el;
  const attrs = [ ...attributes ];

  return attrs.reduce( ( sum, next ) =>
  {
    if ( ! ( attributesToIgnore.indexOf( next.nodeName ) > -1 ) )
    {
      sum.push( `[${next.nodeName}="${next.value}"]` );
    }
    return sum;
  }, [] );
}
