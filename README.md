# rss2html

[![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://github.com/lambergmiki/matgeneratorn/blob/main/LICENSE.txt)
[![Email](https://img.shields.io/badge/Email-miki@mikilamberg.me-blue?style=for-the-badge&logo=gmail&logoColor=white)](mailto:miki@mikilamberg.me)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lambergmiki)

## Generate HTML templates from RSS feeds

With the help of <a href="https://www.npmjs.com/package/xml-js">xml-js</a>, RSS-URLs are processed and transformed into RSS feeds, packaged as simple HTML, ready to be embedded on your website.

<em>Note: This project was primarily created as part of a university course assignment and is therefore a learning exercise, rather than an actual module for public use. The mandatory 'Reflection' section below is therefore written in Swedish as per the assignment. With that said, feel free to use the module as you wish.<em>

## How does it work?

```javascript
import { FinalClass } from "NameOfFinalClass";

const instanceOfFinalClass = new FinalClass();
const feedInHtml = instanceOfNameOfFinalClass.generateFeed(
  "<your-rss/atom-url-here>"
);
```

Example output

```html
<div>John Smith</div>
<div>'rss2html is the coolest module on the street - here's why</div>
<div>www.github.com/coolestnews/available/here</div>
<div>Date: 2025-09-24, time: 15:35:00</div>

<div>Dave Peterson</div>
<div>...</div>
<div>...</div>
<div>...</div>
```

## Installation

Example:

```bash
npm install rss2html
node
...
```

## How to contribute

Thanks for your interest!

Feel free to report any bugs, or request features, in the issues tab.

Do you have a great idea on how to improve the module? Fork the repository, implement your idea and open a pull request.

## License

Distributed under the MIT License. See LICENSE.txt for more information.

## Issues

Issues can be found in the issues tab of the repo, [right here](https://github.com/lambergmiki/L2-module/issues).

## Contact

Did you find bugs that are not yet listed as issues, or do you simply want a chat? E-mail me or send me a DM on LinkedIn (both can be found at the top of this README).

## (Swedish) Reflektion

#### Tabellreflektion för namnginving

| Namn                                               | Förklaring                                                                     | Reflektion och regler från Clean Code                                                                                                                                                                                                                                                       |
| -------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| grabPublished()                                    | Metodnamn i klassen AtomExtractor                                              | Har klart och tydligt en **side effect** genom att inte bara hämta published date/time, utan även formatera det. I RssExtractor hämtar den utan att formatera (ej nödvändigt) och är därför lämplig där. Samtidigt så förstör jag polymorfismen om jag skulle döpa om AtomExtractors metod. |
| grabX(), grabY(), grabZ()...                       | Metodnamn i superklassen Extractor och dess barnklasser Atom- och RssExtractor | I efterhand vet jag inte varför jag döpte metoden till "grab". Mest lämpligt är såklart "get" som är allmänt vedertaget som just en sådan här "getter". Att jag valt "grab" istället kan hinta om att datan extraheras på något annat sätt. Jag låter det stå, i alla fall.                 |
| XmlConverter, Extractor, xExtractor, HtmlConverter | Klassnamn                                                                      | placeholder                                                                                                                                                                                                                                                                                 |
| getEntries()                                       | placeholder                                                                    | **Pick one word per concept**, which I clearly didn't. When I started off, I chose "grab" for some methods, as mentioned above. Later on, you can clearly see I chose the much more reliable get. Which I obviously should have done for the others, as well.                               |

#### Kapitelreflektion kap 2

placeholder

#### Tabellreflektion för funktioner/metoder

| Metodnamn   | Kod         | Reflektion       |
| ----------- | ----------- | ---------------- |
| placeholder | placeholder | **Do One Thing** |
| placeholder | placeholder | placeholder      |
| placeholder | placeholder | placeholder      |

#### Kapitelreflektion kap 3

placeholder

#### Reflektion över egen kodkvalitet

Även om jag gick in i kursen (rättare sagt, boken, Clean Code) med viss skepsis, tycker jag att jag hittat:<br>

- vanor i mitt sätt att skriva som verkligen fått mig att ifrågasätta nämnda vanor (se reflektion rörande kapitel 2 & 3)
- nya sätt att se på kod, inte ny kod per defintion, utan nya sätt att se på problemlösning och kommunikation via kod på
