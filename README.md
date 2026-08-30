# agenticanalyticsnow.com

The site makes one argument:

> AI agents + unified governed semantic data (an open lakehouse) = agentic analytics

Either half alone produces a demo. Agents without governed data are fluent and wrong at machine
speed. Governed data without agents is a well-run warehouse that still answers questions in a week.

Live at **https://agenticanalyticsnow.com**

## What is on it

| Route | What it holds |
| --- | --- |
| `/` | The thesis, with an animated equation and the stack and substrate summarised |
| `/the-stack` | The four layers drawn out: model, harness, open interfaces, governed data |
| `/knowledge-base` | 20 entries in four sections |
| `/knowledge-base/<slug>` | One entry, with primary sources, related reading, and prev/next |
| `/writing` | Articles, YouTube playlists, community, and the sister sites |
| `/books` | 37 titles filtered from the catalog, with topic filters |
| `/llms.txt` | A plain-text map of the site for language models |

## The four knowledge base sections

- **What this is** covers the definition, the shift from dashboards, and why text-to-sql stalled.
- **The agentic stack** covers the model, the harness, and the open interfaces, which fail
  differently and are usually confused for each other.
- **The data substrate** covers the open lakehouse and the five Apache projects underneath it:
  Parquet, Iceberg, Polaris, Arrow, and Ossie.
- **Running it for real** covers governance, one copy for many readers, evaluation, cost,
  portability, and the order to do the work in.

## Stack

Astro 5, no UI framework, no client-side router. Content lives in a content collection under
`src/content/kb`, typed by `src/content.config.ts`. Everything renders to static HTML at build time.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # writes dist/
npm run preview
```

## Diagrams

Three animated SVG components, all with `prefers-reduced-motion` handling:

- `EquationHero.astro` renders the thesis as three animated glyphs in a grid, so it reflows to one
  column on a phone rather than shrinking its own labels.
- `StackDiagram.astro` shows the four layers with a request travelling down and an answer coming
  back up.
- `SubstrateDiagram.astro` shows the Apache projects, with Arrow drawn as the channel beside the
  stack rather than a band, because that is what it is.

## Machine-readable surfaces

- **JSON-LD** on every page: `WebSite` and `Person` from the layout, plus `TechArticle`,
  `BreadcrumbList`, `CollectionPage`, `ItemList`, and `Book` per page.
- **`/llms.txt`** is generated from the same content collection as the pages, so it cannot drift.
- **WebMCP** read-only browser tools in `src/components/WebMCP.astro`:
  `get_agentic_analytics_thesis`, `list_knowledge_base`, `search_knowledge_base`,
  `get_knowledge_base_entry`, `list_agentic_analytics_writing`, `list_agentic_analytics_books`.
- **Sitemap** at `/sitemap-index.xml` via `@astrojs/sitemap`.

## Book data

`src/data/books.json` is generated, not hand-edited. It comes from the entity layer in the
`alexmercedcom` repo:

```bash
node scripts/build-network-booklists.mjs
```

Run that from `alexmercedcom` and it rewrites the book list for every site in the network, this one
included.

## Trademarks

Apache Iceberg, Apache Polaris, Apache Parquet, Apache Arrow, and Apache Ossie are trademarks of the
Apache Software Foundation. This site is independent and is not affiliated with, endorsed by, or
sponsored by the ASF.

## License

Code is MIT. The prose in `src/content` is copyright Alex Merced.
