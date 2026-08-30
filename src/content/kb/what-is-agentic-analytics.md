---
title: What is agentic analytics
summary: An AI agent doing the work of an analyst against governed data, with the authority to run queries and the obligation to show where the answer came from.
kind: agentic
order: 1
keywords: [agentic analytics, AI agents, analytics automation, self-service analytics]
sources:
  - label: What Is Agentic Analytics?
    url: https://www.dremio.com/blog/what-is-agentic-analytics
    note: The definition this site works from.
  - label: AgenticLakehouse.com
    url: https://agenticlakehouse.com
    note: Longer treatment of agents operating on lakehouse data.
related: [the-agentic-stack, why-the-lakehouse, semantic-layer-as-contract]
---

Agentic analytics is what you get when an AI agent does the job an analyst does: takes a question
in a business's own words, works out what data answers it, runs the query, checks whether the
result is plausible, and reports back with the reasoning visible.

The word doing the work in that sentence is **does**. A chatbot that writes SQL for a human to run
is a code assistant. An agent that runs the query, reads the result, notices the number looks wrong,
finds the filter it forgot, and runs it again is doing analytics. The difference is authority and a
loop, not model quality.

## Why this is a different problem from chat

Text-to-SQL demos have existed for years. They demo well and deploy badly, and the reason is
consistent: the model produces syntactically valid SQL against a schema it half understands, and
nobody downstream can tell a right answer from a wrong one. The query runs. A number appears. The
number is off by the two percent of orders that were refunded, because the model did not know that
`orders` includes refunds and `net_orders` does not.

Nothing about a better model fixes this. The information that would have prevented it was never
written down anywhere the model could read. It lived in an analyst's head, or in a dbt model's
comments, or in a Confluence page from 2023.

So agentic analytics is only partly an AI problem. The other part is a data problem, and it is the
part most organisations have not solved.

## The three things an agent needs

An agent that is going to answer questions about a business needs:

1. **Reach.** It has to be able to query the data, not a sampled export of it. If the agent can only
   see what somebody remembered to copy into a vector store, it can only answer questions somebody
   already anticipated.
2. **Meaning.** It has to know that `net_revenue` excludes refunds and intercompany transfers, that
   the fiscal year starts in February, and that `region` on the customer table is billing region and
   not the sales territory. These are not schema facts. They are definitions.
3. **Limits.** It has to be unable to read what the person asking is not allowed to read, and the
   organisation has to be able to prove that afterwards.

Every one of those is a property of the data layer. None is a property of the model.

## What "now" means

The title of this site is not an urgency pitch. It is an observation that the two halves of this
arrived at the same time. Models became good enough at multi-step tool use somewhere around 2024
and 2025. Open table formats and open catalogs became mature enough to serve as a shared substrate
across engines at roughly the same point. The pieces to build this are all present and mostly open
source.

What is usually missing is not a component. It is the decision to define the business's terms once,
in a place both people and machines can read, and to put access control where every reader has to
pass through it.

## The shape of the argument

The rest of this knowledge base makes one claim in several parts:

- Agents are a stack, not a model. The [model](/knowledge-base/the-model), the
  [harness](/knowledge-base/the-harness), and the [open interfaces](/knowledge-base/open-interfaces)
  each fail differently, and knowing which one is failing is most of debugging.
- Governed semantic data is the other half. Without it, the agent is confidently wrong at machine
  speed, which is worse than being slow.
- An [open lakehouse](/knowledge-base/why-the-lakehouse) is the practical way to hold that data,
  because agents multiply readers, and formats that only one vendor's engine can read cannot serve
  many readers.

Agents plus governed semantic data equals analytics you can act on. Either half alone gets you a
demo.
