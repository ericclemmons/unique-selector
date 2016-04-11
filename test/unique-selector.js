const jsdom = require( 'mocha-jsdom' );
const expect = require( 'chai' ).expect;
import unique from '../src';

const $ = require( 'jquery' )( require( 'jsdom' ).jsdom().defaultView );

describe( 'Unique Selector Tests', () =>
{
  jsdom( { skipWindowCheck : true } );

  it( 'ID', () =>
  {
    $( 'body' ).get( 0 ).innerHTML = ''; //Clear previous appends
    $( 'body' ).append( '<div id="so" class="test3"></div>' );
    const findNode = $( 'body' ).find( '.test3' ).get( 0 );
    const uniqueSelector = unique( findNode );
    expect( uniqueSelector ).to.equal( '#so' );
  } );

  it( 'Class', () =>
  {
    $( 'body' ).get( 0 ).innerHTML = ''; //Clear previous appends
    $( 'body' ).append( '<div class="test2"></div>' );
    const findNode = $( 'body' ).find( '.test2' ).get( 0 );
    const uniqueSelector = unique( findNode );
    expect( uniqueSelector ).to.equal( '.test2' );
  } );

  it( 'Classes', () =>
  {
    $( 'body' ).get( 0 ).innerHTML = ''; //Clear previous appends
    $( 'body' ).append( '<div class="test2"></div><div class="test2"></div>' );
    const findNode = $( 'body' ).find( '.test2' ).get( 0 );
    const uniqueSelector = unique( findNode );
    expect( uniqueSelector ).to.equal( 'body > :nth-child(1)' );
  } );


  it( 'Tag', () =>
  {
    $( 'body' ).get( 0 ).innerHTML = ''; //Clear previous appends
    $( 'body' ).append( '<div class="test2"><span></span></div><div class="test2"></div>' );
    const findNode = $( '.test2' ).find( 'span' ).get( 0 );
    const uniqueSelector = unique( findNode );
    expect( uniqueSelector ).to.equal( 'span' );
  } );


  it( 'Tag', () =>
  {
    $( 'body' ).get( 0 ).innerHTML = ''; //Clear previous appends
    $( 'body' ).append( '<div class="test5"><span></span></div><div class="test5"><span></span></div>' );
    const findNode = $( '.test5' ).find( 'span' ).get( 0 );
    const uniqueSelector = unique( findNode );
    expect( uniqueSelector ).to.equal( ':nth-child(1) > span' );
  } );

  it( 'Tag', () =>
  {
    $( 'body' ).get( 0 ).innerHTML = ''; //Clear previous appends
    $( 'body' ).append( '<div class="test5"><span><ul><li><a></a></li></ul></span></div><div class="test5"><span></span></div>' );
    const findNode = $( '.test5' ).find( 'a' ).get( 0 );
    const uniqueSelector = unique( findNode );
    expect( uniqueSelector ).to.equal( 'a' );
  } );

} );
