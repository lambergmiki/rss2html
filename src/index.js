import convert from "xml-js";

export async function fetchXmlConvertToJsObject(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    // Reads the body stream as text, returns a promise that resolves with a String representation of the XML
    const xmlData = await response.text();

    // XML string is converted (with options for better readability) to a JavaScript object for easier manipulation.
    const jsObject = convert.xml2js(xmlData, { compact: true, spaces: 2 });

    return jsObject;
  } catch (error) {
    console.error(error.message);
  }
}

export async function grabAllAuthors(convertedXML) {
  const entries = Object.values(convertedXML.feed.entry);
  const authorsArray = [];

  // TODO: If there is more than one author, it currently returns undefined for that entry.
  for (const entry of entries) {
    authorsArray.push(entry?.author?.name?._text);
  }

  return authorsArray;
}

export async function grabAuthor(entry) {
  return entry?.author?.name?._text;
}

export async function grabTitle(entry) {
  return entry?.title?._cdata;
}

export async function grabLink(entry) {
  return entry?.link?._attributes?.href;
}

export async function grabPublished(entry) {
  const formattedPublished = entry?.published?._text.split("T");
  return `Date: ${formattedPublished[0]}, time: ${formattedPublished[1]}`;
}

export async function grabAllTitles(convertedXML) {
  const entries = Object.values(convertedXML.feed.entry);
  const titlesArray = [];

  for (const entry of entries) {
    titlesArray.push(entry?.title?._cdata);
  }
  return titlesArray;
}

export async function grabAllLinks(convertedXML) {
  const entries = Object.values(convertedXML.feed.entry);
  const linksArray = [];

  for (const entry of entries) {
    linksArray.push(entry?.link?._attributes?.href);
  }

  return linksArray;
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
  const entries = convertedXML.feed.entry;
  let allEntries = [];

  for (const entry of entries) {
    allEntries.push({
      author: await grabAuthor(entry),
      title: await grabTitle(entry),
      link: await grabLink(entry),
      published: await grabPublished(entry),
    });
  }
  return allEntries;
}

export async function metadataToHtml(convertedXML) {
  const allEntries = await getAllEntries(convertedXML);
  let htmlTemplate = "";
  for (const entry of allEntries) {
    htmlTemplate += `<div>${entry.author}</div>`;
    htmlTemplate += `<div>${entry.title}</div>`;
    htmlTemplate += `<div>${entry.link}</div>`;
    htmlTemplate += `<div>${entry.published}</div>`;
    htmlTemplate += `<br>`;
  }

  return htmlTemplate;
}
