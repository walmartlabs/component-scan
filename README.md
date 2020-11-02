***
# NOTICE:

## This repository has been archived and is not supported.

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)
***

React Component Scanner
=======================

A very simple component scanner that uses the Babel
AST to find all of the component references from a
projects JSX files.

## Installation

```
npm install component-scan
```

## Usage

```
component-scan -s src -o components.json
```

## Example usage

```
node index.js -s examples
```

## Caveats

This assumes that the client of a component doesn't rename the component.
For example, this would probably be good:

```
var Footer = require('my-footer');
...
  render() {
    return (
      <Footer />
    );
  }
```

But this:

```
var Footer = require('my-footer');
...
  render() {
    var A = Footer;
    return (
      <A />
    );
  }
```

Is going to say that you are referencing the `A` component. And this:

```
var MyNameForFooter = require('my-footer');
...
  render() {
    return (
      <MyNameForFooter />
    );
  }
```

Is going to say that you are referencing `MyNameForFooter`. So... don't do that.

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).
