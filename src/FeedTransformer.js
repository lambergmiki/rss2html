import { AtomExtractor } from "./AtomExtractor.js";
import { RssExtractor } from "./RssExtractor.js";
import { xssEscape } from "./utility/xss-escape.js";

export class FeedTransformer {
	/**
	 * Transforms a parsed feed into HTML and a structured array. Refactored.
	 *
	 * @param {Object} convertedXML - Parsed feed object, either RSS or Atom
	 * @returns {Object} - An object containing a HTML string (as before refactor), and an array of the feed with the following data structure:
	 *       - author: {string}
	 *       - title: {string}
	 *       - link: {string}
	 *       - published: {string}
	 */
	async convertToFeedOutput(convertedXML) {
		let htmlTemplate = "";
		let allEntries = [];

		// Choose extractor based on feed format
		if (convertedXML?.rss) {
			const extractor = new RssExtractor();
			allEntries = extractor.getAllEntries(convertedXML);
		} else if (convertedXML?.feed) {
			const extractor = new AtomExtractor();
			allEntries = extractor.getAllEntries(convertedXML);
		} else {
			return { htmlOutput: "", arrayOutput: [] };
		}

		// Loop over each entry and build the HTML template
		for (const entry of allEntries) {
			htmlTemplate += `<div>${xssEscape(entry.author)}</div>`;
			htmlTemplate += `<div>${xssEscape(entry.title)}</div>`;
			htmlTemplate += `<div><a href="${xssEscape(entry.link)}">Link</a></div>`;
			htmlTemplate += `<div>${xssEscape(entry.published)}</div><br>`;
		}

		return {
			htmlOutput: htmlTemplate,
			arrayOutput: allEntries,
		};
	}
}
