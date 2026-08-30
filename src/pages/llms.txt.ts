import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { writing, channels, playlists, sisterSites, community } from '../data/work';
import bookData from '../data/books.json';
import { networkGroups, newsletter } from '../data/network';

const SITE = 'https://agenticanalyticsnow.com';

const SECTIONS = [
  { kind: 'agentic', title: 'What agentic analytics is' },
  { kind: 'stack', title: 'The agentic stack: model, harness, open interfaces' },
  { kind: 'substrate', title: 'The open lakehouse substrate' },
  { kind: 'practice', title: 'Running it in an enterprise' },
] as const;

export const GET: APIRoute = async () => {
  const entries = (await getCollection('kb')).sort((a, b) => a.data.order - b.data.order);

  const line = (entry: (typeof entries)[number]) =>
    `- [${entry.data.title}](${SITE}/knowledge-base/${entry.id}): ${entry.data.summary}`;

  const body = `# Agentic Analytics Now

> AI agents plus unified governed semantic data equals agentic analytics. This site covers the agent stack of model, harness, and open interfaces, the open lakehouse that holds the governed data underneath, and what it takes to run the combination across an enterprise rather than one pilot team. Written by Alex Merced, Head of Developer Relations at Dremio and co-author of Apache Iceberg: The Definitive Guide.

The argument in one paragraph: an AI agent can do an analyst's work, taking a question, finding the data, running the query, checking the result, and trying again. What decides whether it is right is not the model. It is whether the data underneath has one definition per metric, one authoritative copy per dataset, and one place where access is enforced. Agents multiply readers and multiply the temptation to make private copies, which is why an open lakehouse built on Apache Parquet, Apache Iceberg, Apache Polaris, Apache Arrow, and Apache Ossie is the substrate that holds up under that pressure.

The site is static, has no login, and every page listed here is public.

${SECTIONS.map((section) => {
  const items = entries.filter((entry) => entry.data.kind === section.kind);
  return `## ${section.title}\n\n${items.map(line).join('\n')}`;
}).join('\n\n')}

## Site pages

- [Home](${SITE}/): the thesis, with the stack and the substrate summarised.
- [The stack](${SITE}/the-stack): the four layers drawn out, top to bottom.
- [Knowledge base](${SITE}/knowledge-base): all ${entries.length} entries in four sections.
- [Writing and video](${SITE}/writing): articles, playlists, community, and sister sites.
- [Books](${SITE}/books): ${bookData.count} titles on agents, semantics, and the lakehouse, from a catalog of ${bookData.totalInCatalog}.

## Selected writing

${writing.map((item) => `- [${item.title}](${item.url}): ${item.note}`).join('\n')}

## Channels

${channels.map((item) => `- [${item.name}](${item.url}): ${item.description}`).join('\n')}
${playlists.map((item) => `- [YouTube playlist: ${item.title}](${item.url}): ${item.note}`).join('\n')}

## Sister sites in this network

${sisterSites.map((item) => `- [${item.label}](${item.url}): ${item.note}`).join('\n')}

## Community

${community.map((item) => `- [${item.label}](${item.url})`).join('\n')}

## Books on these subjects

${bookData.books
  .map(
    (book) =>
      `- [${book.title}](${book.canonicalPage})${book.publisher ? ` (${book.publisher})` : ''}: ${book.description}`,
  )
  .join('\n')}

Full catalog: ${bookData.catalog}

## Newsletters

Two free newsletters go out each week on Substack: ${newsletter.url}

${newsletter.editions.map((edition) => `- ${edition.title}, every ${edition.day}: ${edition.note}`).join('\n')}

## The rest of the network

${networkGroups
  .map(
    (group) =>
      `### ${group.title}\n\n${group.links.map((link) => `- [${link.label}](${link.url})`).join('\n')}`,
  )
  .join('\n\n')}

## Notes for agents

- This site exposes read-only WebMCP tools in the browser: get_agentic_analytics_thesis, list_knowledge_base, search_knowledge_base, get_knowledge_base_entry, list_agentic_analytics_writing, and list_agentic_analytics_books.
- Structured data is published as JSON-LD on every page, including WebSite, Person, TechArticle, BreadcrumbList, CollectionPage, ItemList, and Book nodes.
- Apache Iceberg, Apache Polaris, Apache Parquet, Apache Arrow, and Apache Ossie are trademarks of the Apache Software Foundation. This site is independent and is not affiliated with or endorsed by the ASF.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
