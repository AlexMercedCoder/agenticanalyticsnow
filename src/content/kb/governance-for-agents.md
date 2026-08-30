---
title: Governance for agents
summary: Identity, scoped credentials, and audit, arranged so that an agent cannot reach what its user cannot reach, and so you can prove it afterwards.
kind: practice
order: 15
keywords: [data governance, agent identity, access control, scoped credentials, audit, RBAC]
sources:
  - label: "Apache Polaris: The Catalog Standard for Lakehouses and AI"
    url: https://www.dremio.com/blog/apache-polaris-the-catalog-standard-for-lakehouses-and-ai
    note: Why the catalog is the right place to enforce this.
related: [apache-polaris, the-harness, open-interfaces, enterprise-rollout]
---

Governance for agents is the same problem as governance for people, made urgent by three
differences: agents act faster, they act more often, and nobody watches each action.

The requirement is simple to state. An agent acting for a person must be able to reach exactly what
that person can reach, no more, and every access must be attributable afterwards.

## Identity: who is the agent acting as

The wrong answer, and the common one, is a service account. Give the agent a single identity with
broad read access and let the application decide what to show. This works until the first incident,
at which point you discover the audit log says `analytics-agent` read the salary table and cannot
say on whose behalf.

The right answer is that the agent carries the identity of the person who asked. Every query
attributable to a human. Every permission decision made against that human's grants. When somebody
leaves the company, revoking their access revokes what the agent can do for them, with no separate
cleanup.

This is more work to build and it is the difference between an agent you can deploy in a regulated
environment and one you cannot.

## Enforcement: where the decision is made

Not in the prompt. A model can be persuaded, and a rule stated in a system prompt is a suggestion
with good intentions.

Not in the harness alone. A harness-level filter applies to requests through that harness. The
second agent, the notebook, and the JDBC connection do not go through it.

In the catalog. Every reader has to consult the catalog to find out where a table's current metadata
lives. If the catalog also decides whether that reader may see the table, and vends short-lived
credentials scoped to only the files that table needs, then enforcement sits in the one place
nobody can route around. This is what [Apache Polaris](/knowledge-base/apache-polaris) is for.

## Scoped credentials

The pattern worth insisting on: the agent never holds storage credentials. It asks the catalog for a
table, the catalog checks the identity, and if the answer is yes it returns a credential valid for
those specific objects for a short window.

This bounds the blast radius of a compromised agent to the tables it was already allowed to read,
for a few minutes. Compare that to an agent holding a bucket-wide key, where a prompt injection is
an exfiltration.

## Audit

Log what was asked in natural language, what the agent decided to do, what query it emitted, which
tables it touched, which identity it used, and what came back. All five. A log with the SQL but not
the question cannot tell you whether the agent misunderstood. A log with the question but not the
SQL cannot tell you whether it queried the wrong table.

This is also the raw material for improving the system. The questions agents get wrong are a list of
definitions that are missing from the semantic layer.

## Denial should be visible

When an agent is refused access, say so. An agent that responds "I could not find data on that"
when the real answer is "you are not permitted to see that" teaches users the data does not exist,
which is both untrue and the beginning of a shadow copy.
