ixwsg
=====

Intra-XML White Space Gobbler - library to remove all "whitespace only" gaps between nodes of XML marked up text.

## Installation

  npm install ixwsg --save

## Usage

  var   ixwsg = require('./index'),
        gobble = ixwsg.gobble;

  var   xmlWithSomeWhitespace = '<a>hello</a>  \t  \r  \f  \v  \n  <b>world</b>';

  console.log(gobble(xmlWithSomeWhitespace));

## Tests

  npm test

## Release History

* 0.1.0 Initial release