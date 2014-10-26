var unique = require('unique-selector');

function assert(expr, msg) {
  if (!expr) throw new Error(typeof msg === undefined ? 'failed' : msg);
}

describe('unique-selector', function() {
  describe('with undefined', function() {
    it('should return a TypeError', function() {
      try {
        unique();
        assert(false);
      } catch (e) {
        assert(e instanceof TypeError);
      }
    });
  });

  describe('with Object', function() {
    it('should return a TypeError', function() {
      try {
        unique({});
        assert(false);
      } catch (e) {
        assert(e instanceof TypeError);
      }
    });
  });

  var selectors = {
    // Selector: expected
    'HTML > BODY': 'html > body',
    'HTML > BODY > DIV#fixture': '#fixture',
    'HTML > BODY > DIV#fixture > H3 > SMALL': '#fixture > h3 > small',
    'HTML > BODY > DIV#fixture > UL#nav > LI:nth-child(1)': '#nav > li.first.item',
    'HTML > BODY > DIV#fixture > UL#nav > LI:nth-child(2)': '#nav > li.collapsed.item:nth-child(2)',
    'HTML > BODY > DIV#fixture > UL#nav > LI:nth-child(3)': '#nav > li.last.collapsed.item',
    'HTML > BODY > DIV#fixture > UL#nav > LI.item > UL#nested > LI.child > IMG': '#nested > li.child > img[alt="Some Title"]',
    'HTML > BODY > DIV#fixture > FORM > SELECT > OPTION[selected]': '#fixture > form > select[name="state"] > option[value="TX"]',
    'HTML > BODY > DIV#fixture > FORM > P > LABEL > INPUT[checked]': '#fixture > form > p > label > input[name="computer"][value="1"]',
    'HTML > BODY > DIV#fixture > DIV.classnames.with.extra.space > SPAN': '#fixture > div.classnames.with.extra.space > span'
  };

  for (selector in selectors) {
    describe('with ' + selector, function() {
      var expected  = selectors[selector];
      var match     = selector ? document.querySelector(selector): undefined;
      var matches   = selector ? document.querySelectorAll(selector) : undefined;
      var actual    = match ? unique(match) : undefined;

      it('should have only 1 match', function() {
        assert(1 === matches.length, matches.length + ' matches');
      });

      it('should return `' + expected + '`', function() {
        assert(expected === actual, actual);
      });
    });
  }
});
