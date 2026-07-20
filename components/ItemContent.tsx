'use client';

import { Fragment } from 'react';
import type { ContentBlock } from '@/lib/types';

/* Parse lightweight inline formatting: **bold** and `term`. */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="ic-term">{part.slice(1, -1)}</code>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case 'heading':
      return <h4 className="ic-heading">{renderInline(block.text)}</h4>;

    case 'para':
      return <p className="ic-para">{renderInline(block.text)}</p>;

    case 'list':
      if (block.ordered) {
        return (
          <ol className="ic-list ic-list-ordered">
            {block.items.map((li, i) => <li key={i}>{renderInline(li)}</li>)}
          </ol>
        );
      }
      return (
        <ul className="ic-list">
          {block.items.map((li, i) => <li key={i}>{renderInline(li)}</li>)}
        </ul>
      );

    case 'table':
      return (
        <div className="ic-table-wrap">
          <table className="ic-table">
            {block.caption && <caption className="ic-table-caption">{renderInline(block.caption)}</caption>}
            <thead>
              <tr>
                {block.headers.map((h, i) => <th key={i}>{renderInline(h)}</th>)}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c} className={c === 0 ? 'ic-td-label' : undefined}>{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'examples':
      return (
        <div className="ic-examples">
          {block.items.map((ex, i) => (
            <div key={i} className="ic-example">
              <span className="ic-example-de">{renderInline(ex.de)}</span>
              <span className="ic-example-en">{ex.en}</span>
            </div>
          ))}
        </div>
      );

    case 'callout':
      return (
        <div className={`ic-callout ic-callout-${block.tone ?? 'tip'}`}>
          {renderInline(block.text)}
        </div>
      );

    case 'code':
      return <pre className="ic-code">{block.text}</pre>;

    default:
      return null;
  }
}

export default function ItemContent({ content }: { content: ContentBlock[] }) {
  return (
    <div className="item-content-rich">
      {content.map((block, i) => <Block key={i} block={block} />)}
    </div>
  );
}
