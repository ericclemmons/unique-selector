unique-selector
===============

[![Build Status](https://travis-ci.org/ericclemmons/unique-selector.png)](https://travis-ci.org/ericclemmons/unique-selector)
[![CocoaPods](https://img.shields.io/cocoapods/l/AFNetworking.svg)]()
[![semantic-versioning](https://img.shields.io/badge/semantic%20-versioning-green.svg)]()

Given a DOM node, return a unique CSS selector matching only that element.
This is particularly useful when tracking in custom variables in analytics:


    document.addEventListener('click', function(event) {
        var selector = unique(event.target);

        _gaq.push(['_trackEvent', 'Engagement', 'Click', selector]);
    }, false);


Installation
------------

    component install ericclemmons/unique-selector


Tests
-----

    $ npm run test


Releases
--------
- v0.1.0

    - Big refactor/write using es6
    - More test + Change the test script
    - Scripts to compile
    - Generate the smallest possible selector e.g. `:nth-child(1)` instead of `body > :nth-child(1)`
  

- v0.0.4

    - Handle extra whitespace in `className` ([#9](https://github.com/ericclemmons/unique-selector/pull/9))

- v0.0.3

    - Add support for various `<form>` elements ([#2](https://github.com/ericclemmons/unique-selector/issues/2))

- v0.0.2

    - Fix bug with `nth-child` calculation

- v0.0.1

    - Initial release



License
-------

MIT


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/ericclemmons/unique-selector/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

