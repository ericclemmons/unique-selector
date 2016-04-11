/**
 * Get class names for an element
 *
 * @pararm { Element } el
 * @return { Array }
 */
export function getClasses( el )
{
  let classNames;

  try
  {
    classNames = el.classList.toString().split( ' ' );
  }
  catch ( e )
  {
    if( !el.hasAttribute( 'class' ) )
    {
      return [];
    }

    let className = el.getAttribute( 'class' );

    // remove duplicate and leading/trailing whitespaces
    className = className.trim().replace( /\s+/g, ' ' );

    // split into separate classnames
    classNames = className.split( ' ' );
  }

  return classNames;
}

/**
 * Returns the Class selectors of the element
 * @param  { Object } element
 * @return { Array }
 */
export function getClassSelectors( el )
{
  const classList = getClasses( el ).filter( Boolean );
  return classList.map( cl => `.${cl}` );
}
