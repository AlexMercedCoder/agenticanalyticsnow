---
title: Evaluation and trust
summary: How to know whether an analytics agent is right, why accuracy on a benchmark is not the question, and what to measure instead.
kind: practice
order: 17
keywords: [agent evaluation, LLM evals, accuracy, trust, verification, analytics quality]
sources:
  - label: "Evaluating AI Systems: Testing LLMs, RAG, and Agents"
    url: https://books.alexmerced.com/books/evaluating-ai-systems-testing-llms-rag-and-agents/
    note: Book-length treatment of evaluating agent systems.
related: [the-harness, semantic-layer-as-contract, governance-for-agents, the-model]
---

An analytics agent that is right most of the time and confident all of the time is not useful, it is
dangerous. The failure mode of this technology is not the obvious error. It is the plausible number
that nobody questions.

So the question is not "how accurate is the model". It is "how does a person receiving an answer
decide whether to act on it".

## Make the answer checkable

The most valuable property is not accuracy. It is legibility. Every answer should arrive with:

- the question as the agent understood it, restated
- the query it ran
- the tables and the snapshot it read
- the definitions it applied, and where they came from

A person who can see all four can check the answer in thirty seconds. A person who receives only a
number has to either trust it or redo the work, and in practice they trust it.

This is also why the [semantic layer](/knowledge-base/semantic-layer-as-contract) is load bearing
for trust and not only for correctness. "Revenue, as defined in the finance model" is checkable.
"Revenue, as the model interpreted it" is not.

## What to actually measure

**Definition coverage.** What fraction of the questions people ask reference terms that have a
written definition? This is usually the highest-leverage number in the system and it is rarely
tracked.

**Query correctness on a fixed set.** Maintain fifty real questions with known-correct answers,
produced by analysts. Run them on every change to prompts, tools, semantic model, or model version.
This catches regressions that a general benchmark never will, because it tests your business.

**Refusal rate and refusal accuracy.** How often does the agent decline, and when it declines, was
it right to? An agent that never declines is not being careful. An agent that declines constantly is
missing definitions.

**Correction rate.** How often does a human override the answer? Where they do, the corrections are
a list of things the semantic layer does not yet say.

**Cost and latency per answered question.** Not per token. Per question actually answered, including
the retries.

## The evaluation loop is a data modelling loop

The important structural point: most failures of an analytics agent are not model failures. They are
missing definitions. So the output of evaluation should feed the semantic layer, not the prompt.

A team that responds to bad answers by adjusting prompts is treating symptoms and will plateau. A
team that responds by writing down the definition the agent lacked is compounding, because the next
agent, the next tool, and every human analyst benefit from the same work.

## Autonomy should be earned

Start with the agent proposing and a human approving. Move to autonomy per question type, as the
fixed test set earns it. "Fully autonomous" is not a launch state; it is something specific
categories of question graduate into after they have been demonstrably right for a while.
