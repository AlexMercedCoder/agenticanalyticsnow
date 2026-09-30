/**
 * The four analytics-leader tools (P6.10 to P6.12): the readiness
 * assessment, the use-case library, the evaluation checklist, and the 90-day
 * rollout playbook. Pages, llms.txt, WebMCP, and the Markdown downloads all
 * read from here so the content only lives in one place.
 */

const AL = 'https://agenticlakehouse.com';

export interface Link { label: string; href: string }

export const leaderTools = [
  {
    id: 'readiness',
    href: '/readiness/',
    title: 'Readiness assessment',
    short: 'Readiness',
    summary:
      'Fifteen questions on definitions, access, data quality, interfaces, and team. Scored in your browser into a maturity level with next steps for each weak area.',
  },
  {
    id: 'use-cases',
    href: '/use-cases/',
    title: 'Use-case library',
    short: 'Use cases',
    summary:
      'Finance, sales and revenue operations, supply chain, customer support, and marketing: the questions people ask, the definitions an agent needs, and the governance risks.',
  },
  {
    id: 'evaluation-checklist',
    href: '/evaluation-checklist/',
    title: 'Evaluation checklist',
    short: 'Checklist',
    summary:
      'Vendor-neutral RFP questions on semantics, governance, lock-in, accuracy, cost, and operations, with what a good answer contains. Print it or download the Markdown.',
  },
  {
    id: 'rollout-playbook',
    href: '/rollout-playbook/',
    title: '90-day rollout playbook',
    short: 'Playbook',
    summary:
      'Five phases across thirteen weeks, from picking a domain to deciding whether to expand, with owners, exit criteria, and the risks that stall each phase.',
  },
] as const;

/* ======================================================================
   P6.10 Readiness assessment
   ====================================================================== */

export interface ReadinessQuestion {
  id: string;
  text: string;
  /** Four options, scored 0 to 3 in order. */
  options: [string, string, string, string];
}

export interface ReadinessArea {
  id: string;
  title: string;
  why: string;
  questions: ReadinessQuestion[];
  /** Shown when the area scores below the "strong" threshold. */
  nextSteps: { text: string; links: Link[] }[];
}

