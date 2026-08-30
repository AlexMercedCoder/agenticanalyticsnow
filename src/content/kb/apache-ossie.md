---
title: Apache Ossie
summary: An incubating project defining a vendor-neutral standard for semantic metadata, so a metric definition is portable rather than trapped in one tool.
kind: substrate
order: 14
keywords: [Apache Ossie, semantic metadata, open semantic standard, metrics definitions, portability]
sources:
  - label: Apache Ossie
    url: https://ossie.apache.org
    note: The project, incubating at the Apache Software Foundation.
  - label: SemanticLakehouse.com
    url: https://semanticlakehouse.com
    note: The semantic layer covered at length.
related: [semantic-layer-as-contract, portability-and-lock-in, open-interfaces, why-the-lakehouse]
apacheProject: true
---

The lakehouse settled its lower layers on open standards. Files are Parquet. Tables are Iceberg.
Catalogs speak the Iceberg REST protocol. Each of those started as several competing approaches and
converged, and the convergence is why the substrate is shareable.

Semantics did not converge. Every BI tool, every metrics layer, and every warehouse has its own way
of expressing what a metric means, and none of them can read each other's.

Ossie is the effort to fix that: a vendor-neutral specification for semantic metadata.

## Why this is now the binding constraint

Follow the argument this site makes and you arrive here. Agentic analytics needs governed semantic
data. The governance has an open answer, in Polaris. The tables have an open answer, in Iceberg. The
semantics do not.

So the definitions, the most business-specific and hardest-won part of the whole system, are the
part most likely to be locked in one vendor's format. Move BI tools and you rewrite them. Add an
agent framework and you either reimplement them or let the agent guess.

That is backwards. The layer that took two years of arguments between finance and operations to
agree on should be the most portable thing you own, not the least.

## What a standard here buys

**One definition, many consumers.** The dashboard, the notebook, the embedded analytics in the
product, and every agent resolve `net_revenue` to the same thing because they read the same
definition, not because four teams reimplemented it carefully.

**Definitions that outlive tools.** Tooling churns. If the semantic model is expressed in an open
format, changing the tool that reads it is a migration of one component rather than of the
organisation's accumulated understanding of itself.

**Agents that can be pointed at it.** An open specification means an agent framework can read the
semantic model directly, without an integration per vendor. This is the difference between semantics
being available to agents by default and being available to whichever agent someone built a
connector for.

## Where it is

Ossie is incubating at the ASF, which means the specification is still moving and it is early to
build a critical path on it. That is worth stating plainly rather than presenting it as settled.

What is not early is the underlying decision. Whether or not you adopt Ossie today, express your
semantic model in something you can export, keep it in version control, and treat it as an asset of
the business rather than a configuration file inside a product. If the standard matures, you will be
positioned to adopt it. If it does not, you still own your definitions.
