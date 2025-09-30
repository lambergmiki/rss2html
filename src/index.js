import { XmlConverter } from "./XmlConverter.js";
import { AtomExtractor } from "./AtomExtractor.js";
import { HtmlConverter } from "./HtmlConverter.js";
import { RssExtractor } from "./RssExtractor.js";

/** I am aware I need to boil this down to a simple convertUrlToFeed()-kind-of-method via one
 * instance of a final class for a 'clean code' approach, so called "high abstraction-level code".
 * I'll get there!
 */

/** For RSS format */
(async () => {
  const url = "<rss-url>";

  const xmlConverter = new XmlConverter();
  const rssExtractor = new RssExtractor();
  const htmlConverter = new HtmlConverter();

  const xmlData = await xmlConverter.fetchRss(url);
  const jsObj = xmlConverter.convertXmlToJsObject(xmlData);
  const allEntries = rssExtractor.getAllEntries(jsObj);
  const html = htmlConverter.metadataToHtml(allEntries);

  console.log(html);
})();

/** For Atom format */
(async () => {
  const url = "<atom-url>";

  const xmlConverter = new XmlConverter();
  const atomExtractor = new AtomExtractor();
  const htmlConverter = new HtmlConverter();

  const xmlData = await xmlConverter.fetchRss(url);
  const jsObj = xmlConverter.convertXmlToJsObject(xmlData);
  const allEntries = atomExtractor.getAllEntries(jsObj);
  const html = htmlConverter.metadataToHtml(allEntries);

  console.log(html);
})();
