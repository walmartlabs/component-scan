***
# NOTICE:

## This repository has been archived and is not supported.

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)
***
NOTICE: SUPPORT FOR THIS PROJECT HAS ENDED 

This projected was owned and maintained by Walmart. This project has reached its end of life and Walmart no longer supports this project.

We will no longer be monitoring the issues for this project or reviewing pull requests. You are free to continue using this project under the license terms or forks of this project at your own risk. This project is no longer subject to Walmart's bug bounty program or other security monitoring.


## Actions you can take

We recommend you take the following action:

  * Review any configuration files used for build automation and make appropriate updates to remove or replace this project
  * Notify other members of your team and/or organization of this change
  * Notify your security team to help you evaluate alternative options

## Forking and transition of ownership

For [security reasons](https://www.theregister.co.uk/2018/11/26/npm_repo_bitcoin_stealer/), Walmart does not transfer the ownership of our primary repos on Github or other platforms to other individuals/organizations. Further, we do not transfer ownership of packages for public package management systems.

If you would like to fork this package and continue development, you should choose a new name for the project and create your own packages, build automation, etc.

Please review the licensing terms of this project, which continue to be in effect even after decommission.

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
