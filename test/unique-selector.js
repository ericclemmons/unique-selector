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
      'BODY',
    'HTML > BODY > DIV#fixture':
      '#fixture',
    'HTML > BODY > DIV#fixture > H3 > SMALL':
      '#fixture>H3:nth-child(1)>SMALL:nth-child(1)',
    'HTML > BODY > DIV#fixture > UL#nav > LI.item:nth-child(2)':
      '#nav>LI.item.nav.selected:nth-child(2)',
    'HTML > BODY > DIV#fixture > UL#nav > LI.item > UL#nested > LI.child > IMG':
      '#nested>LI.child:nth-child(1)>IMG:nth-child(1)'
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

  describe('with symmetrical dom structures', function () {
    var childs = document.querySelectorAll('.symmetrical .child')
    var a = childs[0]
    var b = childs[1]
    it('should work', function () {
      var res = document.querySelector(unique(a))
      assert(res === a, 'not a')
      
      var res = document.querySelector(unique(b))
      assert(res === b, 'not b')
    })
  })
});
