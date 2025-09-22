import { expect, it, beforeAll, describe } from "vitest";
import {
  fetchRssConvertToJsonString,
  grabAuthor,
  grabAllAuthors,
  grabTitle,
  grabPublished,
  grabLink,
  escapeHtmlByReplacingCharacters,
  metadataToHtml,
} from "../index.js";

let rssData;

// Run initial fetch once before all tests to provide test data
beforeAll(async () => {
  rssData = await fetchRssConvertToJsonString(
    "https://www.theverge.com/rss/index.xml"
  );
});

it("RSS-URL is a JavaScript object", async () => {
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
  console.log(escapedCharacters);
  expect(escapedCharacters).toMatch("&lt" && "&gt");
});

it("Should present an array of names that is not empty", async () => {
  const authorsArray = await grabAllAuthors(rssData);
  expect(Array.isArray(authorsArray)).toBe(true);
  expect(authorsArray.length).toBeGreaterThan(0);
});

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
