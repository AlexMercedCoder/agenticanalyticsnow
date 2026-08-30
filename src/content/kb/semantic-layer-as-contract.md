---
title: The semantic layer as an agent contract
summary: The place where a business writes down what its terms mean. Without it, an agent guesses at definitions, and a fluent guess is worse than an error.
kind: substrate
order: 9
keywords: [semantic layer, metrics layer, business definitions, text-to-sql, data modeling]
sources:
  - label: "The Semantic Layer: The Definitive Guide"
    url: https://www.dremio.com/blog/semantic-layer-the-definitive-guide
    note: What the layer is for and how it is built.
  - label: SemanticLakehouse.com
    url: https://semanticlakehouse.com
    note: The semantic layer covered at length.
related: [apache-ossie, what-is-agentic-analytics, evaluation-and-trust, the-model]
---

A semantic layer is where a business writes down what its own terms mean, in a form a machine can
read. Not a diagram. Not a glossary in a wiki. Definitions that resolve to queries.

For agentic analytics it is not an optimisation. It is the contract that makes the agent's output
checkable.

## The problem it solves

Ask a room of ten people at the same company what "active customer" means. You will get four
answers, and each person will be surprised there was a question. Somewhere in the warehouse there
are three implementations of it, written by three analysts at three times, and they disagree at the
margins.

A person navigating that ambiguity asks a colleague. An agent navigating it picks one, and picks
fluently. The report reads well and the number is wrong, and because it reads well nobody checks.

This is the specific way agentic analytics fails, and it is not fixed by a better model. The
definition the model needed did not exist in machine-readable form anywhere.

## What belongs in it

- **Entities.** What a customer is, an order, a product, a location, and which physical tables carry
  them.
- **Metrics.** Revenue, margin, churn, active users. Written once, with the exclusions stated:
  which refunds, which test accounts, which intercompany transfers.
- **Time.** Fiscal calendars, what "last quarter" resolves to, whether a date is order date or ship
  date.
- **Relationships.** How the entities join, so the agent does not have to reconstruct a join path
  and get the grain wrong.
- **Guidance.** Which views are current and which are deprecated. A `legacy_` prefix means nothing
  to a model unless somebody says so.

## Why an agent needs it more than a person does

A human analyst has context an agent lacks: they were in the meeting where the metric changed, they
know which table the finance team actually trusts, they know to be suspicious of a number that
doubled overnight. That knowledge is what keeps a warehouse usable despite its ambiguities.

An agent has none of it. Everything it knows about your business has to be written down. The
semantic layer is the writing down.

Put another way: the semantic layer is the difference between an agent that queries your data and an
agent that understands your business well enough to query it correctly.

## The payoff beyond agents

Work spent here is not agent-specific. The same definitions serve dashboards, notebooks, embedded
analytics, and the next tool nobody has bought yet. Organisations that did this before agents
arrived found they were mostly ready. Organisations that did not are discovering that the reason
their agent pilot stalled is a data modelling problem with an AI-shaped symptom.

The open standards work here matters for the same reason it matters elsewhere: definitions locked
inside one BI tool serve one BI tool. [Apache Ossie](/knowledge-base/apache-ossie) exists to make
them portable.
