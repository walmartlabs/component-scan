var assert = require('assert');
var findComponents = require('../src/scanner');
var findComponentsBatch = require('../src/batch');

describe('Scanner', function() {
  describe('simple', function () {
    it('should find three components', function (done) {
      findComponents('examples/simple.jsx', function(components) {
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
        assert.equal(6, components[0].startLine);
        assert.equal(6, components[1].startLine);
        assert.equal(7, components[0].endLine);
        assert.equal(6, components[1].endLine);
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
