/**
 * Removes whitespace only from between nodes of an XML document.
 *
 * Also removes any leading or trailing whitespace, that is, whitespace before the first < or after the last >.
 * Presumes XML is well-formed and is demarcated by < and > characters.  If you pass partial XML nodes then
 * you may experience data loss. But you wouldn't do that now would you.
 *
 * Created by Adrian Parker on 3/10/14.
 *
 *
 */
module.exports = {
    gobble: function (xml) {
		var debugCtr = 0;
        // remove any leading or trailing chars indiscriminately
		console.log(++debugCtr+' '+xml);
        xml = String(xml).substring(xml.indexOf('<'));
		console.log(++debugCtr+' '+xml);
		var l1 = xml.lastIndexOf('>');
		if(l1 > -1) {
        	xml = xml.substring(0, l1)+'>';
		}
		console.log(++debugCtr+' '+xml);
        //walk the remainder, find the chars between each > and <
        var endLeft = getLeft(xml);
        var beginRight = getRight(xml, endLeft);
        while (endLeft > -1 && beginRight > -1 && endLeft < beginRight) {
            var possibleWS = xml.substring(endLeft, beginRight);
            if (possibleWS.trim() === '') {
                xml = xml.substring(0, endLeft) + xml.substring(beginRight);
				console.log(++debugCtr+' '+xml);
            }
            endLeft = getLeft(xml);
            beginRight = getRight(xml, endLeft);
        }

        function getLeft(xml) {
            return String(xml).indexOf('>');
        }

        function getRight(xml, endLeft) {
            return String(xml).substring(endLeft).indexOf('<') + endLeft;
        }

        return xml;
    }
}
