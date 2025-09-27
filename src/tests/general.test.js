import { expect, it, beforeAll, describe } from "vitest";
import {
  grabAllAuthors,
  grabAllTitles,
  grabAllPublished,
  grabAllLinks,
} from "../index.js";
import { XmlConverter } from "../XmlConverter.js";
import { HtmlConverter } from "../HtmlConverter.js";
import { xssEscape } from "../utility/xss-escape.js";
import { AtomExtractor } from "../AtomExtractor.js";

let rssData;

// Run initial fetch once before all tests to provide test data
beforeAll(async () => {
  const xmlConverter = new XmlConverter();
  // rss-url: https://rss.aftonbladet.se/rss2/small/pages/sections/senastenytt/
  // atom-url: https://www.theverge.com/rss/tech/index.xml
  const response = await xmlConverter.fetchRss(
    "https://www.theverge.com/rss/tech/index.xml"
  );
  rssData = xmlConverter.convertXmlToJsObject(response);
});

describe("Test if argument (URL) is a JavaScript Object", () => {
  it("Should return true", async () => {
    expect(typeof rssData).toBe("object");
  });
});

describe("Test single value extraction from getters", () => {
  it("Should present a String (author)", async () => {
    const atomExtractor = new AtomExtractor();
    const author = await atomExtractor.grabAuthor(rssData.feed.entry[0]);
    expect(typeof author).toBe("string");
  });

  it("Should present a String (title)", async () => {
    const atomExtractor = new AtomExtractor();
    const title = await atomExtractor.grabTitle(rssData.feed.entry[0]);
    expect(typeof title).toBe("string");
  });

  it("Should present a String (link)", async () => {
    const atomExtractor = new AtomExtractor();
    const link = await atomExtractor.grabLink(rssData.feed.entry[0]);
    expect(typeof link).toBe("string");
  });

  it("Should present a String (published)", async () => {
    const atomExtractor = new AtomExtractor();
    const published = await atomExtractor.grabPublished(rssData.feed.entry[0]);
    expect(typeof published).toBe("string");
  });
});

describe("Test extraction of all entries' values, <- this test block is of no use, only kept for legacy/documentation", () => {
  it("Should present an array of authors that is not empty", async () => {
    const authorsArray = await grabAllAuthors(rssData);
    expect(Array.isArray(authorsArray)).toBe(true);
    expect(authorsArray.length).toBeGreaterThan(0);
  });

  it("Should present an array of titles that is not empty", async () => {
    const titlesArray = await grabAllTitles(rssData);
    expect(Array.isArray(titlesArray)).toBe(true);
    expect(titlesArray.length).toBeGreaterThan(0);
  });

  it("Should present an array of links that is not empty", async () => {
    const linksArray = await grabAllLinks(rssData);
    expect(Array.isArray(linksArray)).toBe(true);
    expect(linksArray.length).toBeGreaterThan(0);
  });

  it("Should present an array of 'published dates' that is not empty", async () => {
    const publishedArray = await grabAllPublished(rssData);
    expect(Array.isArray(publishedArray)).toBe(true);
    expect(publishedArray.length).toBeGreaterThan(0);
  });

  it("Should present an array with correctly built entries", async () => {
    const atomExtractor = new AtomExtractor();
    const allEntriesFormattedInTest = atomExtractor.getAllEntries(rssData);
    expect(Array.isArray(allEntriesFormattedInTest)).toBe(true);
    expect(allEntriesFormattedInTest.length).toBeGreaterThan(0);
  });
});

describe("Escaping characters (XSS-protection)", () => {
  it("Should present a String with escaped characters if present", () => {
    const escapedCharacters = xssEscape("<testing-escaping-characters>");
    expect(escapedCharacters).toMatch("&lt" && "&gt");
  });
});

describe("Test if HTML output is correct based on data fed", () => {
  it("Should present a HTML template", async () => {
    const htmlConverter = new HtmlConverter();
    const result = await htmlConverter.metadataToHtml(rssData);
    expect(typeof result).toBe("string"); // TODO: Apply validation to confirm valid HTML output
  });
});
