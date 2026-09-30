import type { APIRoute } from 'astro';
import { checklistMarkdown } from '../data/leader-markdown';

export const GET: APIRoute = () =>
  new Response(checklistMarkdown(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
