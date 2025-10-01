import { XmlConverter } from "./src/XmlConverter.js";
import { AtomExtractor } from "./src/AtomExtractor.js";
import { HtmlConverter } from "./src/HtmlConverter.js";
import { RssExtractor } from "./src/RssExtractor.js";

export async function convertRssToHtml(url) {
  const xmlConverter = new XmlConverter();
  const rssExtractor = new RssExtractor();
  const htmlConverter = new HtmlConverter();

  const xmlData = await xmlConverter.fetchRss(url);
  const jsObj = xmlConverter.convertXmlToJsObject(xmlData);
  const allEntries = rssExtractor.getAllEntries(jsObj);

  return htmlConverter.metadataToHtml(allEntries);
}

export async function convertAtomToHtml(url) {
  const xmlConverter = new XmlConverter();
  const atomExtractor = new AtomExtractor();
  const htmlConverter = new HtmlConverter();

  const xmlData = await xmlConverter.fetchRss(url);
  const jsObj = xmlConverter.convertXmlToJsObject(xmlData);
  const allEntries = atomExtractor.getAllEntries(jsObj);

  return htmlConverter.metadataToHtml(allEntries);
}
