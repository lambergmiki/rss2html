import { AtomExtractor } from "./AtomExtractor.js";
// import { RssExtractor } from "./RssExtractor.js"; // TODO: not yet implemented beceause metadataToHtml() only supports Atom syntax.
import { xssEscape } from "./utility/xss-escape.js";

export class HtmlConverter {
  async metadataToHtml(convertedXML) {
    // TODO: need an if-block that checks for which type of data between applying Rss/Atom extraction.
    const extractor = new AtomExtractor();
    const allEntries = await extractor.getAllEntries(convertedXML);

    let htmlTemplate = "";
    for (const entry of allEntries) {
      htmlTemplate += `<div>${xssEscape(entry.author)}</div>`;
      htmlTemplate += `<div>${xssEscape(entry.title)}</div>`;
      htmlTemplate += `<div>${xssEscape(entry.link)}</div>`;
      htmlTemplate += `<div>${xssEscape(entry.published)}</div>`;
      htmlTemplate += `<br>`;
    }

    return htmlTemplate;
  }
}
