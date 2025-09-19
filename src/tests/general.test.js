import { expect, it, beforeAll } from "vitest";
import {
  fetchRssConvertToJsonString,
  grabAuthor,
  grabTitle,
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
