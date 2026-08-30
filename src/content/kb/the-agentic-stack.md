---
title: The agentic stack
summary: Three separable layers, model, harness, and open interfaces, each with its own failure mode. Most agent problems are misattributed across them.
kind: stack
order: 4
keywords: [agentic stack, agent architecture, model harness, agent interfaces]
sources:
  - label: OpenAgenticPlatform.com
    url: https://openagenticplatform.com
    note: The wider platform view, covering protocols, identity, and governance.
related: [the-model, the-harness, open-interfaces, what-is-agentic-analytics]
---

An agent is not a model. An agent is a model inside a loop, reaching outside itself through
interfaces. Those are three separate things, built by different people, failing in different ways,
and swappable on different timescales.

Being able to say which layer is at fault is the difference between fixing a system and switching
models and hoping.

## Model

The model reasons over what is in front of it. It decides what to do next, given the question, the
tools it has been told about, and whatever the harness has put in its context.

It does not know your business. It does not remember yesterday. It cannot see anything nobody handed
it. Every fact it appears to know about your data was either in the prompt or is a hallucination, and
from the outside those two look identical.

Models are the fastest-moving layer and the easiest to replace. A system that can only work with one
model is a system with a dependency it did not need.

## Harness

The harness is the program that runs the loop. It decides what goes into context and what gets
dropped, which tools are exposed, how many steps to allow, what to do when a tool call fails, what
to persist between turns, and when to stop and ask a human.

Almost everything people call "agent behaviour" is harness behaviour. If the agent forgets a
constraint from three turns ago, that is a context management decision. If it loops on a failing
query twenty times, that is a retry policy. If it hallucinates a table name, that is often a
harness that never gave it the real list.

The harness is where an agent is actually engineered, and where most of the value and most of the
bugs live.

## Open interfaces

The interfaces are how the agent reaches the world: the tool protocol it speaks, the catalog API it
resolves tables through, the wire format results come back in, the query language it emits.

For analytics specifically, that usually means the Model Context Protocol for tool exposure, the
Iceberg REST catalog protocol for table discovery, Arrow and Arrow Flight for moving results, and
SQL for the query itself. All four are specifications with more than one implementation, which is
the property that matters.

Interfaces are the slowest-moving layer and the one with the longest consequences. Picking a
proprietary one is how an architecture that looked modular in the diagram turns out not to be.

## Why the separation is the point

Keep them separate and you can:

- change models when a better one ships, without rewriting the system
- fix a retry loop without touching the data platform
- put a second agent on the same interfaces without a second copy of the data
- audit the interface layer alone and know what every agent can reach

Collapse them, and you have bought a product rather than built a capability. That is a legitimate
choice, but it should be a deliberate one, and it is worth knowing what it costs before the
renewal conversation.
