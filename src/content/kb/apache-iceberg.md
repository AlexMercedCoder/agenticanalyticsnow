---
title: Apache Iceberg
summary: The table format that lets many readers and writers share one set of files safely, which is exactly the condition agentic analytics creates.
kind: substrate
order: 10
keywords: [Apache Iceberg, table format, ACID, time travel, schema evolution, snapshots]
sources:
  - label: Apache Iceberg
    url: https://iceberg.apache.org
    note: The specification and documentation.
  - label: What Are Table Formats and Why Were They Needed?
    url: https://www.dremio.com/blog/what-are-table-formats-and-why-were-they-needed
    note: The path from raw files to tables.
  - label: "Apache Iceberg: The Definitive Guide"
    url: https://books.alexmerced.com/books/apache-iceberg-the-definitive-guide/
    note: Book-length treatment.
related: [why-the-lakehouse, apache-parquet, apache-polaris, one-copy-many-readers]
apacheProject: true
---

Iceberg is a specification for describing a table made of files. It stores no data itself. It stores
metadata: which files belong to the table right now, what the schema is, how it is partitioned, what
statistics each file has, and what all of that looked like at every previous commit.

The data stays in ordinary [Parquet](/knowledge-base/apache-parquet) files in object storage.
Iceberg adds the metadata that makes those files behave like a table, plus a pointer saying which
metadata file is current. Changing that pointer atomically is a commit.

## Why an agent workload needs this specifically

Three properties matter more once agents are involved than they did when a nightly job was the only
writer.

**Concurrent readers see a consistent table.** An agent asking eight follow-up questions over two
minutes should not see the table change underneath it because ingestion landed mid-conversation.
Iceberg readers pin a snapshot; the writer commits a new one; nobody sees a half-written state.

**Answers are reproducible.** A user asks why last week's number changed. With snapshot history you
can run the same query against the snapshot the agent actually read and see whether the data moved
or the agent did. Without it you are reasoning about a moving target.

**Schema changes do not silently break things.** Iceberg tracks columns by assigned ID rather than
by position or name, so a rename does not turn into a wrong column. When an agent has learned a
column's meaning, having that meaning survive a rename is worth something.

## Hidden partitioning

Iceberg records how each file's partition values were derived from a column. A query filtering on
`order_ts` gets day-level pruning without anybody writing `WHERE order_day = ...`.

This matters for agents more than for humans, because a human writing a report learns the
partitioning convention once and applies it. An agent generating a fresh query each time would have
to be told, every time, in context. With hidden partitioning it does not need to be told at all, and
the query it writes naively is the query that prunes correctly.

## Where it stops

Iceberg says nothing about what a table means, who may read it, or where it lives. Meaning is the
[semantic layer](/knowledge-base/semantic-layer-as-contract). Access and location are the
[catalog](/knowledge-base/apache-polaris). Iceberg is the layer that makes files into a table, and
it is deliberately no larger than that.

A useful check on any product claiming Iceberg support: can another engine write to the same table,
or only read from it? Read-only support is a connector wearing the name.