export const readinessAreas: ReadinessArea[] = [
  {
    id: 'semantic',
    title: 'Semantic layer and definitions',
    why: 'An agent can only be as consistent as the definitions it reads. If "revenue" means three things, it will pick one without telling you.',
    questions: [
      {
        id: 'q1',
        text: 'How are your core business metrics (revenue, active customer, churn) defined today?',
        options: [
          'Inside each report or spreadsheet. The same metric is calculated differently in different places.',
          'Written up in a wiki or glossary, but each tool has its own SQL for it.',
          'Defined once in a semantic or metrics layer for some domains. Other domains still define their own.',
          'Defined once in code, under version control, and read by dashboards, notebooks, and agents alike.',
        ],
      },
      {
        id: 'q2',
        text: 'When two teams use the same word (customer, order, region) with different meanings, what happens?',
        options: [
          'Nobody notices until two numbers disagree in a meeting.',
          'Analysts who know the history sort it out informally.',
          'The conflicts are written down, and each definition has an owner.',
          'Each meaning has its own named definition, and anyone or anything querying the semantic layer sees which one it is using.',
        ],
      },
      {
        id: 'q3',
        text: 'Could a new analyst answer a routine question from the written definitions alone, without asking a colleague?',
        options: [
          'No. Most questions need knowledge that is not written down.',
          'For a handful of well-used datasets.',
          'For most questions in at least one business domain.',
          'Yes, across the domains we would put an agent in front of first.',
        ],
      },
    ],
    nextSteps: [
      {
        text: 'Pick one domain and write its most-asked metrics as code in a semantic layer, with a named owner for each. One domain done properly beats ten done loosely.',
        links: [
          { label: 'The semantic layer as an agent contract', href: '/knowledge-base/semantic-layer-as-contract/' },
          { label: 'AI semantic layer (builder view)', href: `${AL}/kb/ai-semantic-layer/` },
        ],
      },
      {
        text: 'List the words that mean different things to different teams, and give each meaning its own definition instead of one shared name.',
        links: [{ label: 'Semantic layer (builder view)', href: `${AL}/kb/semantic-layer/` }],
      },
      {
        text: 'Share with your team why schema alone does not get an agent to the right answer.',
        links: [{ label: 'Text-to-SQL and its limits', href: '/knowledge-base/text-to-sql-and-its-limits/' }],
      },
    ],
  },
  {
    id: 'governance',
    title: 'Governance and access control',
    why: 'Agents act faster and more often than people, and nobody watches each action. Access has to be enforced where the data is read, as the person asking.',
    questions: [
      {
        id: 'q4',
        text: 'How does a query tool or service get access to data today?',
        options: [
          'Shared service accounts or copied credentials with broad read access.',
          'Each tool has its own service account with role-based grants, reviewed now and then.',
          'Grants are enforced in one catalog or policy layer, but tools connect as themselves, not as the user.',
          "The user's identity is passed through the tool, and access is checked in one place with short-lived, scoped credentials.",
        ],
      },
      {
        id: 'q5',
        text: 'Are row-level and column-level rules (by region, personal data, salary) enforced where the data is read, for every engine?',
        options: [
          'No. We protect sensitive data by keeping people away from whole tables or by making filtered copies.',
          'In some engines or BI tools but not others.',
          'Centrally for most sensitive data, with known gaps.',
          'Centrally, for every engine and interface that can read the data.',
        ],
      },
      {
        id: 'q6',
        text: 'If someone asked who read a sensitive table last month, and through which tool, how long would the answer take?',
        options: [
          'We could not answer it.',
          'Days, stitching logs together from several systems.',
          'Hours, from one audit log that records the service account but not always the person.',
          'Minutes, from an audit trail that ties each query to a person and the tool acting for them.',
        ],
      },
    ],
    nextSteps: [
      {
        text: 'Design identity propagation so an agent runs as the person asking, not as a shared account. It is far easier to build before a second team depends on a service account.',
        links: [
          { label: 'Governance for agents', href: '/knowledge-base/governance-for-agents/' },
          { label: 'AI agent authorization (builder view)', href: `${AL}/kb/ai-agent-authorization/` },
        ],
      },
      {
        text: 'Move row and column rules out of individual tools and into the catalog or policy layer every engine reads through.',
        links: [
          { label: 'Row-level security', href: `${AL}/kb/row-level-security/` },
          { label: 'Column-level security', href: `${AL}/kb/column-level-security/` },
        ],
      },
      {
        text: 'Make sure the audit trail names the person behind each query, including queries an agent runs for them.',
        links: [{ label: 'Governed AI querying (builder view)', href: `${AL}/kb/governed-ai-querying/` }],
      },
    ],
  },
  {
    id: 'quality',
    title: 'Data quality and freshness',
    why: 'An agent does not know a table is three days stale unless something tells it. A confident answer from stale data is worse than no answer.',
    questions: [
      {
        id: 'q7',
        text: 'How do you learn that a key table is stale or wrong?',
        options: [
          'A business user notices.',
          'Pipeline failure alerts, but no checks on the data itself.',
          'Automated tests on important tables (nulls, row counts, freshness) with alerts.',
          'Tests, plus a published freshness and quality status that downstream tools can read before they query.',
        ],
      },
      {
        id: 'q8',
        text: 'For the datasets an agent would use first, is there a named owner and an agreed freshness target?',
        options: [
          'No.',
          'Owners are known informally.',
          'Owners are named; freshness expectations are informal.',
          'Named owners, written freshness targets, and a clear way to report a problem to them.',
        ],
      },
      {
        id: 'q9',
        text: 'How many copies of your most-used datasets exist across warehouses, marts, extracts, and BI caches?',
        options: [
          'Many, and it is not clear which one is authoritative.',
          'Several, with one understood to be authoritative.',
          'A few, with the authoritative copy recorded in a catalog.',
          'One authoritative copy in open formats that every engine reads, with derived copies tracked.',
        ],
      },
    ],
    nextSteps: [
      {
        text: 'Add freshness, row-count, and null checks to the datasets you would expose first, and publish their status where tools can read it.',
        links: [
          { label: 'Data quality framework (builder view)', href: `${AL}/kb/data-quality-framework/` },
          { label: 'Data observability (builder view)', href: `${AL}/kb/data-observability/` },
        ],
      },
      {
        text: 'Name an owner and a freshness target for each of those datasets, and tell users how to report a wrong number.',
        links: [{ label: 'Evaluation and trust', href: '/knowledge-base/evaluation-and-trust/' }],
      },
      {
        text: 'Count the copies of your most-used datasets and decide which one the agent reads. Every extra copy is another place a definition can drift.',
        links: [{ label: 'One copy, many readers', href: '/knowledge-base/one-copy-many-readers/' }],
      },
    ],
  },
  {
    id: 'interfaces',
    title: 'Open interfaces (MCP, SQL, APIs)',
    why: 'Agents reach data through interfaces. Standard ones let you change the model or the agent framework without rebuilding access and definitions.',
    questions: [
      {
        id: 'q10',
        text: 'How can software (not a person clicking) reach your governed data?',
        options: [
          "Only through the BI tool's interface or exported files.",
          'Direct database connections for a few engineering teams.',
          'Standard SQL interfaces (JDBC, ODBC, Arrow Flight) and documented APIs, governed like any other client.',
          'Standard SQL and APIs, plus an agent-facing interface such as an MCP server that exposes the semantic layer and respects the caller’s permissions.',
        ],
      },
      {
        id: 'q11',
        text: 'Can an agent discover which datasets and metrics exist, with descriptions, without someone pasting a schema into a prompt?',
        options: [
          'No.',
          'Table and column names only, from the database catalog.',
          'A searchable catalog with descriptions for the important datasets.',
          'A catalog and semantic layer reachable through an API or MCP, with descriptions, owners, and definitions.',
        ],
      },
      {
        id: 'q12',
        text: 'If you changed the model or agent framework next year, what would you have to rebuild?',
        options: [
          "Most of it. Definitions and access rules are written into prompts and one vendor's tooling.",
          "The integrations, plus definitions that live in the agent's configuration.",
          'Only the agent integration. Definitions and access live in the data platform.',
          'A configuration change. The agent reaches data through open interfaces the next framework also speaks.',
        ],
      },
    ],
    nextSteps: [
      {
        text: 'Inventory how software reaches your data today, and standardise on SQL interfaces and documented APIs that carry the caller’s identity.',
        links: [{ label: 'Open interfaces', href: '/knowledge-base/open-interfaces/' }],
      },
      {
        text: 'Expose the catalog and semantic definitions to agents through an API or an MCP server, so discovery does not depend on prompts.',
        links: [{ label: 'LLM data access (builder view)', href: `${AL}/kb/llm-data-access/` }],
      },
      {
        text: 'Run the replacement-cost exercise for each layer of the stack before a vendor decision makes it expensive.',
        links: [
          { label: 'Portability and lock-in', href: '/knowledge-base/portability-and-lock-in/' },
          { label: 'Lakehouse interoperability (builder view)', href: `${AL}/kb/lakehouse-interoperability/` },
        ],
      },
    ],
  },
  {
    id: 'team',
    title: 'Team skills and operating model',
    why: 'A production agent is a data product. Someone has to own it, measure it, and maintain the definitions it depends on.',
    questions: [
      {
        id: 'q13',
        text: 'Who would own an analytics agent in production?',
        options: [
          'No one has been named.',
          'An innovation or AI team, separate from the data platform and analytics teams.',
          'A named owner, with data platform and analytics engineering involved part time.',
          'A named owner with a standing group: data platform, analytics engineering, security, and a business domain owner.',
        ],
      },
      {
        id: 'q14',
        text: "How would you know whether an agent's answers are right?",
        options: [
          'We would rely on users to spot problems.',
          'Analysts would spot-check answers during a pilot.',
          'A set of questions with known correct answers, run before changes.',
          'A maintained question set run on every change, plus logged corrections and refusals in production that feed the definition backlog.',
        ],
      },
      {
        id: 'q15',
        text: 'How ready are your analytics and data engineering teams to maintain definitions and access policies as code?',
        options: [
          "Definitions and policies live in tools' settings screens, with little version control.",
          'Some transformation code is in version control; definitions and policies are not.',
          'Transformations and metric definitions are in version control, with review.',
          'Definitions, policies, and tests are reviewed and deployed like application code, and time is set aside to maintain them.',
        ],
      },
    ],
    nextSteps: [
      {
        text: 'Name one accountable owner and a small standing group before any pilot, and give them the first two weeks of the playbook.',
        links: [{ label: '90-day rollout playbook', href: '/rollout-playbook/' }],
      },
      {
        text: 'Collect real questions with known answers before choosing a tool, and use them as your acceptance test.',
        links: [
          { label: 'Evaluation and trust', href: '/knowledge-base/evaluation-and-trust/' },
          { label: 'Trustworthy AI execution (builder view)', href: `${AL}/kb/trustworthy-ai-execution/` },
        ],
      },
      {
        text: 'Move metric definitions and access policies into version control with review, so a change to either is visible and reversible.',
        links: [{ label: 'Governance policy as code (builder view)', href: `${AL}/kb/governance-policy-as-code/` }],
      },
    ],
  },
];

