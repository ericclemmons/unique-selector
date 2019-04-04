/**
 * Recursively combinate items.
 * @param  { Array } result
 * @param  { Array } items
 * @param  { Array } data
 * @param  { Number } start
 * @param  { Number } end
 * @param  { Number } index
 * @param  { Number } k
 */
function kCombinations( result, items, data, start, end, index, k )
{
    if( index === k )
    {
        result.push( data.slice( 0, index ).join( '' ) );
        return;
    }

    for( let i = start; i <= end && end - i + 1 >= k - index; ++i )
    {
        data[index] = items[i];
        kCombinations( result, items, data, i + 1, end, index + 1, k );
    }
}

/**
 * Returns all the possible selector combinations
 * @param  { Array } items
 * @param  { Number } k
 * @return { Array }
 */
export function getCombinations( items, k )
{
    const result = [],
          n = items.length,
          data = [];

    for( var l = 1; l <= k; ++l )
    {
        kCombinations( result, items, data, 0, n - 1, 0, l );
    }

    return result;
}
