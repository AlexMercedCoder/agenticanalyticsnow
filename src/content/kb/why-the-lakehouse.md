---
title: Why an open lakehouse
summary: Agents multiply the number of readers and the number of questions. That pressure breaks architectures that assume one engine, one copy, and predictable queries.
kind: substrate
order: 8
keywords: [open lakehouse, data lakehouse, agentic analytics architecture, data warehouse, one copy]
sources:
  - label: Open Source and the Data Lakehouse
    url: https://www.dremio.com/blog/open-source-and-the-data-lakehouse
    note: Assessing openness layer by layer rather than as one claim.
  - label: OpenLakehouse.AlexMerced.com
    url: https://openlakehouse.alexmerced.com
    note: The substrate covered on its own terms, one entry per layer.
related: [what-is-agentic-analytics, one-copy-many-readers, apache-iceberg, portability-and-lock-in]
---

An open lakehouse keeps analytical data in open file and table formats on storage the organisation
controls, with a catalog that lets any compliant engine read and write it. That is the definition.
The question here is narrower: why is that specific architecture the right substrate for agentic
analytics, rather than a warehouse that already works?

The answer is about what agents do to the shape of the workload.

## Agents multiply readers

A dashboard is one reader with a fixed query, refreshed on a schedule. An agent is a reader that
asks a different question every time, then asks four follow-ups. Give one to every analyst, and
then to the operations team, and then to a scheduled process that summarises yesterday, and the
number of distinct things touching the data goes up by an order of magnitude.

Architectures where reading requires a specific engine handle this by adding capacity to that
engine, which is a pricing conversation rather than an architectural one. Architectures where the
data sits in an open format handle it by adding readers, which can be different engines sized
differently for different jobs.

## Agents make copies proliferate

When data is hard to reach, teams extract it. An export to a vector store here, a nightly dump to a
team's own warehouse there, a CSV somebody keeps in a bucket. Each copy is a place where governance
does not apply and where the numbers can quietly diverge.

Agents accelerate this, because every team that cannot reach the real data will build a workaround
to give their agent something to read. Within a year you have five agents confidently reporting
five different revenue figures, all correct with respect to their own copy.

The lakehouse answer is that the copy is unnecessary: the data is already in a format everything can
read, so there is nothing to extract.

## Agents need governance that survives the bypass

The thing about an agent is that it will use whatever it is given. If access is enforced in one
tool and not in the storage underneath, the agent that finds the second path will use the second
path, and it will not tell you it did.

An open lakehouse with a catalog that vends scoped credentials closes this: the catalog is the only
holder of the storage keys, so every reader passes through it whether it meant to or not. That
property is what makes "governed" a fact about the architecture rather than a policy in a document.

## Agents are cheap to run and expensive to run badly

A poorly scoped agent query can scan a lot of data. Open formats with good statistics and sensible
partitioning let the engine skip most of it. Being able to choose an engine suited to short
interactive questions, rather than paying warehouse rates for every exploratory step, is what keeps
this affordable at the point where everyone has an agent.

## The short version

Agentic analytics puts pressure on four things: number of readers, number of copies, enforceability
of access, and cost per question. An open lakehouse is the architecture that gets better under each
of those pressures rather than worse.
