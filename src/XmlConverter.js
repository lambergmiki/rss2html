import convert from "xml-js";

export class XmlConverter {
  /** These two methods were at first one function, doing two separate things.
   * The function did have an appropriate name (fetchXmlConvertToJsObject) but
   * splitting them up allows for conversion without a URL, as well.
   * This made more sense to me.
   */
  async fetchRss(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const xmlData = await response.text(); // text() is called to read the body stream as text, returns a promise that resolves with a String representation of the XML

      return xmlData;
    } catch (error) {
      console.error(error.message);
    }
  }

  convertXmlToJsObject(xmlData) {
    /** XML string is converted into a compact JavaScript object for easier manipulation.
     * `compact: true` gives a simplified structure, and amount of spaces indicate indenting for readability.
     */
    const resJsObject = convert.xml2js(xmlData, { compact: true, spaces: 2 }); // XML string is converted into a compact JS Object for
    return resJsObject;
  }
}
