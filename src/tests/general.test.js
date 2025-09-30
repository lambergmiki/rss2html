import { expect, it, beforeAll, describe } from "vitest";
import { XmlConverter } from "../XmlConverter.js";
import { HtmlConverter } from "../HtmlConverter.js";
import { xssEscape } from "../utility/xss-escape.js";
import { AtomExtractor } from "../AtomExtractor.js";
import { RssExtractor } from "../RssExtractor.js";

let rssData;
let atomData;

beforeAll(async () => {
  const xmlConverter = new XmlConverter();
  const rssTestUrl =
    "https://rss.aftonbladet.se/rss2/small/pages/sections/senastenytt/";
  const atomTestUrl = "https://www.theverge.com/rss/tech/index.xml";

  const rssResponse = await xmlConverter.fetchRss(rssTestUrl);
  rssData = xmlConverter.convertXmlToJsObject(rssResponse);

  const atomResponse = await xmlConverter.fetchRss(atomTestUrl);
  atomData = xmlConverter.convertXmlToJsObject(atomResponse);
});

describe("Raw data to finished HTML output testing", () => {
  describe("Initial step: data check and type conversion to JS Object", () => {
    it("rssData should be an object", () => {
      expect(typeof rssData).toBe("object");
    });
    it("atomData should be an object", () => {
      expect(typeof atomData).toBe("object");
    });
  });

  /** ---------------- RSS TESTS ---------------- */
  describe("Extraction step: RSS data", () => {
    describe("Single value getters", () => {
      it("Should present a String or undefined (author)", () => {
        const rssExtractor = new RssExtractor();
        const author = rssExtractor.grabAuthor(rssData.rss.channel.item[0]);
        expect(["string", "undefined"]).toContain(typeof author);
      });

      it("Should present a String (title)", () => {
        const rssExtractor = new RssExtractor();
        const title = rssExtractor.grabTitle(rssData.rss.channel.item[0]);
        expect(typeof title).toBe("string");
      });

      it("Should present a String (link)", () => {
        const rssExtractor = new RssExtractor();
        const link = rssExtractor.grabLink(rssData.rss.channel.item[0]);
        expect(typeof link).toBe("string");
      });

      it("Should present a String (published)", () => {
        const rssExtractor = new RssExtractor();
        const published = rssExtractor.grabPublished(
          rssData.rss.channel.item[0]
        );
        expect(typeof published).toBe("string");
      });
    });

    it("Should return an array of formatted entries", () => {
      const rssExtractor = new RssExtractor();
      const entries = rssExtractor.getAllEntries(rssData);
      expect(Array.isArray(entries)).toBe(true);
      expect(entries.length).toBeGreaterThan(0);
    });
  });

  /** ---------------- ATOM TESTS ---------------- */
  describe("Extraction step: Atom data", () => {
    describe("Single value getters", () => {
      it("Should present a String (author)", () => {
        const atomExtractor = new AtomExtractor();
        const author = atomExtractor.grabAuthor(atomData.feed.entry[0]);
        expect(typeof author).toBe("string");
      });

      it("Should present a String (title)", () => {
        const atomExtractor = new AtomExtractor();
        const title = atomExtractor.grabTitle(atomData.feed.entry[0]);
        expect(typeof title).toBe("string");
      });

      it("Should present a String (link)", () => {
        const atomExtractor = new AtomExtractor();
        const link = atomExtractor.grabLink(atomData.feed.entry[0]);
        expect(typeof link).toBe("string");
      });

      it("Should present a String (published)", () => {
        const atomExtractor = new AtomExtractor();
        const published = atomExtractor.grabPublished(atomData.feed.entry[0]);
        expect(typeof published).toBe("string");
      });
    });

    it("Should return an array of formatted entries", () => {
      const atomExtractor = new AtomExtractor();
      const entries = atomExtractor.getAllEntries(atomData);
      expect(Array.isArray(entries)).toBe(true);
      expect(entries.length).toBeGreaterThan(0);
    });
  });

  /** ---------------- OTHER TESTS ---------------- */
  describe("XSS protection", () => {
    it("Should escape dangerous characters", () => {
      const unescaped = `The following characters should all be escaped: & < > " '`;
      const escaped = xssEscape(unescaped);
      expect(escaped).toBe(
        `The following characters should all be escaped: &amp; &lt; &gt; &quot; &#39;`
      );
    });
  });

  describe("Final step: HTML conversion", () => {
    it("rssData should output a HTML string", async () => {
      const htmlConverter = new HtmlConverter();
      const result = await htmlConverter.metadataToHtml(rssData);
      expect(typeof result).toBe("string");
    });

    it("atomData should output a HTML string", async () => {
      const htmlConverter = new HtmlConverter();
      const result = await htmlConverter.metadataToHtml(atomData);
      expect(typeof result).toBe("string");
    });
  });
});
