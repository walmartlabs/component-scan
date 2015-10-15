import * as babel from 'babel';
import LineByLineReader from 'line-by-line';

let _getCodeLines = (fname, done) => {
  let lr = new LineByLineReader(fname);

  let lines = [];
  /* istanbul ignore next */
  lr.on('error', (err) => {
    /* istanbul ignore next */
    done([]);
  });

  lr.on('line', (line) => {
    lines.push(line);
  });

  lr.on('end', () => {
    done(lines);
  });
}

export default (fname, done) => {
  _getCodeLines(fname, (lines) => {
    let components = [];
    let imports = {};
    const jsxFinder = ({ Plugin, types: t }) => {
      return new Plugin("jsx-finder", {
        visitor: {
          JSXElement(node, parent) {
            let name = node.openingElement.name.name;
            let base = node.openingElement.name.name;
            if(name === undefined) {
              base = node.openingElement.name.object.name;
              name = base + '.' + node.openingElement.name.property.name;
            }
            let attributes = [];
            for(var a in node.openingElement.attributes) {
              var attr = node.openingElement.attributes[a];
              if(attr.name && attr.name.name) {
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
          ImportDeclaration(node, parent) {
            for(var s in node.specifiers) {
              let spec = node.specifiers[s];
              imports[spec.local.name] = node.source.value;
            }
          },
          CallExpression(node, parent) {
            if(node.callee.name === 'require') {
              if(parent.type === 'VariableDeclarator') {
                if(parent.id.name) {
                  imports[parent.id.name] = node.arguments[0].value;
                }
                if(parent.id.properties) {
                  for(var p in parent.id.properties) {
                    var prop = parent.id.properties[p];
                    imports[prop.key.name] = node.arguments[0].value;
                  }
                }
              }
            }
          }
        }
      });
    }

    babel.transformFileSync(fname, {
      plugins: [ jsxFinder ]
    });

    for(var c in components) {
      var comp = components[c];
      if(imports[comp.component]) {
        comp.import = imports[comp.component];
      }
      if(imports[comp.base]) {
        comp.import = imports[comp.base];
      }
    }

    components = components.sort((a,b) => {
      /* istanbul ignore next */
      if(a.component < b.component) {
        return -1;
      }
      /* istanbul ignore next */
      else if(a.component > b.component) {
        return 1;
      }
      /* istanbul ignore next */
      else if(a.startLine < b.startLine) {
        return -1;
      }
      /* istanbul ignore next */
      else if(a.startLine < b.startLine) {
        return 1;
      }
      /* istanbul ignore next */
      else {
        return 0;
      }
    })

    done(components);
  });
}
