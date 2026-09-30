/**
 * The Apache projects under agentic analytics, framed for analytics leaders.
 * Full definitions live with the network's glossary owners (general lakehouse:
 * opendatalakehouse.com; Iceberg-specific: iceberglakehouse.com). Ossie has no
 * owner page yet, so its entry stays on this site.
 */
export type ApacheProject = { project: string; settles: string; whyLeaders: string; url: string };

export const apacheProjects: ApacheProject[] = [
  {
    project: 'Apache Parquet',
    settles: 'Columnar files on object storage, with statistics that let narrow queries skip most of the data.',
    whyLeaders: 'Agent questions become many small queries; Parquet statistics are why each one reads a fraction of the data and costs less.',
    url: 'https://opendatalakehouse.com/kb/parquet-format/',
  },
  {
    project: 'Apache Iceberg',
    settles: 'Files behaving as tables: atomic commits, schema evolution, snapshot history.',
    whyLeaders: 'One copy of each table that every engine and agent can share, with history that lets you reproduce the answer an agent gave.',
    url: 'https://iceberglakehouse.com/apache-iceberg/',
  },
  {
    project: 'Apache Polaris',
    settles: 'The catalog: what tables exist, who may read them, and short-lived credentials scoped to those files.',
    whyLeaders: 'One place where access is decided, so an agent cannot reach data its user cannot, whichever tool it runs in.',
    url: 'https://opendatalakehouse.com/kb/polaris-catalog/',
  },
  {
    project: 'Apache Arrow',
    settles: 'The in-memory and on-the-wire shape of results, so per-call transport overhead stays small.',
    whyLeaders: 'Results move between engine, tool, and agent without conversion, which keeps latency low when agents ask many questions.',
    url: 'https://opendatalakehouse.com/kb/apache-arrow/',
  },
  {
    project: 'Apache Ossie',
    settles: 'A vendor-neutral standard for semantic metadata, so metric definitions are portable. Incubating.',
    whyLeaders: 'Metric definitions you can take with you, so the semantic layer does not become the next lock-in.',
    url: '/knowledge-base/apache-ossie/',
  },
];
