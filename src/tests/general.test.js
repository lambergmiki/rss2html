import { expect, it, beforeAll, describe } from "vitest";
import {
  fetchXmlConvertToJsObject,
  grabAuthor,
  grabAllAuthors,
  grabTitle,
  grabAllTitles,
  grabPublished,
  grabAllPublished,
  grabLink,
  grabAllLinks,
  escapeHtmlByReplacingCharacters,
  metadataToHtml,
  getAllEntries,
} from "../index.js";

let rssData;

// Run initial fetch once before all tests to provide test data
beforeAll(async () => {
  // rss-url: https://rss.aftonbladet.se/rss2/small/pages/sections/senastenytt/
  // atom-url: https://www.theverge.com/rss/tech/index.xml
  rssData = await fetchXmlConvertToJsObject(
    "https://www.theverge.com/rss/tech/index.xml"
  );
});

it("RSS-URL is a JavaScript object", async () => {
  expect(typeof rssData).toBe("object");
});

it("Should present a String (author)", async () => {
  const author = await grabAuthor(rssData.feed.entry[0]);
  expect(typeof author).toBe("string");
});

it("Should present a String (title)", async () => {
  const title = await grabTitle(rssData.feed.entry[0]);
  expect(typeof title).toBe("string");
});

it("Should present a String (link)", async () => {
  const link = await grabLink(rssData.feed.entry[0]);
  expect(typeof link).toBe("string");
});

it("Should present a String (published)", async () => {
  const published = await grabPublished(rssData.feed.entry[0]);
  expect(typeof published).toBe("string");
});

it("Should present a String with escaped characters if present", () => {
  const escapedCharacters = escapeHtmlByReplacingCharacters(
    "<testing-escaping-characters>"
  );
  expect(escapedCharacters).toMatch("&lt" && "&gt");
});

it("Should present an array of authors that is not empty", async () => {
  const authorsArray = await grabAllAuthors(rssData);
  expect(Array.isArray(authorsArray)).toBe(true);
  expect(authorsArray.length).toBeGreaterThan(0);
});

it("Should present an array of titles that is not empty", async () => {
  const titlesArray = await grabAllTitles(rssData);
  // TODO: Prints HTML entities (e.g. #&8217; instead of '), need to be decoded before output
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
  const allEntriesFormattedInTest = await getAllEntries(rssData);
  console.log(allEntriesFormattedInTest);
  expect(Array.isArray(allEntriesFormattedInTest)).toBe(true);
  expect(allEntriesFormattedInTest.length).toBeGreaterThan(0);
});

it("Should present html template", async () => {
  const author = await grabAuthor(rssData.feed.entry[0]);
  const title = await grabTitle(rssData.feed.entry[0]);
  const link = await grabLink(rssData.feed.entry[0]);
  const published = await grabPublished(rssData.feed.entry[0]);

  const expectedHtml = `
  <div>${author}</div>
  <div>${title}</div>
  <div>${link}</div>
  <div>${published}</div>
  `;

  const result = await metadataToHtml(rssData);
  expect(result).toBe(expectedHtml);
});
