/**
 * Removes whitespace only from between nodes of an XML document.
 *
 * Also removes any leading or trailing whitespace, that is, whitespace before the first < or after the last >.
 * Presumes XML is well-formed and is demarcated by < and > characters.  If you pass partial XML nodes then
 * you may experience data loss. But you wouldn't do that now would you. No. No you would not.
 *
 * Created by Adrian Parker on 3/10/14.
 *
 */
module.exports = {
	gobble: function (xml) {
		var outXml = '',
			lastGreaterThanIndex = -1,
			firstGreaterThanIndex = -1,
			subsequentLessThanIndex = -1,
			trimmedGap = 0,
			possibleWhitespace = '';

		// remove any leading or trailing chars indiscriminately
		xml = String(xml).substring(xml.indexOf('<'));
		lastGreaterThanIndex = xml.lastIndexOf('>');
		if (lastGreaterThanIndex > -1) {
			xml = xml.substring(0, lastGreaterThanIndex) + '>';
		}

		// walk the remainder of the text,
		// find the chars between each > and <,
		// examine for whitespace and gobble if so
		firstGreaterThanIndex = getLeft(xml);
		subsequentLessThanIndex = getRight(xml, firstGreaterThanIndex);
		while (firstGreaterThanIndex > -1 && subsequentLessThanIndex > -1 && firstGreaterThanIndex < subsequentLessThanIndex) {
			trimmedGap = 0;
			possibleWhitespace = xml.substring(firstGreaterThanIndex + 1, subsequentLessThanIndex);
			if (possibleWhitespace.trim() === '') {
				xml = xml.substring(0, firstGreaterThanIndex + 1) + xml.substring(subsequentLessThanIndex);
				trimmedGap = subsequentLessThanIndex - (firstGreaterThanIndex + 1);
			}
			outXml += xml.substring(0, subsequentLessThanIndex - trimmedGap);
			xml = xml.substring(subsequentLessThanIndex - trimmedGap);
			firstGreaterThanIndex = getLeft(xml);
			subsequentLessThanIndex = getRight(xml, firstGreaterThanIndex);
		}

		function getLeft(xml) {
			return String(xml).indexOf('>');
		}

		function getRight(xml, endLeft) {
			return String(xml).substring(endLeft).indexOf('<') + endLeft;
		}

		return outXml + xml;
	}
}
