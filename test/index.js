/**
 * Created by 732774 on 3/10/14.
 */
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

});