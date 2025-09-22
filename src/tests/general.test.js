import { expect, it, beforeAll } from "vitest";
import {
  fetchRssConvertToJsonString,
  grabAuthor,
  grabTitle,
  grabPublished,
  grabLink,
  escapeHtmlByReplacingCharacters,
} from "../../index.js";

let rssData;

// Run initial fetch once before all tests to provide test data
beforeAll(async () => {
  rssData = await fetchRssConvertToJsonString(
    "https://www.theverge.com/rss/index.xml"
  );
});

it("RSS-URL is parsed as a JavaScript object", async () => {
  expect(typeof rssData).toBe("object");
});

it("Should present a String", async () => {
  const author = await grabAuthor(rssData);
  console.log(author);
  expect(typeof author).toBe("string");
});

it("Should present a String", async () => {
  const title = await grabTitle(rssData);
  console.log(title);
  expect(typeof title).toBe("string");
});

it("Should present a String", async () => {
  const link = await grabLink(rssData);
  console.log(link);
  expect(typeof link).toBe("string");
});

it("Should present a String", async () => {
  const published = await grabPublished(rssData);
  console.log(published);
  expect(typeof published).toBe("string");
});

it("Should present a String with escaped characters if present", () => {
  const cleanedData = escapeHtmlByReplacingCharacters(">hello");
  console.log(cleanedData);
  expect(typeof cleanedData).toBe("string");
});
