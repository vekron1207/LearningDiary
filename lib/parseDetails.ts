import type { ContentBlock } from './types';

/* ────────────────────────────────────────────────────────────
   Convert a legacy plain-text `details` string into structured
   ContentBlocks so every track (JS, Java, LeetCode, German legacy
   phases) renders through the same polished component — real lists,
   headings, paragraphs, and clean code panels for aligned/indented
   content (conjugation tables, code samples).

   Conventions in the source data:
     • / - / *        → bullet list
     1. 2. 3.         → ordered list
     2+ leading spaces → code / aligned block (tables, samples)
     short line + ":" → section heading
     everything else  → paragraph (consecutive lines join)
   ──────────────────────────────────────────────────────────── */

function dedent(lines: string[]): string {
  const indents = lines
    .filter(l => l.trim() !== '')
    .map(l => (l.match(/^\s*/)?.[0].length ?? 0));
  const min = indents.length ? Math.min(...indents) : 0;
  return lines.map(l => l.slice(min)).join('\n').replace(/\s+$/, '');
}

export function parseLegacyDetails(text: string): ContentBlock[] {
  const lines = text.split('\n');
  const blocks: ContentBlock[] = [];

  let listBuf: string[] = [];
  let listOrdered = false;
  let codeBuf: string[] = [];
  let paraBuf: string[] = [];

  const flushList = () => {
    if (listBuf.length) {
      blocks.push({ kind: 'list', ordered: listOrdered, items: listBuf });
      listBuf = [];
    }
  };
  const flushCode = () => {
    if (codeBuf.length) {
      blocks.push({ kind: 'code', text: dedent(codeBuf) });
      codeBuf = [];
    }
  };
  const flushPara = () => {
    if (paraBuf.length) {
      blocks.push({ kind: 'para', text: paraBuf.join(' ') });
      paraBuf = [];
    }
  };
  const flushAll = () => { flushList(); flushCode(); flushPara(); };

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '');

    if (line.trim() === '') { flushAll(); continue; }

    const bullet = line.match(/^\s*[•\-*·]\s+(.*)$/);
    const numbered = line.match(/^\s*(\d+)[.)]\s+(.*)$/);
    const indented = /^\s{2,}/.test(line);

    if (bullet) {
      flushCode(); flushPara();
      if (listBuf.length && listOrdered) flushList();
      listOrdered = false;
      listBuf.push(bullet[1]);
      continue;
    }
    if (numbered) {
      flushCode(); flushPara();
      if (listBuf.length && !listOrdered) flushList();
      listOrdered = true;
      listBuf.push(numbered[2]);
      continue;
    }
    if (indented) {
      flushList(); flushPara();
      codeBuf.push(line);
      continue;
    }

    /* Non-indented, non-list line */
    flushList(); flushCode();
    const trimmed = line.trim();
    const isHeading = /:$/.test(trimmed) && trimmed.length <= 42 && !/[.!?]/.test(trimmed.slice(0, -1));
    if (isHeading) {
      flushPara();
      blocks.push({ kind: 'heading', text: trimmed.replace(/:$/, '') });
    } else {
      paraBuf.push(trimmed);
    }
  }

  flushAll();
  return blocks;
}
