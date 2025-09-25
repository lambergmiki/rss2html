import { Extractor } from "./Extractor.js";

export class RssConverter extends Extractor {
  getEntries(convertedXML) {
    return convertedXML.rss.channel.item;
  }

  grabAuthor(item) {
    return item?.author?.name?._text;
  }

  grabTitle(item) {
    return item?.title?._cdata;
  }

  grabLink(item) {
    return item?.link?._text;
  }

  grabPublished(item) {
    return item?.pubDate?._text;
  }
}
