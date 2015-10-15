'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _babel = require('babel');

var babel = _interopRequireWildcard(_babel);

var _lineByLine = require('line-by-line');

var _lineByLine2 = _interopRequireDefault(_lineByLine);

var _getCodeLines = function _getCodeLines(fname, done) {
  var lr = new _lineByLine2['default'](fname);

  var lines = [];
  /* istanbul ignore next */
  lr.on('error', function (err) {
    /* istanbul ignore next */
    done([]);
  });

  lr.on('line', function (line) {
    lines.push(line);
  });

  lr.on('end', function () {
    done(lines);
  });
};

exports['default'] = function (fname, done) {
  _getCodeLines(fname, function (lines) {
    var components = [];
    var imports = {};
    var jsxFinder = function jsxFinder(_ref) {
      var Plugin = _ref.Plugin;
      var t = _ref.types;

      return new Plugin("jsx-finder", {
        visitor: {
          JSXElement: function JSXElement(node, parent) {
            var name = node.openingElement.name.name;
            var base = node.openingElement.name.name;
            if (name === undefined) {
              base = node.openingElement.name.object.name;
              name = base + '.' + node.openingElement.name.property.name;
            }
            var attributes = [];
            for (var a in node.openingElement.attributes) {
              var attr = node.openingElement.attributes[a];
              if (attr.name.name) {
                attributes.push(attr.name.name);
              }
            }
            components.push({
              component: name,
              base: base,
              startLine: node.loc.start.line,
              endLine: node.loc.end.line,
              attributes: attributes
            });
          },
          ImportDeclaration: function ImportDeclaration(node, parent) {
            for (var s in node.specifiers) {
              var spec = node.specifiers[s];
              imports[spec.local.name] = node.source.value;
            }
          },
          CallExpression: function CallExpression(node, parent) {
            if (node.callee.name === 'require') {
              if (parent.type === 'VariableDeclarator') {
                if (parent.id.name) {
                  imports[parent.id.name] = node.arguments[0].value;
                }
                if (parent.id.properties) {
                  for (var p in parent.id.properties) {
                    var prop = parent.id.properties[p];
                    imports[prop.key.name] = node.arguments[0].value;
                  }
                }
              }
            }
          }
        }
      });
    };

    babel.transformFileSync(fname, {
      plugins: [jsxFinder]
    });

    for (var c in components) {
      var comp = components[c];
      if (imports[comp.component]) {
        comp['import'] = imports[comp.component];
      }
      if (imports[comp.base]) {
        comp['import'] = imports[comp.base];
      }
    }

    components = components.sort(function (a, b) {
      /* istanbul ignore next */
      if (a.component < b.component) {
        return -1;
      }
      /* istanbul ignore next */
      else if (a.component > b.component) {
          return 1;
        }
        /* istanbul ignore next */
        else if (a.startLine < b.startLine) {
            return -1;
          }
          /* istanbul ignore next */
          else if (a.startLine < b.startLine) {
              return 1;
            }
            /* istanbul ignore next */
            else {
                return 0;
              }
    });

    done(components);
  });
};

module.exports = exports['default'];