# Reflektion

### Tabellreflektion för namnginving

| Namn                                                                | Förklaring                                                                       | Reflektion och regler från Clean Code                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| grabPublished()                                                     | Metodnamn i klasserna RssExtractor och AtomExtractor (detta avser AtomExtractor) | Gör mer än bara "grab" data - hämtar published date/time **och** formaterar det. I _RssExtractor_ hämtar den utan att formatera och är därför lämplig där. I syskonmetoderna nedan _hämtas_ endast data, utan formatering, trots att alla delar prefixet `grab`. Missvisande! Jag borde rimligtvis döpa den till `grabAndFormatPublished` enligt **Use Intention-Revealing Names**, men då förstörs polymorfismen i samma veva... |
| grabX(), grabY(), grabZ()...                                        | Metodnamn i superklassen Extractor och dess barnklasser Atom- och RssExtractor   | I efterhand vet jag inte varför jag döpte metoderna till "grab". Mest lämpligt är såklart "get" som är allmänt vedertaget för just en sådan här "getter". Att jag valt "grab" istället kan hinta om att datan extraheras på något annat sätt, eller att inte bara `get` sker, för annars hade det stått `get`, eller hur? Klassiskt fall av **Pick One Word per Concept**?                                                        |
| XmlConverter, Extractor, RssExtractor, AtomExtractor, HtmlConverter | Klassnamn                                                                        | Samtliga klasser följer namnprincipen _"should have noun or noun phrase names"_ enligt **Class Names**.                                                                                                                                                                                                                                                                                                                           |
| getEntries()                                                        | Metodnamn i superklassen Extractor och dess barnklasser Atom- och RssExtractor   | **Pick One Word per Concept**, som jag bevisligen inte gjorde. När jag påbörjade modulen valde jag "grab" som verb för att extrahera viss data, och till senare metoder (t.ex. getEntries() och getAllEntries()) valde jag `get`. Se motivering i de första två raderna.                                                                                                                                                          |
| Vågar jag säga alla variabler, funktioner/metoder och klasser?      | Jag är seriös.                                                                   | **Don't Be Cute**, jag har inte varit cute.                                                                                                                                                                                                                                                                                                                                                                                       |

---

### Kapitelreflektion kap 2

Som han berör i **Use Intention-Revealing Names** så har jag i detta projekt anammat längre variabelnamn. Jag håller med om att det tar bort tolkningsutrymme och det är _bra_.

**Pick One Word per Concept** var också ett tema jag uppskattade. Precis som i detta projekt har jag tidigare hamnat i kläm genom att blanda namn för funktioner/variabler som tillhör samma "rymd", men namnen skapar då istället förvirring.

---

### Tabellreflektion för funktioner/metoder

| Metodnamn                         | Kod                                                                            | Antal rader kod (ej ws) | Reflektion                                                                                                                                                                                                                                            |
| --------------------------------- | ------------------------------------------------------------------------------ | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| grabX, grabY, grabZ...            | ![grab-methods from (Rss)Extractor classes](/images/snippet1.png)              | 10                      | **Do One Thing**, samtliga getters i Extractor-klasserna gör en enda sak och på ett så simpelt sätt som möjligt - de returnerar en viss data från det inmatade objektet. Undantaget är som nämnt grabPublished() i AtomExtractor, se tidigare tabell. |
| convertXmlToJsObject(xmlData)     | ![convertXmlToJsObject(xmlData) from XmlConverter class](/images/snippet2.png) | 3                       | **Small!** Funktionen är liten, utan krusiduller och JSDoc används som komplettering för kodförståelse.                                                                                                                                               |
| "                                 | "                                                                              | "                       | **Use Descriptive Names**, metoden gör precis vad namnet antyder - den konverterar XML till ett JavaScript-objekt. Object.                                                                                                                            |
| grabPublished(entry)              | ![grabPublished(entry) from AtomExtractor class](/images/snippet3.png)         | 3                       | **Have No Side Effects**, det finns en självklar side effect här som jag varit inne på tidigare, och det är faktumet att datan inte bara extraheras (och returneras), utan den _formateras_ också.                                                    |
| convertToFeedOutput(convertedXML) | ![convertToFeedOutput(convertedXML)](/images/snippet4.png)                     | ca 20                   | **Don't Repeat Yourself**, ~~i nuvarande skick bryter den mot DRY, skulle behöva refaktoreras eller revideras helt.~~ Refaktorerad till >10 rader färre kod och bör vara mer lättbegriplig nu.                                                        |

---

### Kapitelreflektion kap 3

Jag köper att funktioner ska vara små för både readability och understandability, därför har jag valt att, till stor del, följa den principen i denna modul. Men! Jag håller inte med om att man bör följa det regelbundet. Jag är säker på att det finns mängder av scenarion då en funktion inte bara kan, utan _bör_ vara längre än ett fåtal rader, just för att kanske undvika att hoppa fram och tillbaka mellan funktioner och filer för att förstå helhetsbilden.

Jag har aldrig gillat långa variabel/metodnamn, men när uncle Bob visade exemplet nedan...

```javascript
assertEquals(expected, actual);
assertExpextedEqualsActual(expected, actual);
```

... så köpte jag det direkt. Det finns absolut use cases för att ha långa/längre variabelnamn ibland. Det kanske är mindre elegant, men så mycket enklare för t.ex. kollegan att läsa och förstå.

Slutligen vill jag nämna att jag är glad att han tar upp att funktioner med två eller fler argument är komplexa av naturen (min anm). Många gånger har jag funderat på om det bara är jag som tycker det.

---

### Reflektion över egen kodkvalitet

Även om jag gick in i kursen (rättare sagt, boken, Clean Code) med viss skepsis, tycker jag att jag tagit med mig flera perspektiv som kommer att bidra till att jag skriver mer robust kod.<br>

- vanor i mitt sätt att skriva kod som verkligen fått mig att ifrågasätta nämnda vanor (se reflektion rörande kapitel 2 & 3)
- nya sätt att se på kod, dvs ur ett semantiskt perspektiv, men också ur ett problemlösningsperspektiv - och hur koden faktiskt kommuniceras till läsaren

Från _mitt_ perspektiv så skriver jag "helt okej" kod, tycker jag. Jag _vill_ att den ska vara enkel att läsa och förstå. Jag skriver i detta projekt mycket färre kommentarer än tidigare, och hoppas istället att koden följer tillräckligt god kvalitet för att förmedla vad som sker trots avsaknaden av kommentarer.
