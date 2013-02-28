var unique = require('unique-selector');

function assert(expr, msg) {
  if (!expr) throw new Error(msg || 'failed');
}

describe('unique-selector', function() {
  describe('with undefined', function() {
    it('should return a TypeError', function() {
      try {
        unique();
        assert(false);
      } catch(e) {
        assert(e instanceof TypeError);
      }
    });
  });

  describe('with Object', function() {
    it('should return a TypeError', function() {
      try {
        unique({});
        assert(false);
      } catch(e) {
        assert(e instanceof TypeError);
      }
    });
  });

  var selectors = {
    'HTML > BODY':
      'html>body',
    'HTML > BODY > DIV#fixture':
      '#fixture',
    'HTML > BODY > DIV#fixture > H3 > SMALL':
      '#fixture>h3>small',
    'HTML > BODY > DIV#fixture > UL#nav > LI.item:nth-child(2)':
      '#nav>li.item.selected:nth-child(2)',
    'HTML > BODY > DIV#fixture > UL#nav > LI.item > UL#nested > LI.child > IMG':
      '#nested>li.child>img[alt="Some Title"]'
  };

  for (var selector in selectors) {
    describe('with ' + selector, function() {
      var expected    = selectors[selector];
      var actual      = unique(document.querySelector(selector));

      it('should return `' + expected + '`', function() {
        assert(expected === actual, actual);
      });

      it('should have only 1 match', function() {
        assert(1 === document.querySelectorAll(selector).length);
      });
    });
  }
});