export interface ReadinessLevel {
  id: string;
  name: string;
  /** Minimum overall score, as a fraction of the maximum. */
  min: number;
  summary: string;
  focus: string;
}

export const readinessLevels: ReadinessLevel[] = [
  {
    id: 'exploring',
    name: 'Exploring',
    min: 0,
    summary:
      'The data side is not yet able to back up an agent’s answers. A model evaluation now would mostly measure your definitions and access gaps.',
    focus: 'Work on definitions and access for one domain before choosing an agent product.',
  },
  {
    id: 'building',
    name: 'Building',
    min: 0.4,
    summary:
      'Some of the foundations are in place. A tightly scoped pilot in your strongest domain can teach you a lot, as long as it does not become the production design.',
    focus: 'Fix the weak areas below before a second team or a wider rollout.',
  },
  {
    id: 'ready',
    name: 'Ready',
    min: 0.65,
    summary:
      'The foundations exist for a production pilot in one domain, with real users, identity passed through, and evaluation from the first day.',
    focus: 'Run the 90-day playbook on one domain and measure against a question set.',
  },
  {
    id: 'scaling',
    name: 'Scaling',
    min: 0.85,
    summary:
      'Definitions, access, and interfaces are in good shape. The limits now are how many domains have written definitions and how much capacity the team has to maintain them.',
    focus: 'Expand by domain, not by user count, and keep the evaluation set running on every change.',
  },
];

/** An area at or below this fraction caps the overall level at Building. */
export const READINESS_WEAK_CAP = 1 / 3;
/** An area below this fraction gets its next steps listed. */
export const READINESS_STRONG = 2 / 3;

