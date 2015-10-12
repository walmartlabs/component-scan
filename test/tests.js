var assert = require('assert');
var findComponents = require('../src/scanner');

describe('Scanner', function() {
  describe('simple', function () {
    it('should find three components', function () {
      var components = findComponents('examples/simple.jsx');
      assert.equal(3, components.length);
      assert.equal('Button.State', components[0].component);
      assert.equal('Label', components[1].component);
      assert.equal('div', components[2].component);
      assert.equal(7, components[0].startLine);
      assert.equal(8, components[1].startLine);
      assert.equal(6, components[2].startLine);
      assert.equal(10, components[0].endLine);
      assert.equal(8, components[1].endLine);
      assert.equal(11, components[2].endLine);
    });
  });

  describe('nested', function () {
    it('should find two components', function () {
      var components = findComponents('examples/nested.jsx');
      assert.equal(2, components.length);
      assert.equal('Foo', components[0].component);
      assert.equal('Nested', components[1].component);
      assert.equal(6, components[0].startLine);
      assert.equal(6, components[1].startLine);
      assert.equal(7, components[0].endLine);
      assert.equal(6, components[1].endLine);
    });
  });
});
