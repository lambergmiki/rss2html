import { XmlConverter } from "./XmlConverter.js";
import { AtomExtractor } from "./AtomExtractor.js";
import { HtmlConverter } from "./HtmlConverter.js";

// node index.js outputs an entire urls worth of entries in divs. Woohoo.
/** I am aware I need to boil this down to a simple convertUrlToFeed()-kind-of-method via one
 * instance of a final class for a 'clean code' approach, so called "high abstraction-level code".
 * I'll get there!
 */
(async () => {
  const url = "https://www.theverge.com/rss/index.xml";

  const xmlConverter = new XmlConverter();
  const atomExtractor = new AtomExtractor();
  const htmlConverter = new HtmlConverter();

  const xmlData = await xmlConverter.fetchRss(url);
  const jsObj = xmlConverter.convertXmlToJsObject(xmlData);
  const allEntries = atomExtractor.getAllEntries(jsObj);
  const html = htmlConverter.metadataToHtml(allEntries);

  console.log(html);
})();

// TODO: Scrap these as they serve no purpose?
export async function grabAllAuthors(convertedXML) {
  const entries = Object.values(convertedXML.feed.entry);
  const authorsArray = [];

  // TODO: If there is more than one author, it currently returns undefined for that entry.
  for (const entry of entries) {
    authorsArray.push(entry?.author?.name?._text);
  }

  return authorsArray;
}

export async function grabAllTitles(convertedXML) {
  const entries = Object.values(convertedXML.feed.entry);
  const titlesArray = [];

  for (const entry of entries) {
    titlesArray.push(entry?.title?._cdata);
  }
  return titlesArray;
}

export async function grabAllLinks(convertedXML) {
  const entries = Object.values(convertedXML.feed.entry);
  const linksArray = [];

  for (const entry of entries) {
    linksArray.push(entry?.link?._attributes?.href);
  }

  return linksArray;
}

export async function grabAllPublished(convertedXML) {
  const entries = Object.values(convertedXML.feed.entry);
  const publishedArray = [];

  for (const entry of entries) {
    publishedArray.push(entry?.published._text.split("T"));
  }
  return publishedArray;
}
