---
title: Open interfaces
summary: The four contracts an analytics agent speaks through, why each should be a specification rather than a product, and what a closed one costs later.
kind: stack
order: 7
keywords: [MCP, Model Context Protocol, Iceberg REST catalog, Arrow Flight, SQL, open standards]
sources:
  - label: Model Context Protocol
    url: https://modelcontextprotocol.io
    note: The specification for exposing tools and resources to models.
  - label: Apache Arrow Flight SQL
    url: https://arrow.apache.org/docs/format/FlightSql.html
    note: The wire protocol for moving query results without row-by-row serialisation.
  - label: Apache Polaris
    url: https://polaris.apache.org
    note: An open implementation of the Iceberg REST catalog protocol.
related: [the-agentic-stack, apache-arrow, apache-polaris, portability-and-lock-in]
apacheProject: true
---

An agent reaches the world through interfaces. For analytics there are four that matter, and the
useful question about each one is the same: is this a specification with several implementations,
or is it one company's API with a standards-shaped name?

## Tool exposure: the Model Context Protocol

MCP is how a harness tells a model what it can do, and how tool calls travel to whatever
implements them. Before it, every agent framework had its own tool format and every integration was
written twice.

For analytics it matters because it decouples the agent from the data platform. A query tool exposed
over MCP can be called by any MCP-speaking harness, which means the data team can publish a
governed interface once rather than integrating with each team's chosen framework.

The caution: MCP describes how tools are exposed, not whether they are safe. An MCP server that
exposes an unrestricted SQL endpoint is a well-specified way to hand out unrestricted SQL.

## Table discovery: the Iceberg REST catalog protocol

The agent needs to find out what tables exist and get the metadata to read them. The Iceberg REST
catalog protocol is the open contract for that, implemented by Apache Polaris and by several other
catalogs.

This is the layer where access should be decided, and where credentials should be vended narrowly
rather than handed out whole. An agent that resolves tables through a catalog implementing this
protocol gets discovery and authorisation from the same call.

## Result transport: Apache Arrow and Arrow Flight

Query results have to get from the engine to whatever consumes them. Arrow defines the in-memory
layout; Flight and Flight SQL define moving it over the network. Together they remove the
serialise-deserialise tax that used to dominate the cost of pulling a large result into a Python
process.

This matters more with agents than it did with dashboards, because agents ask many medium-sized
questions in a loop rather than one large question on a schedule. Per-call overhead is paid far more
often.

## The query itself: SQL

Not fashionable, and not going anywhere. SQL is the most widely implemented data interface in
existence, models are better at it than at any proprietary query DSL, and it is auditable in a way
that an opaque API call is not. When an agent emits SQL, a human can read exactly what was asked.

The improvement to make is not replacing SQL. It is giving the agent well-defined views to write SQL
against, so that the SQL it writes is short and obviously correct rather than a two-hundred-line
join it reconstructed from physical tables.

## The test

For each interface, ask: if the vendor behind it doubled the price, what would it take to move?

If the answer for three of the four is "reconfigure an endpoint" and for one it is "rewrite the
integration and re-export the data", you now know where your leverage is not.
