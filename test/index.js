var should = require('chai').should(),
    ixwsg = require('../index'),
    gobble = ixwsg.gobble;

describe('#gobble', function () {
    it('strips whitespace before first &lt; char', function () {
        gobble('     <xml').should.equal('<xml');
    });
    it('strips non-whitespace before first &lt; char', function () {
        gobble('  fd   <xml').should.equal('<xml');
    });
    it('strips non-whitespace after last &gt; char', function () {
        gobble('<> dh rdb 45 ').should.equal('<>');
    });
    it('strips whitespace after last &gt; char', function () {
        gobble('<xml/>               ').should.equal('<xml/>');
    });
	it('should not modify a string with no < or > characters in it', function () {
		gobble('The quick brown fox').should.equal('The quick brown fox');
	});

//	it('removes whitespace from within an XML documents nodes', function () {
//		gobble('<xml><abc>dont remove this</abc>	<def>   nor this </def>  <ghi> </ghi>	  </xml>').should.equal('<xml><abc>dont remove this</abc><def>   nor this </def><ghi></ghi></xml>');
//	});

});