import { XmlConverter } from "./XmlConverter.js";

export class Extractor extends XmlConverter {
  grabAuthor(entry) {
    throw new Error("grabAuthor must be implemented in subclass");
  }

  grabTitle(entry) {
    throw new Error("grabTitle must be implemented in subclass");
  }

  grabLink(entry) {
    throw new Error("grabLink must be implemented in subclass");
  }

  grabPublished(entry) {
    throw new Error("grabPublished must be implemented in subclass");
  }

  getAllEntries(convertedXML) {
    const entries = this.getEntries(convertedXML);
    let allEntries = [];

    for (const entry of entries) {
      allEntries.push({
        author: this.grabAuthor(entry),
        title: this.grabTitle(entry),
        link: this.grabLink(entry),
        published: this.grabPublished(entry),
      });
    }
    return allEntries;
  }

  // Helper function NECESSARY for correct extraction of data (RSS/Atom)
  getEntries() {
    throw new Error("getEntries() must be implemented in subclass");
  }
}
