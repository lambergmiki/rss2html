# rss2html

[![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://github.com/lambergmiki/matgeneratorn/blob/main/LICENSE.txt)
[![Email](https://img.shields.io/badge/Email-miki@mikilamberg.me-blue?style=for-the-badge&logo=gmail&logoColor=white)](mailto:miki@mikilamberg.me)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lambergmiki)

## Generate HTML templates from RSS feeds

With the help of <a href="https://www.npmjs.com/package/xml-js">xml-js</a>, RSS-URLs are processed and transformed into RSS feeds, packaged as simple HTML, ready to be embedded on your website.

_Note: This project was primarily created as part of a university course assignment and is therefore a learning exercise, rather than an actual module for public use. With that said, feel free to use the module as you wish._

## How does it work?

TODO: Complete use case example for Atom and RSS feeds

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

TODO: Complete installation instructions

Example:

```bash
npm install rss2html
node index.js
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
