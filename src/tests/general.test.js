import { expect, it, beforeAll, describe } from "vitest";
import {
  fetchRssConvertToJsonString,
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
  rssData = await fetchRssConvertToJsonString(
    "https://www.theverge.com/rss/tech/index.xml"
  );
});

it("RSS-URL is a JavaScript object", async () => {
  console.log(rssData.feed.entry[0]);
  expect(typeof rssData).toBe("object");
});

it("Should present a String (author)", async () => {
  const author = await grabAuthor(rssData);
  expect(typeof author).toBe("string");
});

it("Should present a String (title)", async () => {
  const title = await grabTitle(rssData);
  expect(typeof title).toBe("string");
});

it("Should present a String (link)", async () => {
  const link = await grabLink(rssData);
  expect(typeof link).toBe("string");
});

it("Should present a String (published)", async () => {
  const published = await grabPublished(rssData);
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
  console.log(titlesArray);
  expect(Array.isArray(titlesArray)).toBe(true);
  expect(titlesArray.length).toBeGreaterThan(0);
});

it("Should present an array of links that is not empty", async () => {
  const linksArray = await grabAllLinks(rssData);
  console.log(linksArray);
  expect(Array.isArray(linksArray)).toBe(true);
  expect(linksArray.length).toBeGreaterThan(0);
});

it("Should present an array of 'published dates' that is not empty", async () => {
  const publishedArray = await grabAllPublished(rssData);
  console.log(publishedArray);
  expect(Array.isArray(publishedArray)).toBe(true);
  expect(publishedArray.length).toBeGreaterThan(0);
});

// it("Should present an array with correctly built entries", async () => {
//   const allEntriesFormattedInTest = await getAllEntries(rssData);
//   expect(Array.isArray(allEntriesFormattedInTest)).toBe(true);
//   expect(allEntriesFormattedInTest.length).toBeGreaterThan(0);
// });

it("Should present html template", async () => {
  const author = await grabAuthor(rssData);
  const title = await grabTitle(rssData);
  const link = await grabLink(rssData);
  const published = await grabPublished(rssData);

  const expectedHtml = `
  <div>${author}</div>
  <div>${title}</div>
  <div>${link}</div>
  <div>${published}</div>
  `;

  const result = await metadataToHtml(rssData);
  expect(result).toBe(expectedHtml);
});
