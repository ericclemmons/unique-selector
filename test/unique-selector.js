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

  it( 'ID', () =>
  {
    $( 'body' ).get( 0 ).innerHTML = ''; //Clear previous appends
    $( 'body' ).append( '<div id="1so" class="test3"></div>' );
    const findNode = $( 'body' ).find( '.test3' ).get( 0 );
    const uniqueSelector = unique( findNode );
    expect( uniqueSelector ).to.equal( '[id="1so"]' );
  } );

  it( 'ID', () =>
  {
    $( 'body' ).get( 0 ).innerHTML = ''; //Clear previous appends
    $( 'body' ).append( '<div id="api:key" class="test3"></div>' );
    const findNode = $( 'body' ).find( '.test3' ).get( 0 );
    const uniqueSelector = unique( findNode );
    expect( uniqueSelector ).to.equal( '[id="api:key"]' );
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

  it( 'Classes multiple', () =>
  {
    $( 'body' ).get( 0 ).innerHTML = ''; //Clear previous appends
    $( 'body' ).append( '<div class="test2 ca cb cc cd cx"></div><div class="test2 ca cb cc cd ce"></div><div class="test2 ca cb cc cd ce"></div><div class="test2 ca cb cd ce cf cx"></div>' );
    const findNode = $( 'body' ).find( '.test2' ).get( 0 );
    const uniqueSelector = unique( findNode );
    expect( uniqueSelector ).to.equal( '.cc.cx' );
  } );

  it( 'Classes with newline', () =>
  {
    $( 'body' ).get( 0 ).innerHTML = ''; //Clear previous appends
    $( 'body' ).append( '<div class="test2\n ca\n cb\n cc\n cd\n cx"></div><div class="test2\n ca\n cb\n cc\n cd\n ce"></div><div class="test2\n ca\n cb\n cc\n cd\n ce"></div><div class="test2\n ca\n cb\n cd\n ce\n cf\n cx"></div>' );
    const findNode = $( 'body' ).find( '.test2' ).get( 0 );
    const uniqueSelector = unique( findNode );
    expect( uniqueSelector ).to.equal( '.cc.cx' );
  } );

  it( 'Classes with invalid name', () =>
  {
    $( 'body' ).get( 0 ).innerHTML = ''; //Clear previous appends
    $( 'body' ).append( '<div class="test2 ca=1 cb cc cd cx"></div><div class="test2 ca=1 cb cc cd ce"></div><div class="test2 ca=1 cb cc cd cz"></div><div class="test2 ca=1 cb cd ce cf cx"></div>' );
    const findNode = $( 'body' ).find( '.test2' ).get( 0 );
    const uniqueSelector = unique( findNode );
    expect( uniqueSelector ).to.equal( '.cc.cx' );
  } );

  it( 'Classes with invalid name', () =>
  {
    $( 'body' ).get( 0 ).innerHTML = ''; //Clear previous appends
    $( 'body' ).append( "<div class='test2 ca{}1 cb cc cd cx'></div><div class='test2 ca{}1 cb cc cd ce'></div><div class='test2 ca{}1 cb cc cd cz'></div><div class='test2 ca=1 cb cd ce cf cx'></div>" );
    const findNode = $( 'body' ).find( '.test2' ).get( 0 );
    const uniqueSelector = unique( findNode );
    expect( uniqueSelector ).to.equal( '.cc.cx' );
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

  it( 'Attributes', () =>
  {
    $( 'body' ).get( 0 ).innerHTML = ''; //Clear previous appends
    $( 'body' ).append( '<div class="test5" test="5"></div>' );
    const findNode = $( '.test5' ).get( 0 );
    const uniqueSelector = unique( findNode, { selectorTypes : ['Attributes'] });
    expect( uniqueSelector ).to.equal( '[test="5"]' );
  } );

  it( 'ID with exclude regex option', () =>
  {
    $( 'body' ).get( 0 ).innerHTML = ''; //Clear previous appends
    $( 'body' ).append( '<div id="xyz" class="abc test"></div>' );
    const findNode = $( 'body' ).find( '.test' ).get( 0 );
    const options = { excludeRegex : RegExp( 'xyz|abc' ) };
    const uniqueSelector = unique( findNode, options );
    expect( uniqueSelector ).to.equal( '.test' );
  } );

} );
