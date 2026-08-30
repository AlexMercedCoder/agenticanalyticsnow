---
title: The model
summary: What the reasoning layer actually contributes, what it cannot know, and why treating model choice as the whole architecture leads people astray.
kind: stack
order: 5
keywords: [LLM, foundation model, reasoning, model selection, tool use]
sources:
  - label: AlexMercedAI.com
    url: https://www.alexmercedai.com
    note: The AI side of the network, covering models, agents, and the specs around them.
related: [the-agentic-stack, the-harness, evaluation-and-trust]
---

The model is the part that reasons. Given a question, a description of the tools available, and
whatever context it has been handed, it produces the next action: call this tool with these
arguments, or answer now.

That is a narrow job, and it is worth being precise about how narrow, because the industry
conversation treats model choice as though it were the architecture.

## What the model contributes

Three things, mostly:

**Decomposition.** Turning "why did margin drop in the northeast last quarter" into a sequence of
smaller questions that have answers: what was margin, over what period, sliced how, compared to
what.

**Translation.** Turning a business phrasing into a tool call or a SQL statement. This is the part
people notice, and the part that is nearly solved for well-described schemas.

**Judgement about the result.** Looking at a returned number and deciding whether it is plausible,
whether it answers the question that was asked, and whether another step is needed. This is where
the good models separate from the adequate ones, and it is far more important than SQL fluency.

## What the model cannot know

It cannot know anything about your business that was not put in front of it. Not the schema, not
the definitions, not last quarter's reorganisation, not that the `legacy_` prefix means "do not
use". A model asked about data it has not been shown will produce something plausible, because
producing something plausible is what it does.

It also cannot know what it is not allowed to see. Permission is not a concept a model has. If the
harness hands it a tool that can read the salary table, it will read the salary table when that
seems useful. Access control has to be enforced somewhere the model cannot reason its way around,
which means underneath the interfaces, not inside the prompt.

## Model choice, in proportion

Pick a capable current model. Prefer one that is reliable at multi-step tool use over one that
scores well on single-shot benchmarks, because analytics is a loop. Make sure you can swap it.

Then stop optimising there. Once the model is good enough to hold a plan across five tool calls,
further gains come almost entirely from the other two layers and from the data underneath. A
mediocre model with clean semantics and honest tools beats an excellent model guessing at column
meanings, and it does so consistently.

The reason this is worth saying plainly: model upgrades are easy and visible, and data definition
work is slow and invisible. Teams do the easy thing and wonder why the accuracy plateau does not
move.

## Practical consequences

- Keep prompts and tool descriptions in version control. They are part of the system, not
  configuration.
- Never encode a permission rule in a prompt. Prompts are advisory. Catalogs are not.
- Assume the model will be replaced within a year, and build so that replacing it is a
  configuration change.
- Log what went into context alongside what came out, or you will not be able to reconstruct why an
  answer happened.
