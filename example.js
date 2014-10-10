var ixwsg = require('./index'),
	gobble = ixwsg.gobble;

var xmlWithSomeWhitespace = '<a>hello</a>  \t  \r  \f  \v  \n  <b>world</b>';

console.log(gobble(xmlWithSomeWhitespace));