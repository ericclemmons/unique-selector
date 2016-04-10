const jsdom = require( 'mocha-jsdom' );
const expect = require( 'chai' ).expect;
import unique from '../src';

const $ = require( 'jquery' )( require( 'jsdom' ).jsdom().defaultView );

describe( 'Unique Selector Tests', () =>
{
  jsdom( { skipWindowCheck : true } );

  it( 'Class Selector Test', () =>
  {
    $( 'body' ).append( '<div class="something">TEST</div>' );
    const findNode = $( 'body' ).find( '.something' ).get( 0 );
    const uniqueSelector = unique( findNode );
    expect( uniqueSelector ).to.equal( '.something' );
  } );

  it( 'Nth Child', () =>
  {
    $( 'body' ).append( '<div class="something">TEST</div><div class="something">TEST</div>' );
    const findNode = $( 'body' ).find( '.something' ).get( 0 );
    const uniqueSelector = unique( findNode );
    expect( uniqueSelector ).to.equal( 'body > :nth-child(1)' );
  } );

  it( 'Attributes', () =>
  {
    $( 'body' ).append( '<div class="something">TEST</div><div class="else" lol="5">TEST</div>' );
    const findNode = $( 'body' ).find( '.else' ).get( 0 );
    const uniqueSelector = unique( findNode, { selectorTypes : [ 'Attributes' ] } );
    expect( uniqueSelector ).to.equal( '[lol="5"]' );
  } );

  it( 'Nth Child', () =>
  {
    $( 'body' ).append( '<div class="something2"></div><div class="something2"></div>' );
    const findNode = $( 'body' ).find( '.something2' ).get( 0 );
    const uniqueSelector = unique( findNode );
    expect( uniqueSelector ).to.equal( 'body > :nth-child(1)' );
  } );

} );
