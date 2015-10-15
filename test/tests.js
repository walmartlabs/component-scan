var assert = require('assert');
var findComponents = require('../lib/scanner');
var findComponentsBatch = require('../lib/batch');

describe('Scanner', function() {
  describe('simple', function () {
    it('should find three components', function (done) {
      findComponents('examples/simple.jsx', function(components) {
        assert.equal(3, components.length);
        assert.equal('Button.State', components[0].component);
        assert.equal('button', components[0].import);
        assert.equal('Label', components[1].component);
        assert.equal('label', components[1].import);
        assert.equal('div', components[2].component);
        assert.equal(9, components[0].startLine);
        assert.equal(10, components[1].startLine);
        assert.equal(8, components[2].startLine);
        assert.equal(12, components[0].endLine);
        assert.equal(10, components[1].endLine);
        assert.equal(13, components[2].endLine);
        done();
      });
    });
  });

  describe('nested', function () {
    it('should find two components', function (done) {
      findComponents('examples/nested.jsx', function(components) {
        assert.equal(2, components.length);
        assert.equal('Foo', components[0].component);
        assert.equal('Nested', components[1].component);
        assert.equal(4, components[0].attributes.length);
        assert.equal(8, components[0].startLine);
        assert.equal(8, components[1].startLine);
        assert.equal(9, components[0].endLine);
        assert.equal(8, components[1].endLine);
        done();
      });
    });
  });

  describe('batch', function () {
    it('should find three components', function (done) {
      findComponentsBatch('examples/simple.jsx', function(components) {
        assert.equal(3, components['examples/simple.jsx'].length);
        done();
      }, function() {});
    });
  });
});
