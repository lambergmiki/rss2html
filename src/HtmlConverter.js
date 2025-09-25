export class HtmlConverter {
  metadataToHtml(allEntries) {
    let htmlTemplate = "";

    for (const entry of allEntries) {
      htmlTemplate += `<div>${entry.author}</div>`;
      htmlTemplate += `<div>${entry.title}</div>`;
      htmlTemplate += `<div>${entry.link}</div>`;
      htmlTemplate += `<div>${entry.published}</div><br>`;
    }

    return htmlTemplate;
  }
}
