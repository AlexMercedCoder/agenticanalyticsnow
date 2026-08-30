---
title: Portability and lock-in
summary: What it would actually cost to replace each component of an agentic analytics stack, and why the semantic layer is now the most likely trap.
kind: practice
order: 19
keywords: [vendor lock-in, portability, open standards, migration cost, switching cost]
sources:
  - label: Open Source and the Data Lakehouse
    url: https://www.dremio.com/blog/open-source-and-the-data-lakehouse
    note: Assessing openness one layer at a time.
related: [open-interfaces, apache-ossie, apache-polaris, why-the-lakehouse]
---

Lock-in is not a moral failing of vendors. It is the natural result of a component becoming load
bearing faster than anyone measured the cost of removing it. The defence is to know that cost per
component, before it matters.

For an agentic analytics stack, run the exercise layer by layer.

## The model

**Cost to replace: low.** If prompts and tool definitions are in version control and the harness
talks to models through a thin adapter, this is a configuration change. Keep it that way. Any
feature that only exists in one provider's API and sits on your critical path is worth pricing
honestly before you depend on it.

## The harness

**Cost to replace: moderate.** This is your code, or a framework you have wrapped. Rewriting an
agent loop is a project of weeks, not quarters, as long as the tools it calls are exposed over an
open protocol and not embedded in the framework.

## The interfaces

**Cost to replace: low if open, very high if not.** An MCP tool server can be swapped for another
MCP tool server. A proprietary agent-to-data integration cannot, and it has typically spread through
every team that adopted it.

## The engine

**Cost to replace: low, if the data is in open formats.** This is the whole argument for the
lakehouse. When tables are Iceberg over Parquet in your own storage, adding or replacing an engine
is a connection change. When the data lives inside a proprietary system, the engine and the storage
are the same decision and moving means an export.

## The catalog

**Cost to replace: high, and rising.** It holds the namespace, the grants, and the credential
relationship with storage. Everything points at it. If it speaks the Iceberg REST protocol, another
implementation can take over. If it has a proprietary API, this is the component that quietly
becomes unmovable. Be strictest here.

## The semantic layer

**Cost to replace: highest, and most often overlooked.** These definitions took the longest to agree
on and encode the most institutional knowledge. If they exist only inside one BI tool's proprietary
model, moving means reconstructing years of arguments between finance and operations.

This is now the most likely lock-in point in a modern stack, precisely because the layers below it
solved their portability problems and this one has not yet. [Apache Ossie](/knowledge-base/apache-ossie)
is the effort to close it. Until it matures, the practical defence is to keep the semantic model in
version control, in a format you can export and read without the vendor's product.

## The question to ask each vendor

Not "is it open source". Ask: if I decided to leave, what would I take with me, and what would I
have to rebuild?

A satisfying answer describes files you already have in storage and definitions you already have in
a repository. An unsatisfying answer describes an export process. The second answer is the one that
costs.
