---
title: Text to SQL and why it stalls
summary: Generating SQL from a question was solved years ago. Generating the right SQL against a real schema was not, and the gap is definitional rather than technical.
kind: agentic
order: 3
keywords: [text-to-sql, natural language query, NL2SQL, schema understanding, semantic layer]
sources:
  - label: "The Semantic Layer: The Definitive Guide"
    url: https://www.dremio.com/blog/semantic-layer-the-definitive-guide
    note: The layer that closes this gap.
related: [semantic-layer-as-contract, what-is-agentic-analytics, evaluation-and-trust, the-model]
---

Text to SQL demos beautifully. A question goes in, valid SQL comes out, a result appears. It has
demoed beautifully for several years now, across several generations of model, and it has converted
to production far less often than the demos suggest.

The reason is worth being precise about, because "the model is not good enough yet" has been the
assumed explanation and it has been wrong for a while.

## What the demos have in common

Demo schemas are small, well named, and honest. `customers`, `orders`, `order_items`. Columns mean
what they are called. There is one table per concept. Nothing is deprecated. There are no
intercompany transfers, no test accounts left over from a migration, no `amount` column that is
sometimes gross and sometimes net depending on the source system.

Real schemas are not like this. A real warehouse has four tables that could plausibly answer
"revenue", three of which are wrong for reasons that are not visible in the schema.

## The gap is definitional, not technical

A current model writes better SQL than most people. Given a correct description of what it should be
querying, it will produce a correct query. The failure is upstream: it was never told which of the
four revenue tables is the one finance uses, or that `orders` includes refunds.

No amount of model improvement supplies information that does not exist in machine-readable form
anywhere in the organisation. This is why text-to-sql accuracy plateaus at a level that is
impressive on benchmarks and unusable in production.

## What actually closes it

Give the model a smaller, well-defined surface to write against. Instead of two hundred physical
tables, expose twenty business-meaningful views, each with a written definition of what it
represents and what it excludes.

The SQL the model then writes is short, mostly obviously correct, and reviewable by a human in
seconds. The hard reasoning about which table and which exclusions was done once, by people, and
written down. See [the semantic layer as a contract](/knowledge-base/semantic-layer-as-contract).

This is a less exciting answer than a better model. It is also the one that works, and the work is
reusable across every other consumer of the data.

## The other half: a loop

Even with good definitions, the first query is sometimes wrong. What separates an agent from a
text-to-sql feature is that it looks at the result, notices the row count is zero or the number is
implausible, and tries again with a different approach.

Single-shot generation has no opportunity to catch its own mistakes. That is the
[harness](/knowledge-base/the-harness) layer's contribution, and it is why "text to sql" and
"agentic analytics" are not the same product with different branding.