/* ======================================================================
   P6.11 Use-case library
   ====================================================================== */

export interface UseCase {
  id: string;
  title: string;
  intro: string;
  questions: string[];
  data: string[];
  definitions: string[];
  risks: string[];
  controls: string[];
  start: string;
}

export const useCases: UseCase[] = [
  {
    id: 'finance',
    title: 'Finance',
    intro:
      'Finance questions have exact answers and an audit trail behind them, which makes finance a demanding first domain and a useful test of whether definitions are really written down.',
    questions: [
      'Why did gross margin in EMEA fall compared with plan last quarter, and which product lines drove it?',
      'Which cost centers are more than 10% over budget year to date, and on which expense lines?',
      'What is days sales outstanding by region this month, and which customers moved it most?',
      'Where does recognised revenue in the ledger differ from bookings in the CRM for September? List the largest differences.',
      'If the mid tier had been priced 5% higher last quarter at the same volume, what would revenue have been?',
    ],
    data: [
      'General ledger and sub-ledgers',
      'Budget and plan versions',
      'Accounts receivable and billing',
      'CRM bookings',
      'Exchange rates',
      'Cost center and legal entity hierarchies, with effective dates',
    ],
    definitions: [
      'Revenue, kept separate as booked, billed, and recognised',
      'Gross margin: which cost lines are included',
      'Fiscal calendar and period status (open or closed)',
      'Currency conversion: which rate type and which date',
      'Days sales outstanding: formula and averaging window',
      'Cost center roll-ups as of a given date, since hierarchies change',
    ],
    risks: [
      'Material non-public figures reached before an earnings release',
      'Booked and recognised revenue mixed in one answer',
      'Open-period numbers quoted as final',
      'Payroll and compensation detail exposed through expense questions',
      'Scenario answers (the pricing question) read as actuals',
    ],
    controls: [
      'Row-level rules by legal entity and cost center, applied to the person asking',
      'Compensation columns masked for everyone outside payroll',
      'Every answer states the definition used, the period status, and the as-of time',
      'Scenario answers labelled as estimates, with their assumptions listed',
      'Read-only access; nothing the agent produces feeds external reporting without the normal review',
    ],
    start:
      'Budget-versus-actual questions for closed periods. The definitions usually exist already, the answers are checkable, and the audience is small.',
  },
  {
    id: 'sales-revenue-operations',
    title: 'Sales and revenue operations',
    intro:
      'Revenue operations teams field a steady stream of pipeline and performance questions that each take an analyst a few hours. The catch is that CRM data changes daily and definitions of stages and wins vary by team.',
    questions: [
      'Which deals in the commit category have had no logged activity in the last 14 days?',
      'How has win rate by segment changed this quarter compared with last, and where did it change most?',
      'Why is pipeline coverage for next quarter lower in the West region than in the others?',
      'Which accounts grew product usage by more than 20% but have no open expansion opportunity?',
      'What is the median sales cycle for partner-sourced deals compared with direct deals?',
    ],
    data: [
      'CRM opportunities, with stage history',
      'Activities (calls, meetings, emails logged)',
      'Accounts and contacts',
      'Product usage',
      'Quotas and territory assignments',
      'Marketing source and attribution fields',
    ],
    definitions: [
      'Pipeline stages and the criteria for entering each one',
      'Win rate: by count or by value, and which outcomes are excluded',
      'Pipeline coverage: which quarter, which stages, against which target',
      'ARR, bookings, and contract value, kept distinct',
      'Segment and territory as of a given date, since accounts move',
      'Deal source: partner, direct, or marketing, and who decides',
    ],
    risks: [
      "Reps seeing peers' quota attainment or compensation",
      'Current CRM values used for trend questions that need stage history',
      'Stale or incomplete CRM entries treated as fact',
      'Forecast figures shared outside the forecast audience',
      'An agent with write access editing opportunity records',
    ],
    controls: [
      'Row-level rules following the sales hierarchy and territory',
      'Quota and compensation fields masked outside sales leadership and finance',
      'Trend questions answered from snapshotted stage history, not current values',
      'Answers show record counts and the time of the last CRM sync',
      'Read-only access; any suggested update goes to a person to make',
    ],
    start:
      'Pipeline hygiene questions (stale deals, missing fields) for one region. Wrong answers are cheap, and the value is visible to sales managers within weeks.',
  },
  {
    id: 'supply-chain',
    title: 'Supply chain',
    intro:
      'Supply chain questions cut across purchasing, inventory, logistics, and demand systems that rarely share keys or units. That makes the definitions work harder, and it is also why an agent that gets it right saves real analyst time.',
    questions: [
      'Which items will run out within 21 days at the current rate of sale, and at which locations?',
      'Why did on-time delivery from our largest supplier fall last month?',
      'What is the landed cost difference between our two sourcing options for this part?',
      'Which distribution centers hold more than 90 days of supply for slow-moving items?',
      'How did the port delay affect order fill rate by region?',
    ],
    data: [
      'ERP inventory positions and item master',
      'Purchase orders and supplier master',
      'Shipments, advance ship notices, and logistics events',
      'Sales orders',
      'Demand forecast versions',
      'Location hierarchy',
    ],
    definitions: [
      'On-time: against the promised or the requested date, and the tolerance window',
      'Fill rate: by line, by unit, or by order',
      'Days of supply and the demand figure it divides by',
      'Landed cost: which freight, duty, and handling components are included',
      'Units of measure and the conversions between them',
      'Forecast version: which one counts as the plan',
    ],
    risks: [
      'Supplier prices and contract terms seen by people who should not see them',
      'Forecast figures presented as actuals',
      'Unit-of-measure mistakes producing answers that are off by a case pack',
      'Inventory snapshots hours old treated as live',
      'An agent placing or changing purchase orders',
    ],
    controls: [
      'Contract terms and supplier pricing restricted by column',
      'Unit conversions defined in the semantic layer, never left to the model',
      'Answers state the snapshot time of the inventory data',
      'Forecast and actual figures carry distinct names in every answer',
      'Reorder suggestions go to a planner for approval; the agent does not transact',
    ],
    start:
      'Days-of-supply and stock-out questions for one region or product family, checked against what planners already track.',
  },
  {
    id: 'customer-support',
    title: 'Customer support',
    intro:
      'Support leaders want trends: why contact volume moved, which customers are struggling, whether a process change helped. The data holds a lot of personal information in free text, so the governance design matters as much as the answers.',
    questions: [
      'What were the top five contact reasons this week, and which grew fastest?',
      'Which enterprise customers have had more than three escalations in the last 30 days?',
      'Did first response time change after the queue restructure at the start of the month?',
      'What share of billing tickets were reopened after being marked resolved?',
      'Which product release lines up with the rise in login-related tickets?',
    ],
    data: [
      'Ticketing system: tickets, status history, assignments',
      'Customer satisfaction surveys',
      'Customer and account master, with tier',
      'Product release history',
      'Contact center call records',
    ],
    definitions: [
      'First response time: business hours or calendar hours, and which clock starts it',
      'Resolved, closed, and reopened, and the time window for a reopen',
      'Contact reason categories, and how they changed over time',
      'Escalation: which transitions count',
      'Customer tier as of the ticket date',
    ],
    risks: [
      'Ticket text containing personal, payment, or health details',
      "An agent quoting one customer's messages in an answer about another",
      'Timing presented as cause (the release question)',
      'Agent performance data used for individual evaluation without the right access',
    ],
    controls: [
      'Aggregate answers by default; ticket bodies behind separate, narrower access',
      'Free text redacted or masked before it reaches the agent',
      'Answers about releases and incidents labelled as association, with the dates shown',
      'Row-level rules on per-agent performance data',
      'Audit trail on any query that reads ticket text',
    ],
    start:
      'Contact-reason trends and response-time questions using structured fields only. Leave ticket text out of the first phase.',
  },
  {
    id: 'marketing',
    title: 'Marketing',
    intro:
      'Marketing questions often have two defensible answers because the attribution model is a choice. An agent is useful here when it names the model it used, and harmful when it quietly picks one.',
    questions: [
      'Which campaigns sourced pipeline that became closed-won this half, by channel?',
      'What is cost per qualified lead by channel over the last 90 days?',
      'How often did webinar attendance lead to an opportunity within 60 days?',
      'Which segments had unusually low email engagement this month?',
      'How does trial-to-paid conversion compare for users from paid search and from organic search?',
    ],
    data: [
      'Ad platform spend',
      'Marketing automation: campaigns, emails, events',
      'Web analytics',
      'CRM leads, contacts, and opportunities',
      'Product sign-ups and trials',
      'Consent and preference records',
    ],
    definitions: [
      'Attribution model (first touch, last touch, or multi-touch), named in every answer',
      'Qualified lead: the criteria and who sets them',
      'Conversion windows for each question type',
      'Channel categories, and how sources map into them',
      'Spend: currency and the date it counts against',
    ],
    risks: [
      'Individual-level data used in ways the person did not consent to',
      'Two attribution models producing two answers, with no sign of which was used',
      'Ad-platform reported conversions mixed with internal CRM conversions',
      'Spend data arriving days late and understating recent cost',
    ],
    controls: [
      'Consent flags enforced as row filters where the data is read',
      'Aggregate answers by default for anything touching individuals',
      'Attribution model and conversion window stated in every answer',
      'Platform-reported and internal figures kept under different names',
      'Answers show the latest spend date loaded',
    ],
    start:
      'Spend and cost-per-lead questions by channel, where the definitions are simplest and the data is already aggregated.',
  },
];

