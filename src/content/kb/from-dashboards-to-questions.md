---
title: From dashboards to questions
summary: Dashboards answer questions somebody anticipated. Agents answer the ones nobody did, which changes what the data layer has to support.
kind: agentic
order: 2
keywords: [dashboards, self-service analytics, BI, ad hoc analysis, data consumption]
sources:
  - label: What Is Agentic Analytics?
    url: https://www.dremio.com/blog/what-is-agentic-analytics
    note: The consumption shift, in context.
related: [what-is-agentic-analytics, cost-and-latency, semantic-layer-as-contract]
---

A dashboard is an answer to a question somebody asked once, frozen and refreshed. That is not a
criticism. For questions asked repeatedly, freezing the answer is exactly right.

The problem has always been the long tail. Someone looks at the dashboard, sees something odd, and
wants to know why. The dashboard cannot tell them. So they file a request, an analyst gets to it in a
week, and by then the moment has passed or somebody has guessed.

Most of the value in analytics has always been in that tail, and most of the tooling has been aimed
at the head.

## What changes

An agent answers the follow-up. Not because it is smarter than the analyst, but because it is
available at the moment the question occurs and it does not mind being asked something small.

The consequences are structural:

**Queries stop being predictable.** You can tune for a dashboard because you know what it will ask.
You cannot pre-aggregate for a question nobody has thought of yet. The data layer has to be good at
arbitrary slices rather than at a fixed set.

**Volume goes up and size goes down.** Many small queries instead of a few large scheduled ones. Per
query overhead starts to matter far more than it did.

**The tail gets asked.** Questions that were never worth a week of analyst time get asked because
they now cost thirty seconds. Some of them turn out to matter.

**Correctness becomes everyone's problem.** A dashboard's numbers were vetted once by someone who
knew the data. An ad hoc answer has no such review, which is why the definitions have to be written
down rather than living in the reviewer's head.

## What does not change

Dashboards do not go away, and the framing that agents replace them is wrong. The recurring
questions still deserve a fixed, fast, vetted answer that looks the same every morning.

What changes is that the dashboard stops being the boundary of what people can ask. It becomes the
starting point, with the agent handling everything past it. The dashboard and the agent should be
reading the same definitions, so that the follow-up is consistent with the thing it followed up on.

## The practical implication

If you are evaluating this, do not measure the agent against the dashboard on the questions the
dashboard already answers. It will look like an expensive way to get a number you already had.

Measure it on the tail: the questions currently answered by a Slack message to an analyst, or not
answered at all. That is where the difference is, and that is also the set of questions that
exposes whether your definitions are actually written down.
