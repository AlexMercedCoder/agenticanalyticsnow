---
title: Apache Arrow
summary: A standard in-memory layout for tabular data, so results move between the engine, the tool, and the agent without being repeatedly converted.
kind: substrate
order: 12
keywords: [Apache Arrow, Arrow Flight, Flight SQL, in-memory format, zero copy, serialization]
sources:
  - label: Apache Arrow
    url: https://arrow.apache.org
    note: The specification and the implementations.
  - label: Arrow Flight SQL
    url: https://arrow.apache.org/docs/format/FlightSql.html
    note: Moving query results over the network in Arrow form.
related: [open-interfaces, cost-and-latency, apache-parquet, why-the-lakehouse]
apacheProject: true
---

Arrow specifies how tabular data is arranged in memory: columnar, with a defined layout for each
type. Any process that speaks Arrow can hand a table to any other process that speaks Arrow without
converting it.

The problem it removes is old and expensive. Before Arrow, moving a result from a query engine into
a Python process meant serialising to some row format, sending it, parsing it, and rebuilding
column arrays. On large results that conversion often cost more than the query.

## Why this shows up in agentic analytics

An agent asks many medium-sized questions rather than one large one. It runs a query, looks at the
result, adjusts, runs another. Where a dashboard paid the transport cost once an hour, an agent
conversation pays it eight times in ninety seconds.

Per-call overhead therefore dominates in a way it did not before. Arrow and Arrow Flight take that
overhead close to zero, which is the difference between a follow-up question feeling immediate and
feeling like a wait.

Arrow also lets the pieces stay separate. The engine, the semantic layer, the agent's own tooling,
and whatever charting or dataframe library the answer flows into can each be a different
implementation in a different language, sharing memory representations rather than negotiating
formats. That is what keeps an agentic stack composable instead of monolithic.

## Arrow and Parquet are not competitors

They solve adjacent problems and are designed to work together. Parquet is the on-disk format,
optimised for compression and for skipping data you do not need to read. Arrow is the in-memory
format, optimised for computation and for handing data between processes.

Data at rest is Parquet. Data in flight and in use is Arrow. Reading Parquet into Arrow is a
well-optimised path in every major implementation.

## Flight and Flight SQL

Flight is the network protocol for moving Arrow data; Flight SQL adds the database client semantics
on top, so a tool can submit a query and stream results back in Arrow form. Compared with ODBC or
JDBC, which convert to a row-oriented representation at the boundary, Flight SQL keeps the columnar
layout end to end and parallelises the transfer.

For an agent tool that returns query results, this is the difference between the tool being a thin
pass-through and the tool being the bottleneck.

## Why the openness matters

Arrow is a specification with implementations in C++, Rust, Java, Go, Python, and more. That is what
makes it a safe assumption across a stack assembled from parts. A proprietary in-memory format
optimised by one vendor would perform well inside that vendor's boundary and force a conversion at
every edge, which is precisely the cost Arrow exists to remove.
