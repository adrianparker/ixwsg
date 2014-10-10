var should = require('chai').should(),
	ixwsg = require('../index'),
	gobble = ixwsg.gobble;

describe('#gobble', function () {
	it('strips whitespace before first < char', function () {
		gobble('     <xml').should.equal('<xml');
	});
	it('strips non-whitespace before first , char', function () {
		gobble('  fd   <xml').should.equal('<xml');
	});
	it('strips non-whitespace after last > char', function () {
		gobble('<> dh rdb 45 ').should.equal('<>');
	});
	it('strips whitespace after last > char', function () {
		gobble('<xml/>               ').should.equal('<xml/>');
	});
	it('should not modify a string with no < or > characters in it', function () {
		gobble('The quick brown fox').should.equal('The quick brown fox');
	});
	it('removes mixed tab and space whitespace', function () {
		gobble('<xml><abc>dont remove this</abc>	<def>   nor this </def>  <ghi> </ghi>	  </xml>').should.equal('<xml><abc>dont remove this</abc><def>   nor this </def><ghi></ghi></xml>');
	});
	it('removes tab only whitespace', function () {
		gobble('\t<xml>\t<a>\t<b>\t</b>\t</a><c>\t<d>\t</d></c>\t\t\t</xml>\t\t').should.equal('<xml><a><b></b></a><c><d></d></c></xml>');
	});
	it('removes line feed only whitespace', function () {
		gobble('\n<xml>\n<a>\n<b>\n</b>\n</a><c>\n<d>\n</d></c>\n\n\n</xml>\n\n').should.equal('<xml><a><b></b></a><c><d></d></c></xml>');
	});
	it('removes carriage return only whitespace', function () {
		gobble('\r<xml>\r<a>\r<b>\r</b>\r</a><c>\r<d>\r</d></c>\r\r\r</xml>\r\r').should.equal('<xml><a><b></b></a><c><d></d></c></xml>');
	});
	it('removes vertical tab only whitespace', function () {
		gobble('\v<xml>\v<a>\v<b>\v</b>\v</a><c>\v<d>\v</d></c>\v\v\v</xml>\v\v').should.equal('<xml><a><b></b></a><c><d></d></c></xml>');
	});
	it('removes form feed only whitespace', function () {
		gobble('\f<xml>\f<a>\f<b>\f</b>\f</a><c>\f<d>\f</d></c>\f\f\f</xml>\f\f').should.equal('<xml><a><b></b></a><c><d></d></c></xml>');
	});
	it('removes a mixture of whitespaces', function () {
		gobble('\f<xml>\v<a>\f<b>\r</b>\f</a><c>\f<d>\n</d></c>\f\t\n</xml>\v\f').should.equal('<xml><a><b></b></a><c><d></d></c></xml>');
	});
	it('removes a mixture of whitespaces', function () {
		gobble('\f<xml>\v<a>\f<b>\r</b>\f</a><c>\f<d>\n</d></c>\f\t\n</xml>\v\f').should.equal('<xml><a><b></b></a><c><d></d></c></xml>');
	});
	it('removes whitespace from a sample header', function () {
		var sample = '<soapenv:Header>		<serviceHeaderXxxx xmlns="http://xml.xxx.co.nz/xxxintegrationcommon/xxxServiceHeaderXxxx">			<user>    <channel>xxxx</channel>        <id idType="AccessId"/>                <subId/>                    </user>    <application>    <id/>             </application>		</serviceHeaderXxxx>	</soapenv:Header>';
		var expected = '<soapenv:Header><serviceHeaderXxxx xmlns="http://xml.xxx.co.nz/xxxintegrationcommon/xxxServiceHeaderXxxx"><user><channel>xxxx</channel><id idType="AccessId"/><subId/></user><application><id/></application></serviceHeaderXxxx></soapenv:Header>';
		gobble(sample).should.equal(expected);
	});
});