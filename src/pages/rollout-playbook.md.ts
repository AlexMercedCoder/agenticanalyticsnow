import type { APIRoute } from 'astro';
import { playbookMarkdown } from '../data/leader-markdown';

export const GET: APIRoute = () =>
  new Response(playbookMarkdown(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
