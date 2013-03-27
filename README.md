unique-selector
===============

[![Build Status](https://travis-ci.org/ericclemmons/unique-selector.png)](https://travis-ci.org/ericclemmons/unique-selector)

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

    $ npm install
    $ make
    $ open test/index.html


Releases
--------

- v0.0.3

    - Add support for various `<form>` elements ([#2](https://github.com/ericclemmons/unique-selector/issues/2))

- v0.0.2

    - Fix bug with `nth-child` calculation

- v0.0.1

    - Initial release



License
-------

MIT
