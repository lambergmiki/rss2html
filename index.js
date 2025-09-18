// const convert = require('xml-js'); // The XML converter of choice for this module
import convert from "xml-js";
import util from "util";

async function fetchRssConvertToJsonString(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const xmlData = await response.text(); // text() is called to read the body stream as text, returns a promise that resolves with a String representation of the XML

    /** XML string is converted into a compact JSON string for readability
     * `compact: true` gives a simplified structure, and amount of spaces indicates indenting in the JSON output
     */
    const resJsObject = convert.xml2js(xmlData, { compact: true, spaces: 2 }); // XML string is converted into a compact JSON string for readability

    // debugging purposes only, used to inspect the large JS objects (depth: null to recurse the max amount of times possible, colors for easier reading)
    console.log(util.inspect(resJsObject, { depth: Infinity, colors: true }));

    return resJsObject;
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * Preliminary table for Atom terms
 * <feed> <- root element
 * <entry> <- entry/item
 * <author> <- author of entry
 * <title> <- title of entry
 * <link> <- link of entry
 * <published> <- published date of entry
 * <summary> <- summary/description of entry
 * <content> <- actual content of entry
 */
// mappingTableAtom = [
//     "entry": "",
//     "author": "resJsObject.entry.author.name._text", // TODO: value to be extracted from _text
//     "title": "resJsObject.entry.title._cdata", // TODO: value to be extracted from _cdata
//     "link": "resJsObject.entry.link._attributes.href", // TODO: value to be extracted from href
//     "published": "resJsObject.entry.published._text", // TODO: value to be extracted from _text
//     "summary": "resJsObject.entry.summary._cdata", // TODO: value to be extracted from _cdata
//     "content": "resJsObject.entry.content._cdata" // TODO: value to be extracted from _cdata, however there might be a lot of white space, \n and \t to get rid of here
// ]

/** Preliminary table for RSS terms
 * <rss><channel> <- root element
 * <item> <- item/entry
 * title <- title of item
 * link <- link of item
 * description <- description/summary of item
 * pubDate <- pubDate/published of item
 * author <- isn't included by default
 */
// mappingTableRss = [
//     channel: "",
//     item: "",
//     title: "",
//     link: "",
//     description: "",
//     pubDate: "",
// ]

/**
 * First draft of a for-loop whose purpose is to grab every title of each entry in that particular feed
 * */
async function grabTitle(feed) {
  for (const [key, value] of Object.entries(convertedXML)) {
    console.log(`${key}: ${value}`);
  }
}