/* ======================================================================
   P6.11 Evaluation checklist
   ====================================================================== */

export interface ChecklistItem { q: string; good: string }
export interface ChecklistArea { id: string; title: string; intro: string; items: ChecklistItem[] }

export const checklistAreas: ChecklistArea[] = [
  {
    id: 'semantic-layer',
    title: 'Semantic layer',
    intro: 'Whether the product reads your definitions or asks you to write a second set just for it.',
    items: [
      {
        q: 'Where do metric and dimension definitions live, and in what format? Can we export them?',
        good: 'Definitions stored as code or in a documented format that other tools can read, exportable without a services engagement.',
      },
      {
        q: 'Can dashboards, notebooks, and the agent all read the same definitions?',
        good: 'One definition served to every consumer. No separate agent-only copy to keep in sync.',
      },
      {
        q: 'How does the agent choose between two definitions with similar names?',
        good: 'It uses the names and descriptions in the semantic layer, asks a clarifying question when a request is ambiguous, and shows which definition it used.',
      },
      {
        q: 'How are changes to definitions versioned, reviewed, and rolled back?',
        good: 'Version history, a review step, and a way to see which version of a definition produced a given answer.',
      },
      {
        q: 'What happens when a question needs data the semantic layer does not cover?',
        good: 'Behaviour you configure: refuse, answer with a clear "ungoverned" label, or route to an analyst.',
      },
    ],
  },
  {
    id: 'governance',
    title: 'Governance and security',
    intro: 'Whether the agent can reach anything its user cannot, and whether you can prove it afterwards.',
    items: [
      {
        q: 'Does the agent act as the requesting user or as a service account?',
        good: "The user's identity is passed through, and permissions are checked on every request.",
      },
      {
        q: 'Where are row and column rules enforced, and does the agent path skip any of them?',
        good: 'Enforced in the data platform or catalog, the same way for the agent, BI tools, and SQL clients.',
      },
      {
        q: 'What does the audit log record for each agent answer?',
        good: 'The person, the agent, the question, the queries it generated, the datasets touched, and the time. Exportable to your security tooling.',
      },
      {
        q: 'What can the agent do besides read, and how is each action approved?',
        good: 'Read-only by default. Writes or outside actions need explicit configuration and a person to approve them.',
      },
      {
        q: 'Where are questions, answers, and logs stored, for how long, and are they used to train models?',
        good: 'A documented location and retention period you control, and no training on your data unless you agree to it in writing.',
      },
      {
        q: 'How are credentials to data sources handled?',
        good: 'Short-lived, narrowly scoped credentials. No long-lived keys stored in agent configuration.',
      },
    ],
  },
  {
    id: 'openness',
    title: 'Openness and lock-in',
    intro: 'What it would cost to replace this product, or any one part of it, later.',
    items: [
      {
        q: 'Which table formats and catalogs can it read in place, without copying data?',
        good: 'Open table formats such as Apache Iceberg read where they sit, through standard catalog protocols such as the Iceberg REST catalog.',
      },
      {
        q: 'Which models can we use? Can we bring our own or run one ourselves?',
        good: 'Several model providers, including self-hosted models, switchable by configuration.',
      },
      {
        q: 'Does it support open agent interfaces such as MCP, in either direction?',
        good: 'Documented support, with the same permissions applied as every other path.',
      },
      {
        q: 'If we leave, what do we take with us?',
        good: 'Definitions, evaluation question sets, logs, and configuration in documented formats, with a stated export process.',
      },
      {
        q: 'Which components are proprietary, and what would replacing each one involve?',
        good: 'The vendor names them plainly and describes the migration path for each.',
      },
    ],
  },
  {
    id: 'accuracy',
    title: 'Accuracy and evaluation',
    intro: 'Whether you can measure correctness on your own questions, before and after you buy.',
    items: [
      {
        q: 'Can we run our own set of questions with known answers, on our data, before we buy?',
        good: 'Yes, in a trial or proof of concept, with every result open to inspection.',
      },
      {
        q: 'How does the agent show its work?',
        good: 'The generated SQL or query plan, the definitions used, the data as-of time, and row counts, visible to the person asking.',
      },
      {
        q: 'What does it do when it is unsure or the data is missing?',
        good: 'It says so, asks a clarifying question, or declines. The threshold is configurable.',
      },
      {
        q: 'How are regressions caught when the model, prompts, or definitions change?',
        good: 'Evaluation runs on every change, built in or connected to your own pipeline, with a history of results.',
      },
      {
        q: 'Were any published accuracy figures measured on data like ours?',
        good: 'The benchmark and method are named, and the vendor will measure on your data instead.',
      },
    ],
  },
  {
    id: 'cost-latency',
    title: 'Cost and latency',
    intro: 'What drives the bill, and how long a real multi-step question takes.',
    items: [
      {
        q: 'What is the pricing unit (seats, questions, tokens, compute), and what makes it go up?',
        good: 'A clear unit and a worked estimate for your expected usage, including model and query compute.',
      },
      {
        q: 'Where does query compute run, and who pays for it?',
        good: 'Stated plainly. It can use engines you already run, and it does not require a second copy of the data.',
      },
      {
        q: 'How long does a typical multi-step question take, and how long does a slow one take?',
        good: 'Median and slow-case times measured on your data during the trial.',
      },
      {
        q: 'What caching or acceleration applies, and how does it interact with permissions and freshness?',
        good: 'Caches respect permissions, and answers show how fresh the underlying data is.',
      },
      {
        q: 'What limits exist on runaway usage?',
        good: 'Budgets per user or team, query limits, and alerts before costs pass a threshold.',
      },
    ],
  },
  {
    id: 'operations',
    title: 'Operations',
    intro: 'Who runs it, how you watch it, and what adding the next domain takes.',
    items: [
      {
        q: 'Who operates it: you, us, or both? What are the service levels?',
        good: 'A written split of responsibilities and a service level agreement.',
      },
      {
        q: 'How do we monitor usage, failures, refusals, and corrections?',
        good: 'Logs and reports for each, exportable to your own monitoring.',
      },
      {
        q: 'Where can it be deployed, and where does data travel?',
        good: 'Deployment options by cloud and region, and a diagram of every data flow, including model calls.',
      },
      {
        q: 'How are model and product updates rolled out? Can we pin a version?',
        good: 'Release notes, a staging option, and the ability to delay an update until your evaluation passes.',
      },
      {
        q: 'What does adding a new business domain involve, and who does the work?',
        good: 'Concrete steps and effort estimates that your own team can follow without mandatory services.',
      },
      {
        q: 'What security attestations do you hold, and how are incidents reported to customers?',
        good: 'Current independent reports available on request, and a defined notification process and timeline.',
      },
    ],
  },
];

