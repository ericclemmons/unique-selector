/**
 * Returns the Tag of the element
 * @param  { Object } element
 * @return { String }
 */
export function getID( el )
{
  const id = el.getAttribute( 'id' );

  if( id !== null && id !== '')
  {
    // if the ID starts with a number or contains ":" selecting with a hash will cause a DOMException
    return id.match(/(?:^\d|:)/) ? `[id="${id}"]` : '#' + id;
  }
  return null;
}
