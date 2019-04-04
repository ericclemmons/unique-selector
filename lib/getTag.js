/**
 * Returns the Tag of the element
 * @param  { Object } element
 * @return { String }
 */
export function getTag( el )
{
  return el.tagName.toLowerCase().replace(/:/g, '\\:');
}
