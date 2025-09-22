import convert from "xml-js";

export async function fetchRssConvertToJsonString(url) {
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
 * Third and now functional draft of a function that retrieves all values of each key specified (author) in feed provided as argument.
 * @param {Object} convertedXML - Parsed XML feed converted into a JS object.
 * @returns {Array<string>} An array of author names.
 * */
export async function grabAllAuthors(convertedXML) {
  // Get all entries
  const entries = Object.values(convertedXML.feed.entry);
  const authorsArray = [];

  // Loop over each entry, push the names to an empty array
  for (const entry of entries) {
    authorsArray.push(entry?.author?.name?._text);
  }

  return authorsArray;
}

export async function grabAuthor(convertedXML) {
  return convertedXML.feed.entry[0].author.name._text;
}

export async function grabTitle(convertedXML) {
  return convertedXML.feed.entry[0].title._cdata;
}

export async function grabAllTitles(convertedXML) {
  const entries = Object.values(convertedXML.feed.entry);
  const titlesArray = [];

  for (const entry of entries) {
    titlesArray.push(entry?.title?._cdata);
  }
  return titlesArray;
}

export async function grabLink(convertedXML) {
  return convertedXML.feed.entry[0].link._attributes.href;
}

export async function grabAllLinks(convertedXML) {
  const entries = Object.values(convertedXML.feed.entry);
  const linksArray = [];

  for (const entry of entries) {
    linksArray.push(entry?.link?._attributes?.href);
  }
  return linksArray;
}

/** Format: [ '2025-09-23', '01:52:08-04:00' ], 01:52:08 local time, -04:00 is offset from UTC, so
 * 05:52:08 UTC */
export async function grabPublished(convertedXML) {
  const formattedPublished =
    convertedXML.feed.entry[0].published._text.split("T");
  return `Date: ${formattedPublished[0]}, time: ${formattedPublished[1]}`;
}

export async function grabAllPublished(convertedXML) {
  const entries = Object.values(convertedXML.feed.entry);
  const publishedArray = [];

  for (const entry of entries) {
    publishedArray.push(entry?.published._text.split("T"));
  }
  return publishedArray;
}

export function escapeHtmlByReplacingCharacters(str) {
  // Force to string to avoid errors
  str = String(str);

  const escapedCharactersTable = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  /** Return result based on regex literal...
   * /.../ -> regex literal
   * [...] -> a character class (match any of these chars)
   * Character "g" stands for global, so it finds all matches, not just the first one
   *
   * When replace() is called with a function, the function is invoked once for each match.
   * The first (and only in this case) arg, 'match' is the actual matched substring from the regex literal.
   * The 'match' is used as a key to get the replacement value from the object escapedCharactersTable.
   */
  return str.replace(/[&<>"']/g, function (match) {
    return escapedCharactersTable[match];
  });
}

// TODO: Rss-parser, Atom-parser, Html-converter as classes?

export async function metadataToHtml(convertedXML) {
  const author = await grabAuthor(convertedXML);
  const title = await grabTitle(convertedXML);
  const link = await grabLink(convertedXML);
  const published = await grabPublished(convertedXML);

  return `
  <div>${author}</div>
  <div>${title}</div>
  <div>${link}</div>
  <div>${published}</div>
  `;
}
