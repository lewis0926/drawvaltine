import type { RichText } from '../schemas';

interface LexicalNode {
  type: string;
  text?: string;
  children?: LexicalNode[];
  format?: number | string;
  tag?: string;
  listType?: string;
  url?: string;
}

const FORMAT_BOLD = 1;
const FORMAT_ITALIC = 2;
const FORMAT_UNDERLINE = 8;
const FORMAT_STRIKETHROUGH = 4;
const FORMAT_CODE = 16;

function applyFormat(text: string, format: number): string {
  let result = text;
  if (format & FORMAT_CODE) result = `<code>${result}</code>`;
  if (format & FORMAT_BOLD) result = `<strong>${result}</strong>`;
  if (format & FORMAT_ITALIC) result = `<em>${result}</em>`;
  if (format & FORMAT_UNDERLINE) result = `<u>${result}</u>`;
  if (format & FORMAT_STRIKETHROUGH) result = `<s>${result}</s>`;
  return result;
}

function serializeNode(node: LexicalNode): string {
  if (node.type === 'text') {
    const text = node.text || '';
    const format = typeof node.format === 'number' ? node.format : 0;
    return applyFormat(escapeHtml(text), format);
  }

  const children = node.children?.map(serializeNode).join('') || '';

  switch (node.type) {
    case 'root':
      return children;
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'heading':
      const tag = node.tag || 'h1';
      return `<${tag}>${children}</${tag}>`;
    case 'list':
      const listTag = node.listType === 'number' ? 'ol' : 'ul';
      return `<${listTag}>${children}</${listTag}>`;
    case 'listitem':
      return `<li>${children}</li>`;
    case 'link':
      return `<a href="${escapeHtml(node.url || '')}">${children}</a>`;
    case 'quote':
      return `<blockquote>${children}</blockquote>`;
    case 'code':
      return `<pre><code>${children}</code></pre>`;
    case 'linebreak':
      return '<br />';
    default:
      return children;
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function serializeRichText(richText: RichText): string {
  if (!richText || typeof richText !== 'object') {
    return '';
  }

  const root = (richText as { root?: LexicalNode }).root;
  if (!root) {
    return '';
  }

  return serializeNode(root);
}
