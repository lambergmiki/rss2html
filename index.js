import { XmlConverter } from "./src/XmlConverter.js";
import { HtmlConverter } from "./src/HtmlConverter.js";

export async function convertRssToHtml(url) {
  const xmlConverter = new XmlConverter();
  const htmlConverter = new HtmlConverter();

  const xmlData = await xmlConverter.fetchRss(url);
  const jsObj = xmlConverter.convertXmlToJsObject(xmlData);
  return await htmlConverter.metadataToHtml(jsObj);
}
