unique-selector
===============

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

    $ git submodule update --init
    $ make
    $ open test/index.html


License
-------

MIT
