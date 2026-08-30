---
title: Apache Parquet
summary: The columnar file format most lakehouse data sits in. Its statistics are what let an agent's exploratory query read a fraction of the table instead of all of it.
kind: substrate
order: 13
keywords: [Apache Parquet, columnar format, compression, predicate pushdown, row groups, statistics]
sources:
  - label: Apache Parquet
    url: https://parquet.apache.org
    note: The specification.
related: [apache-iceberg, apache-arrow, cost-and-latency, why-the-lakehouse]
apacheProject: true
---

Parquet stores records column by column rather than row by row. A query that reads three columns of
a two-hundred-column table reads roughly three columns' worth of bytes, not the whole thing.

Columns also compress far better than rows, because values within a column are similar to each
other. Repeated strings become dictionary references. Sorted integers become deltas. The
compression is not incidental; it is a direct consequence of the layout.

## The part that matters for agents: statistics

A Parquet file is divided into row groups, and each row group carries statistics per column:
minimum, maximum, null count. An engine reading a file with a filter on `order_date` can check
those and skip any row group whose range cannot contain matching rows, without decompressing it.

Combine that with [Iceberg](/knowledge-base/apache-iceberg), which keeps the same statistics at the
file level in its manifests, and a filtered query can skip most files before opening any of them,
then skip most row groups in the files it does open.

This is why an agent can be allowed to explore. Exploration means many queries, most of which are
narrow, and most of which are refinements of the previous one. If every one of those cost a full
table scan, giving agents to a hundred people would be a budget event. With statistics doing their
job, the narrow question costs roughly what the narrow question is worth.

## Practical consequences

- **Sort by what gets filtered.** Statistics only prune when values are clustered. A table sorted by
  the column agents filter on most prunes well; the same table in arrival order barely prunes at
  all. This is the highest-leverage physical decision available and it costs nothing at query time.
- **Watch file sizes.** Many tiny files means per-file overhead dominates and statistics stop
  helping, because each file's range covers everything. Compaction is not optional maintenance once
  agents are the main readers.
- **Do not fight the format.** Parquet is well served by every engine that matters. The gains are in
  how you lay data out inside it, not in replacing it.

## Where it stops

Parquet knows nothing about tables, transactions, schema history, or permissions. It is one file,
well organised. Everything above that is the table format's job, the catalog's job, or the semantic
layer's job. Keeping those responsibilities separate is the reason the stack can be assembled from
independent parts at all.
