/**
 * Returns the Tag of the element
 * @param  { Object } element
 * @return { String }
 */
export function getID( el )
{
  const id = el.getAttribute( 'id' );

  if( id !== null && id !== '' && !/^\d/.test( id ) )
  {
    return `#${id}`;
  }
  return null;
}
