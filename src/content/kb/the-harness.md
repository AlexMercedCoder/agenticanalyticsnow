---
title: The harness
summary: The program that runs the loop. It decides context, tools, retries, memory, and when to stop, which is where most agent behaviour actually comes from.
kind: stack
order: 6
keywords: [agent harness, agent loop, context engineering, tool calling, agent memory]
sources:
  - label: OpenAgenticPlatform.com knowledge base
    url: https://openagenticplatform.com/knowledge-base
    note: Entries on harnesses, memory, and the surrounding agent infrastructure.
related: [the-agentic-stack, the-model, open-interfaces, evaluation-and-trust]
---

The harness is the program around the model. It is unglamorous, it is where the engineering is, and
it is responsible for nearly everything a user would describe as the agent's personality.

## What it decides

**What the model sees.** Context is finite and always smaller than the amount of potentially
relevant material. The harness chooses: which tables to describe, how much schema detail, which
prior turns to keep, which tool results to summarise and which to include whole. Get this wrong in
the generous direction and you pay in latency and cost. Get it wrong in the stingy direction and
the model invents what it was not told.

**Which tools exist.** Every tool is an expansion of what the agent can do and a slight degradation
of how well it chooses. Twelve well-named tools beat forty overlapping ones. Tool descriptions are
prompt surface and deserve the same care.

**What happens on failure.** A query times out. A column does not exist. A permission is denied. The
harness decides whether to retry, rewrite, ask, or stop. A denied permission in particular should
never be retried, and should surface as a denial rather than as an apology, because a user who does
not know they hit a boundary will assume the data is missing.

**What persists.** Between turns and between sessions, what is remembered and where it is written.
Memory that cannot be inspected is a liability once anyone asks why the agent believes something.

**When to stop.** Step budgets, cost ceilings, and the decision to hand back to a human. An agent
without a stop condition is a way to spend money quickly.

## Where harnesses go wrong in analytics

The common failure is dumping the whole information schema into context and hoping. It seems
thorough and it is actively harmful: a thousand column names with no definitions gives the model
more ways to be wrong, not fewer. A short list of well-defined, business-meaningful views beats a
complete dump of physical tables every time.

The second failure is retrying identical queries. If a query returned nothing, running it again
returns nothing. The harness should require the plan to change before the call repeats.

The third is treating a returned empty set as an error. Sometimes the honest answer is that there
were no orders in that region last quarter, and an agent that keeps searching until it finds
something will eventually find something wrong.

## Where the harness should not reach

The harness must not be where access control lives. It is tempting: the harness knows who is
asking, and it can filter. But a rule enforced in the harness is a rule that only applies to
requests coming through that harness. The second agent, the notebook, the BI tool, and the person
with a JDBC driver all bypass it.

Enforce access in the catalog, where every reader has to pass. Let the harness be responsible for
carrying the right identity, not for deciding what that identity may see.
