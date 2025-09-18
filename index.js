const convert = require('xml-js'); // The XML converter of choice for this module

async function fetchRssConvertToJsonString(url) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        const xmlData = await response.text() // text() is called to read the body stream as text, returns a promise that resolves with a String representation of the XML

        /** XML string is converted into a compact JSON string for readability
         * `compact: true` gives a simplified structure, and amount of spaces indicates indenting in the JSON output
         */
        const resJson = convert.xml2json(xmlData, { compact: true, spaces: 2 }) // XML string is converted into a compact JSON string for readability

        console.log(resJson)

        return resJson
    } catch (error) {
        console.error(error.message)
    }
}

fetchRssConvertToJsonString("https://www.theverge.com/rss/tech/index.xml")