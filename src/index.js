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

/** Preliminary table for Atom terms
 * author: "entry.author.name._text"
 * title: "entry.title._cdata"
 * link: "entry.link._attributes.href"
 * published: "entry.published._text"
 */

/** Preliminary table for RSS terms
 * author: ** not always present **
 * title: "item.title._cdata",
 * link: "item.link._text",
 * pubDate: "item.pubDate._text",
 */

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

export async function getAllEntries(convertedXML) {
  const entries = Object.values(convertedXML.feed.entry);
  let allEntries = [];

  for (const entry of entries) {
    allEntries.push({
      author: grabAuthor(entry),
      titles: grabTitle(entry),
      links: grabLink(entry),
      published: grabPublished(entry),
    });
    return allEntries;
  }
}

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
