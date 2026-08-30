export type Highlight = { title: string; url: string; note: string; tag: string };

/**
 * Published pieces that carry the argument this site makes. Ordered roughly the
 * way the site presents the subject: what agentic analytics is, then the data
 * substrate it needs, then the pieces that make it work at scale.
 */
export const writing: Highlight[] = [
  {
    title: 'What Is Agentic Analytics?',
    url: 'https://www.dremio.com/blog/what-is-agentic-analytics',
    note: 'The definition, and what separates an agent answering a question from a chatbot guessing at one.',
    tag: 'Definition',
  },
  {
    title: 'The Semantic Layer: The Definitive Guide',
    url: 'https://www.dremio.com/blog/semantic-layer-the-definitive-guide',
    note: 'Why shared definitions became load bearing the moment machines started asking the questions.',
    tag: 'Semantics',
  },
  {
    title: 'Apache Polaris: The Catalog Standard for Lakehouses and AI',
    url: 'https://www.dremio.com/blog/apache-polaris-the-catalog-standard-for-lakehouses-and-ai',
    note: 'One catalog that both engines and agents resolve against, with access decided in one place.',
    tag: 'Governance',
  },
  {
    title: 'Open Source and the Data Lakehouse',
    url: 'https://www.dremio.com/blog/open-source-and-the-data-lakehouse',
    note: 'Assessing openness layer by layer, which is the test that decides whether agents can reach your data at all.',
    tag: 'Architecture',
  },
  {
    title: 'What Are Table Formats and Why Were They Needed?',
    url: 'https://www.dremio.com/blog/what-are-table-formats-and-why-were-they-needed',
    note: 'How files in object storage became tables that many readers can query at once without stepping on each other.',
    tag: 'Table formats',
  },
  {
    title: 'What Apache Iceberg Native Actually Means',
    url: 'https://www.dremio.com/blog/what-apache-iceberg-native-actually-means',
    note: 'Telling real table format support from a connector that reads and little else, which matters more once agents depend on it.',
    tag: 'Iceberg',
  },
];

export const channels = [
  {
    name: 'Dremio blog',
    url: 'https://www.dremio.com/blog/author/alex-merced/',
    description:
      'The working archive: agentic analytics, semantic layers, catalogs, and the lakehouse underneath all of it.',
    action: 'Read the archive',
  },
  {
    name: 'YouTube, data and AI',
    url: 'https://www.youtube.com/@alexmerceddata',
    description:
      'Walkthroughs and explainers covering both halves of this subject, from agent tooling to table format internals.',
    action: 'Watch',
  },
  {
    name: 'Data Lakehouse Hub',
    url: 'https://datalakehousehub.com',
    description:
      'The community hub: articles, a knowledge base, events, and a Slack where practitioners compare notes on what actually shipped.',
    action: 'Join the community',
  },
];

export const playlists = [
  {
    title: 'Lakehouse Engineering',
    url: 'https://www.youtube.com/playlist?list=PLsLAVBjQJO0qVfGet6FEQw-nZ6ygLtYuH',
    note: 'Building the substrate: table formats, catalogs, engines, and maintenance.',
  },
  {
    title: 'Data 101',
    url: 'https://www.youtube.com/playlist?list=PLsLAVBjQJO0p_4Nqz99tIjeoDYE97L0xY',
    note: 'Foundations, for anyone joining this from the AI side rather than the data side.',
  },
];

export const sisterSites = [
  {
    label: 'AgenticLakehouse.com',
    url: 'https://agenticlakehouse.com',
    note: 'Agents operating on lakehouse data, covered at greater length.',
  },
  {
    label: 'OpenLakehouse.AlexMerced.com',
    url: 'https://openlakehouse.alexmerced.com',
    note: 'The lakehouse substrate on its own terms, one entry per layer and project.',
  },
  {
    label: 'SemanticLakehouse.com',
    url: 'https://semanticlakehouse.com',
    note: 'The semantic layer, which is the contract this whole argument rests on.',
  },
  {
    label: 'OpenAgenticPlatform.com',
    url: 'https://openagenticplatform.com',
    note: 'The wider agent platform: protocols, harnesses, identity, and governance.',
  },
  {
    label: 'AlexMercedAI.com',
    url: 'https://www.alexmercedai.com',
    note: 'The AI and agent projects, including the open specs behind them.',
  },
];

export const community = [
  { label: 'Data Lakehouse Hub Slack', url: 'https://join.slack.com/t/thedatalakehousehub/shared_invite/zt-274yc8sza-mI2zhCW8LGkOh1uxuf8T5Q' },
  { label: 'Agentic Lakehouse events', url: 'https://luma.com/agenticlakehouse' },
  { label: 'Data Lakehouse Hub events', url: 'https://luma.com/DataLakehouseHub' },
  { label: 'r/datalakehouseandai', url: 'https://www.reddit.com/r/datalakehouseandai/' },
  { label: 'The podcast on Spotify', url: 'https://open.spotify.com/show/2PRDrWVpgDvKxN6n1oUsJF' },
];
