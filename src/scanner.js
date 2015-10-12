var babel = require('babel');
var LineByLineReader = require('line-by-line');

function Scanner(callback) {
  this.inTag = false;
  this.inClosingTag = false;
  this.tagName = null;
  this.locStart = null;
  this.firstToken = false;
  this.inEndTag = false;
  this.extendName = false;
  this.lastToken = null;
  this.tagStack = [];
  this.callback = callback;
}

Scanner.EVENT_COMPONENT = 'COMPONENT';
Scanner.EVENT_END = 'END';

Scanner.prototype.isInTag = function() {
  return this.inTag;
}

Scanner.prototype.process = function(tok) {
  if(tok.type.label === 'jsxTagStart') {
    this.inTag = true;
    this.inClosingTag = false;
    this.tagName = null;
    this.locStart = tok.loc.start.line;
    this.firstToken = true;
    this.inEndTag = false;
    this.extendName = false;
  } else if(tok.type.label === 'jsxTagEnd') {
    this.inTag = false;
    if(this.inClosingTag) {
      if(this.inEndTag) {
        var curTag = this.tagStack.pop();
        this.callback(Scanner.EVENT_COMPONENT, {
          component: curTag.name,
          startLine: curTag.start,
          endLine: tok.loc.start.line
        });
      } else {
        this.callback(Scanner.EVENT_COMPONENT, {
          component: this.tagName,
          startLine: this.locStart,
          endLine: tok.loc.start.line
        });
      }
      if(this.tagStack.length === 0) {
        this.callback(Scanner.EVENT_END, null);
      }
    } else {
      this.tagStack.push({
        name: this.tagName,
        start: this.locStart
      });
    }
  } else if(tok.type.label === 'jsxName') {
    this.firstToken = false;
    if(this.inTag && this.tagName === null) {
      this.tagName = tok.value;
    }
    if(this.extendName) {
      this.tagName += '.' + tok.value;
      this.extendName = false;
    }
  } else if(tok.type.label === '/') {
    if(this.firstToken) {
      this.inEndTag = true;
    }
    this.inClosingTag = true;
  } else if(tok.type.label === '.') {
    if(this.inTag && this.lastToken.type.label === 'jsxName') {
      this.extendName = true;
    } else {
      this.extendName = false;
    }
  } else {
    this.firstToken = false;
  }
  this.lastToken = tok;
}

var _getCodeLines = function(fname, done) {
  var lr = new LineByLineReader(fname);

  var lines = [];
  /* istanbul ignore next */
  lr.on('error', function(err) {
    /* istanbul ignore next */
    done([]);
  });

  lr.on('line', function(line) {
    lines.push(line);
  });

  lr.on('end', function() {
    done(lines);
  });
}

module.exports = function(fname, done) {
  _getCodeLines(fname, function(lines) {
    var out = babel.transformFileSync(fname);

    var components = [];
    var scanStack = [];
    var callback = function(event, data) {
      if(event === Scanner.EVENT_COMPONENT) {
        data.snippet = lines.slice(data.startLine - 1, data.endLine).join("\n");
        components.push(data);
      }
      if(event === Scanner.EVENT_END) {
        if(scanStack.length > 1) {
          scanStack.pop();
        }
      }
    }
    scanStack.push(new Scanner(callback));

    for(var t in out.ast.tokens) {
      var tok = out.ast.tokens[t];

      if(tok.type.label === 'jsxTagStart') {
        if(scanStack[scanStack.length-1].isInTag()) {
          scanStack.push(new Scanner(callback));
        }
      }

      scanStack[scanStack.length-1].process(tok);
    }

    components = components.sort(function(a,b) {
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
