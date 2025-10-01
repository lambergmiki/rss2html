import { AtomExtractor } from "./AtomExtractor.js";
import { RssExtractor } from "./RssExtractor.js";
import { xssEscape } from "./utility/xss-escape.js";

export class HtmlConverter {
  async metadataToHtml(convertedXML) {
    let htmlTemplate = "";

    if (convertedXML?.rss) {
      const extractor = new RssExtractor();
      const allEntries = extractor.getAllEntries(convertedXML);

      for (const item of allEntries) {
        htmlTemplate += `<div>${xssEscape(item?.author)}</div>`;
        htmlTemplate += `<div>${xssEscape(item?.title)}</div>`;
        htmlTemplate += `<div><a href="${xssEscape(
          item?.link
        )}">Link</a></div>`;
        htmlTemplate += `<div>${xssEscape(item?.published)}</div><br>`;
      }
    } else if (convertedXML?.feed) {
      const extractor = new AtomExtractor();
      const allEntries = extractor.getAllEntries(convertedXML);

      for (const entry of allEntries) {
        htmlTemplate += `<div>${xssEscape(entry?.author)}</div>`;
        htmlTemplate += `<div>${xssEscape(entry?.title)}</div>`;
        htmlTemplate += `<div><a href="${xssEscape(
          entry?.link
        )}">Link</a></div>`;
        htmlTemplate += `<div>${xssEscape(entry?.published)}</div><br>`;
      }
    }
    return htmlTemplate;
  }
}
