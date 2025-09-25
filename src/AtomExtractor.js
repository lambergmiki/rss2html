import { Extractor } from "./Extractor.js";

export class AtomExtractor extends Extractor {
  getEntries(convertedXML) {
    return convertedXML.feed.entry;
  }

  grabAuthor(entry) {
    return entry?.author?.name?._text;
  }

  grabTitle(entry) {
    return entry?.title?._cdata;
  }

  grabLink(entry) {
    return entry?.link?._attributes?.href;
  }

  grabPublished(entry) {
    const formattedPublished = entry?.published?._text.split("T");
    return `Date: ${formattedPublished[0]}, time: ${formattedPublished[1]}`;
  }
}
