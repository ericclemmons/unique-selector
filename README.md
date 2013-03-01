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


License
-------

MIT
