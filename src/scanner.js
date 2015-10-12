var babel = require('babel');

module.exports = function(fname) {
  var out = babel.transformFileSync(fname);

  var tagStack = [];
  var state = {
    inTag: false,
    inClosingTag: false,
    tagName: null,
    locStart: null,
    firstToken: false,
    inEndTag: false,
    extendName: false,
    lastToken: null
  };
  var components = [];
  for(var t in out.ast.tokens) {
    var tok = out.ast.tokens[t];
    if(tok.type.label === 'jsxTagStart') {
      state.inTag = true;
      state.inClosingTag = false;
      state.tagName = null;
      state.locStart = tok.loc.start.line;
      state.firstToken = true;
      state.inEndTag = false;
      state.extendName = false;
    } else if(tok.type.label === 'jsxTagEnd') {
      state.inTag = false;
      if(state.inClosingTag) {
        if(state.inEndTag) {
          var curTag = tagStack.pop();
          components.push({
            component: curTag.name,
            startLine: curTag.start,
            endLine: tok.loc.start.line
          });
        } else {
          components.push({
            component: state.tagName,
            startLine: state.locStart,
            endLine: tok.loc.start.line
          });
        }
      } else {
        tagStack.push({
          name: state.tagName,
          start: state.locStart
        });
      }
    } else if(tok.type.label === 'jsxName') {
      state.firstToken = false;
      if(state.inTag && state.tagName === null) {
        state.tagName = tok.value;
      }
      if(state.extendName) {
        state.tagName += '.' + tok.value;
        state.extendName = false;
      }
    } else if(tok.type.label === '/') {
      if(state.firstToken) {
        state.inEndTag = true;
      }
      state.inClosingTag = true;
    } else if(tok.type.label === '.') {
      if(state.inTag && state.lastToken.type.label === 'jsxName') {
        state.extendName = true;
      } else {
        state.extendName = false;
      }
    } else {
      state.firstToken = false;
    }
    state.lastToken = tok;
  }

  components = components.sort(function(a,b) {
    if(a.component < b.component) {
      return -1;
    } else if(a.component > b.component) {
      return 1;
    } else if(a.startLine < b.startLine) {
      return -1;
    } else if(a.startLine < b.startLine) {
      return 1;
    } else {
      return 0;
    }
  })

  return components;
}
