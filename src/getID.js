/**
 * Returns the Tag of the element
 * @param  { Object } element
 * @return { String }
 */
export function getID( el )
{
  return `#${el.getAttribute( 'id' )}`;
}
