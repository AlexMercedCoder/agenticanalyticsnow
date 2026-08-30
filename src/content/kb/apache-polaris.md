---
title: Apache Polaris
summary: An open catalog that resolves table names, decides who may read them, and hands out credentials scoped to just those files. The enforcement point agents cannot route around.
kind: substrate
order: 11
keywords: [Apache Polaris, Iceberg REST catalog, data catalog, scoped credentials, access control]
sources:
  - label: Apache Polaris
    url: https://polaris.apache.org
    note: The project, currently incubating at the ASF.
  - label: "Apache Polaris: The Catalog Standard for Lakehouses and AI"
    url: https://www.dremio.com/blog/apache-polaris-the-catalog-standard-for-lakehouses-and-ai
    note: Why an open catalog standard matters for both engines and agents.
related: [governance-for-agents, apache-iceberg, open-interfaces, enterprise-rollout]
apacheProject: true
---

Every reader of an Iceberg table has to start by asking one question: for the table called
`sales.orders`, where is the current metadata? The service that answers is the catalog.

Polaris is an open implementation of the Iceberg REST catalog protocol. Because every reader must
consult it, it is also the natural place to decide whether that reader is allowed to proceed.

## Why the catalog is the right enforcement point

There are three candidate places to enforce access, and two of them leak.

**In the engine.** Convenient, because engines already understand tables and columns. It fails
because anything that reads storage directly bypasses it, and a second engine means a second copy
of the rules that will drift from the first. With agents you will have several readers, so this is
not a hypothetical.

**In storage permissions.** Cannot be bypassed, but operates on paths rather than tables. Anything
finer than a prefix means shaping the physical layout around the access model, which then constrains
performance decisions for reasons that have nothing to do with performance.

**In the catalog.** Every reader has to go through it to find the metadata. It understands tables
rather than prefixes. And when it vends credentials it can be the only holder of the storage keys.
That last property is what turns the catalog from a convenient enforcement point into the correct
one.

## Credential vending, and why agents make it urgent

The pattern: the agent never holds storage credentials. It asks Polaris for a table, Polaris checks
the identity, and on success returns a credential valid for those specific objects for a short
window.

For human-driven tools this is good hygiene. For agents it is the control that makes the difference
between a bad day and a breach. An agent is a program that takes instructions from text, and text
can be adversarial. If a prompt injection convinces an agent to try to exfiltrate, what it can
actually reach is bounded by a short-lived credential for tables its user was already entitled to.
An agent holding a bucket-wide key has no such bound.

## Open matters here more than anywhere

The catalog is the highest-switching-cost component in a lakehouse. It holds the namespace, the
grants, and the credential relationship with storage. Every engine, tool, and agent points at it.

A catalog that speaks the Iceberg REST protocol can be replaced with another that speaks it. A
catalog with a proprietary API cannot, and the discovery that it cannot arrives at the exact moment
you most want to move. Of all the openness decisions in this architecture, this is the one to be
strictest about.

## Where it stops

Polaris governs access to tables. It does not define what the numbers in them mean; that is the
semantic layer. It does not store data; that is object storage. It is the answer to "which tables
exist and may this identity read them", and keeping it that focused is what lets it be shared by
everything.
