/**
 * Markdown versions of the evaluation checklist and the rollout playbook,
 * served as downloads at /evaluation-checklist.md and /rollout-playbook.md.
 */
import { checklistAreas, playbookPhases, playbookRoles } from './leader-tools';

const SITE = 'https://agenticanalyticsnow.com';
const abs = (href: string) => (href.startsWith('/') ? `${SITE}${href}` : href);

export function checklistMarkdown(): string {
  let n = 0;
  const areas = checklistAreas
    .map((area) => {
      const items = area.items
        .map((item) => {
          n += 1;
          return `### ${n}. ${item.q}\n\n- [ ] Asked\n- Vendor answer:\n- A good answer includes: ${item.good}\n- Score (0 to 3):`;
        })
        .join('\n\n');
      return `## ${area.title}\n\n${area.intro}\n\n${items}`;
    })
    .join('\n\n');

  return `# Agentic analytics evaluation checklist

Vendor-neutral questions for choosing an agentic analytics product or platform, grouped by area, with what a good answer includes. Use it as RFP questions or as the agenda for a proof of concept. Score each answer 0 (no answer or a bad one) to 3 (meets the good answer in full).

Source: ${SITE}/evaluation-checklist/ (Alex Merced, Agentic Analytics Now). Run the readiness assessment first: ${SITE}/readiness/

${areas}

## Before you send it

- Run your own question set with known answers on your own data during the trial. Published accuracy figures on other data tell you little.
- Ask every vendor the same questions in the same order, and score the answers before the demos, not after.
- Weight the areas to your situation. For most teams, governance and openness decide more of the long-term cost than the model does.
`;
}

export function playbookMarkdown(): string {
  const roles = playbookRoles.map((r) => `- **${r.role}:** ${r.does}`).join('\n');
  const phases = playbookPhases
    .map(
      (p) => `## ${p.weeks}: ${p.title}

**Goal:** ${p.goal}

**Owners:** ${p.owners.join(', ')}

**Work**

${p.activities.map((a) => `- ${a}`).join('\n')}

**Exit criteria**

${p.exit.map((e) => `- [ ] ${e}`).join('\n')}

**Risks**

${p.risks.map((r) => `- ${r}`).join('\n')}

**Read:** ${p.links.map((l) => `[${l.label}](${abs(l.href)})`).join(', ')}`,
    )
    .join('\n\n');

  return `# 90-day agentic analytics rollout playbook

Thirteen weeks, one business domain, and a written decision at the end. Source: ${SITE}/rollout-playbook/ (Alex Merced, Agentic Analytics Now).

## Roles

${roles}

${phases}
`;
}