/* ======================================================================
   P6.12 90-day rollout playbook
   ====================================================================== */

export interface PlaybookPhase {
  id: string;
  weeks: string;
  title: string;
  goal: string;
  owners: string[];
  activities: string[];
  exit: string[];
  risks: string[];
  links: Link[];
}

export const playbookRoles: { role: string; does: string }[] = [
  { role: 'Analytics leader', does: 'Accountable for the outcome. Chooses the domain, sets success measures, makes the week 13 decision.' },
  { role: 'Domain owner', does: 'A business lead from the chosen domain. Supplies real questions, settles definition disputes, recruits pilot users.' },
  { role: 'Analytics engineering lead', does: 'Writes and maintains the metric and dimension definitions and the evaluation question set.' },
  { role: 'Data platform lead', does: 'Owns the catalog, the authoritative copies, the interfaces the agent uses, and freshness checks.' },
  { role: 'Security and governance lead', does: 'Owns access policies, identity propagation, audit, and the review of what the agent can do.' },
  { role: 'Agent owner', does: 'Configures and runs the agent: model, harness, connections, logging, cost tracking.' },
];

export const playbookPhases: PlaybookPhase[] = [
  {
    id: 'frame',
    weeks: 'Weeks 1 to 2',
    title: 'Frame the pilot',
    goal: 'Choose one domain, name the people, and write down what a right answer is before anything is built.',
    owners: ['Analytics leader (accountable)', 'Domain owner', 'Data platform lead'],
    activities: [
      'Take the readiness assessment with the platform and analytics engineering leads, and keep the result link.',
      'Choose one domain using the readiness result and the use-case library. Prefer the domain with the best existing definitions over the one with the most enthusiasm.',
      'Collect 30 to 50 real questions from that domain, with the answers analysts actually gave.',
      'Record how long those questions take to answer today.',
      'Write the success measures: share of the question set answered correctly, time to answer, and which failures are unacceptable.',
    ],
    exit: [
      'A named accountable owner and a standing group with the roles above.',
      'A question set with known answers, stored where the team can version it.',
      'Written success measures and a one-page scope that names what is out of scope.',
    ],
    risks: [
      'Scope grows to several domains before one works.',
      'Questions are written by the project team instead of collected from users, so the set is easier than real use.',
    ],
    links: [
      { label: 'Readiness assessment', href: '/readiness/' },
      { label: 'Use-case library', href: '/use-cases/' },
    ],
  },
  {
    id: 'foundations',
    weeks: 'Weeks 3 to 5',
    title: 'Definitions and access',
    goal: 'Make every question in the set answerable from written definitions, through access rules the agent cannot get around.',
    owners: ['Analytics engineering lead', 'Security and governance lead', 'Data platform lead'],
    activities: [
      'Write the metrics and dimensions the question set needs as code in the semantic layer, each with an owner and a description.',
      'Settle the term collisions the questions expose, and give each meaning its own name.',
      'Confirm the authoritative copy of each dataset involved, and record it in the catalog.',
      'Put row and column rules in the catalog or policy layer, and design how the user’s identity reaches it through the agent.',
      'Add freshness and basic quality checks to the datasets in scope.',
    ],
    exit: [
      'An analyst can answer every question in the set from the definitions alone.',
      'Access rules tested on the agent path with at least two users who have different permissions.',
      'Freshness checks running, with an owner for each dataset.',
    ],
    risks: [
      'Definition work takes longer than planned. It is the most common schedule slip, and it is the work that decides accuracy.',
      'Security review starts late and blocks the build phase.',
    ],
    links: [
      { label: 'The semantic layer as an agent contract', href: '/knowledge-base/semantic-layer-as-contract/' },
      { label: 'Governance for agents', href: '/knowledge-base/governance-for-agents/' },
    ],
  },
  {
    id: 'build',
    weeks: 'Weeks 6 to 8',
    title: 'Build and evaluate',
    goal: 'Connect an agent to the governed definitions and measure it against the question set before any user sees it.',
    owners: ['Agent owner', 'Analytics engineering lead', 'Domain owner'],
    activities: [
      'If you are selecting a product, run the evaluation checklist and a trial on your own question set.',
      'Connect the agent through open interfaces (SQL, APIs, or an MCP server) to the semantic layer, running as the user.',
      'Run the full question set, log every generated query, and review each wrong answer.',
      'Fix failures in definitions and descriptions first. Treat prompt patches as a last resort and write each one down.',
      'Decide and test what the agent does when it is unsure or the data is not covered.',
    ],
    exit: [
      'The question set passes the threshold agreed in week 2.',
      'Every answer shows the definitions used and the data as-of time.',
      'The audit trail names the person behind every query.',
      'A written list of known failure types, shared with pilot users.',
    ],
    risks: [
      'Accuracy is improved by prompt patches that do not generalise, instead of by better definitions.',
      'The question set is quietly trimmed to the questions that pass.',
    ],
    links: [
      { label: 'Evaluation checklist', href: '/evaluation-checklist/' },
      { label: 'Evaluation and trust', href: '/knowledge-base/evaluation-and-trust/' },
    ],
  },
  {
    id: 'pilot',
    weeks: 'Weeks 9 to 11',
    title: 'Pilot with real users',
    goal: 'Put the agent in front of one team for real work, and learn from every correction.',
    owners: ['Domain owner', 'Agent owner', 'Analytics leader'],
    activities: [
      'Give access to one team in the chosen domain, with a named channel for reporting wrong answers.',
      'Review corrections and refusals every week. Each correction becomes an item on the definition backlog.',
      'Track cost per question and time to answer alongside accuracy.',
      'Watch for workarounds: new extracts, copied tables, or questions routed around the agent.',
    ],
    exit: [
      'Pilot users rely on answers for real decisions in the domain.',
      'Corrections per week are falling, and each one has been resolved or logged.',
      'Cost per question is known and fits the success measures.',
      'No access incidents, confirmed from the audit trail.',
    ],
    risks: [
      'Users accept plausible wrong numbers because the answers read well.',
      'Usage costs arrive higher than the trial suggested.',
      'Teams outside the pilot build their own copies to get access sooner.',
    ],
    links: [
      { label: 'Cost and latency', href: '/knowledge-base/cost-and-latency/' },
      { label: 'One copy, many readers', href: '/knowledge-base/one-copy-many-readers/' },
    ],
  },
  {
    id: 'decide',
    weeks: 'Weeks 12 to 13',
    title: 'Decide and plan the next domain',
    goal: 'Make a written decision against the week 2 measures, and if the answer is expand, expand by domain.',
    owners: ['Analytics leader', 'Executive sponsor', 'Data platform lead'],
    activities: [
      'Compare results with the success measures written in week 2.',
      'Decide to expand, extend the pilot, or stop, and write down why.',
      'If expanding, choose the second domain and start its definitions work. Adding users to a domain that already works is a permissions change; adding a domain is a definitions project.',
      'Move the question set into the change process so it runs whenever the model, prompts, or definitions change.',
      'Retake the readiness assessment and compare it with the week 1 result.',
    ],
    exit: [
      'A written decision, shared with the standing group and sponsor.',
      'If expanding: the second domain, its owner, and its question set are named.',
      'An operating runbook: who maintains definitions, who reviews corrections, who owns cost.',
    ],
    risks: [
      'Expansion by user count instead of by domain, which spreads the pilot’s definition gaps across more people.',
      'Success declared on enthusiasm rather than the written measures.',
    ],
    links: [
      { label: 'Rolling this out enterprise wide', href: '/knowledge-base/enterprise-rollout/' },
      { label: 'Enterprise AI agents (builder view)', href: `${AL}/kb/enterprise-ai-agents/` },
    ],
  },
];

/** KB entries that point to a leader tool, and which tools, in order. */
export const kbToTools: Record<string, string[]> = {
  'what-is-agentic-analytics': ['readiness', 'use-cases'],
  'from-dashboards-to-questions': ['use-cases', 'readiness'],
  'semantic-layer-as-contract': ['readiness', 'use-cases'],
  'text-to-sql-and-its-limits': ['readiness', 'evaluation-checklist'],
  'governance-for-agents': ['readiness', 'evaluation-checklist'],
  'evaluation-and-trust': ['evaluation-checklist', 'rollout-playbook'],
  'cost-and-latency': ['evaluation-checklist', 'rollout-playbook'],
  'portability-and-lock-in': ['evaluation-checklist', 'readiness'],
  'enterprise-rollout': ['rollout-playbook', 'readiness'],
  'open-interfaces': ['readiness', 'evaluation-checklist'],
  'one-copy-many-readers': ['readiness', 'rollout-playbook'],
};
