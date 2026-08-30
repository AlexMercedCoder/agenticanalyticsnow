---
title: One copy, many readers
summary: The architectural property that decides whether agentic analytics scales past a pilot, and the specific way copy sprawl produces disagreeing answers.
kind: practice
order: 16
keywords: [single source of truth, data copies, data sprawl, decoupled compute, enterprise analytics]
sources:
  - label: OpenLakehouse.AlexMerced.com
    url: https://openlakehouse.alexmerced.com
    note: The substrate that makes one copy practical.
related: [why-the-lakehouse, enterprise-rollout, governance-for-agents, apache-iceberg]
---

The clean version of this architecture has one authoritative copy of each dataset, in an open
format, with many readers pointed at it. The version organisations actually end up with has eleven
copies, and the difference between the two is not a technology decision. It is what happens when
reaching the real data is harder than making a copy.

## How copies happen

Nobody decides to fragment their data. It goes like this.

A team wants to build an agent. Getting access to the governed tables requires a request, a review,
and a two-week wait. Meanwhile there is an export in a bucket from a project last year. They use the
export. It works. The agent ships.

Another team needs semantic search, so they embed a subset into a vector store. That subset is a
snapshot from whenever the job last ran.

A third team's warehouse quota is tight, so they replicate the tables they need into their own
instance and query there.

Now three agents answer questions about revenue. They disagree, in small ways, at exactly the times
when it matters. Reconciling them takes a week and produces a document nobody reads, and the
underlying cause, which was that access was slower than copying, is untouched.

## What one copy requires

It is not enough to declare a single source of truth. Three things have to be true for it to hold.

**The format has to be readable by everything.** If the authoritative copy lives somewhere only one
engine can read, every team with a different tool is forced to extract. Open file and table formats
remove the reason to copy.

**Access has to be faster than copying.** This is the one that gets skipped. If a legitimate request
takes two weeks and a copy takes an afternoon, you will get copies, regardless of policy. Governance
that is slow is governance that gets routed around.

**Compute has to be separable.** Teams copy for capacity as often as for access. When readers can
bring their own compute against shared storage, a team with a heavy workload does not need their
own copy of the data to get their own capacity.

An open lakehouse is the architecture where all three can be true at once.

## What it buys once agents arrive

Every agent points at the same tables, so they agree. Every access passes the same catalog, so it is
governed and logged. Adding the tenth agent is a permission grant, not a data engineering project.
And when a definition changes, it changes once.

The alternative is not one bad architecture. It is a slowly growing set of them, each locally
reasonable, that collectively make it impossible to say what the company's revenue was.
