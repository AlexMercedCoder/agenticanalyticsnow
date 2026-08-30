---
title: Cost and latency
summary: Agentic analytics changes the shape of the workload from few large queries to many small ones, which moves where the money goes and what needs optimising.
kind: practice
order: 18
keywords: [query cost, latency, agent economics, compute separation, caching, token cost]
sources:
  - label: "The Economics of AI: Cost, Latency, and Infrastructure Tradeoffs"
    url: https://books.alexmerced.com/books/the-economics-of-ai-cost-latency-and-infrastructure-tradeoffs/
    note: Book-length treatment of the tradeoffs.
related: [apache-arrow, apache-parquet, the-harness, enterprise-rollout]
---

Traditional analytics is a small number of large queries on a schedule. Agentic analytics is a large
number of small queries on demand, each one a step in a conversation. That change moves where the
cost is and what is worth tuning.

## Where the money actually goes

**Not mostly on tokens.** Model inference is the visible line item and usually not the dominant one
once the system is doing real work. A conversation that runs six queries against a warehouse charged
by compute-second will often cost more in compute than in inference.

**On repeated exploration.** An agent's third query is frequently a slight refinement of its second.
Without pruning, each one is a full scan of the same data. This is where the
[Parquet statistics and Iceberg manifests](/knowledge-base/apache-parquet) earn their place: the
narrow follow-up should cost far less than the first broad question, and with badly laid out data
it costs the same.

**On per-call overhead.** Connection setup, serialisation, and result transport are paid once per
dashboard refresh and eight times per agent conversation.
[Arrow and Flight](/knowledge-base/apache-arrow) exist to make that number small.

**On retries.** An agent that fails a query and retries three times has spent four times the compute
for one answer. Retry policy is a cost control, not just a reliability control.

## Latency is a product decision

There is a threshold above which a follow-up question stops feeling like a conversation and starts
feeling like submitting a job. Roughly speaking, a few seconds is a conversation and thirty seconds
is not. Past that, people stop asking follow-ups, which removes the thing that made agents better
than a dashboard in the first place.

Optimising for it means keeping the common path short: a semantic layer that resolves to an already
optimised view, a table sorted so the usual filters prune, results moving in Arrow, and an engine
sized for interactive work rather than for the overnight batch.

## Levers worth pulling, roughly in order

1. **Sort and compact the tables agents actually query.** Cheapest and largest effect. Statistics
   only prune when values cluster.
2. **Give the agent narrow, well-defined views rather than physical tables.** Shorter queries, fewer
   join mistakes, and a smaller plan to execute.
3. **Cap steps and forbid identical retries in the harness.** Directly bounds worst-case spend.
4. **Cache aggressively at the question level.** Many people ask the same handful of things. A cache
   keyed on the resolved semantic query, not the natural language, catches these.
5. **Separate compute by workload.** Interactive agent traffic and heavy batch jobs want different
   sizing. Being able to run them on different engines against the same tables is a direct
   consequence of using open formats.

## The budget conversation to have early

Work out the cost of one answered question, including retries and compute, before rollout. Multiply
by the number of people who will have the agent and the number of questions each asks per day. If
that number is uncomfortable, the fix is almost always in the data layout and the harness policy,
not in a cheaper model.
