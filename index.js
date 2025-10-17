import { XmlConverter } from "./src/XmlConverter.js";
import { FeedTransformer } from "./src/FeedTransformer.js";

export async function convertRssToHtml(url) {
	const xmlConverter = new XmlConverter();
	const feedTransformer = new FeedTransformer();

	const xmlData = await xmlConverter.fetchRss(url);
	const jsObj = xmlConverter.convertXmlToJsObject(xmlData);
	return await feedTransformer.convertToFeedOutput(jsObj);
}
