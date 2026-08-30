---
title: Rolling this out enterprise wide
summary: What separates an agent pilot that impresses a steering committee from a capability a whole organisation uses, and the order to do the work in.
kind: practice
order: 20
keywords: [enterprise AI, rollout, adoption, data platform strategy, pilot to production]
sources:
  - label: "The Agentic Enterprise: Deploying AI Agents Across the Modern Organization"
    url: https://books.alexmerced.com/books/the-agentic-enterprise-deploying-ai-agents-across-the-modern-organization/
    note: Book-length treatment of deploying agents across an organisation.
related: [governance-for-agents, one-copy-many-readers, evaluation-and-trust, semantic-layer-as-contract]
---

Analytics agent pilots succeed at a high rate and convert to production at a low one. The pattern is
consistent enough to plan around.

A pilot works because it is scoped to one domain, one team's data, and a set of questions somebody
chose. The definitions are handled by having an analyst in the room. Access is handled by giving the
pilot broad read rights in a non-production environment. Both of those are exactly the things that
do not survive contact with the rest of the company.

## What actually breaks at scale

**Definitions stop being obvious.** Ten domains means ten sets of terms, and terms that collide.
Marketing's "customer" is not finance's "customer". In a pilot an analyst resolves this in
conversation. Across an enterprise it has to be written down or every agent picks a side silently.

**Access stops being a formality.** Real deployment means the agent must respect the entitlements of
whoever is asking, which requires identity propagation the pilot never built.

**Copies appear.** Teams that cannot get access build workarounds. See
[one copy, many readers](/knowledge-base/one-copy-many-readers).

**Cost becomes visible.** Fifty users asking questions all day is a different number from five, and
the architecture that was fine for the pilot may not be.

## The order to do the work in

**1. Put the substrate in place first.** Open table formats, one catalog that everything resolves
through, credential vending rather than distributed keys. This work is not agent-specific and it
benefits every other consumer. Doing it after agents are deployed means retrofitting governance onto
systems already in use, which is much harder than it sounds.

**2. Write down the definitions for one domain properly.** Not all of them. One domain, done well
enough that an agent gets the right answer without an analyst in the room. This is the pilot worth
running, because it tests the thing that actually breaks.

**3. Build identity propagation before the second team.** It is far easier to add before there is a
service account everyone depends on.

**4. Instrument from the first day.** Questions asked, queries emitted, corrections made, refusals.
The corrections list is your definition backlog, and it is the most valuable artefact the pilot
produces.

**5. Expand by domain, not by user count.** Adding a second domain means writing its definitions and
setting its grants. Adding a hundred users to a domain that already works is a permission grant.
Doing them in that order keeps quality attached to something you can measure.

## What good looks like at eighteen months

Every agent points at the same tables. Every access is attributable to a person. Metric definitions
live in version control and are read by dashboards, notebooks, and agents alike. Adding an agent to
a new team is a configuration change. When someone asks why a number differs from last month, you
can answer by looking at snapshots rather than by convening a working group.

None of that is achieved by choosing a better model. All of it is achieved by treating agentic
analytics as a data architecture programme that happens to have an AI interface on the front.
