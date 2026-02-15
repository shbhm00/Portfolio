/**
 * MarkdownContent Component
 *
 * A custom markdown renderer that handles:
 * - Code blocks with language labels and copy button
 * - Headers (h1-h4) with anchor IDs for TOC linking
 * - Bold, italic, and inline code
 * - Blockquotes
 * - Horizontal rules
 * - Ordered and unordered lists
 * - Checkboxes
 *
 * WHY custom instead of a library:
 * - Zero additional dependencies
 * - Tailored to the blog content format
 * - Full control over styling and interactions
 */

import { useState, useCallback, useMemo } from 'react';
import { slugify } from '@/utils';

interface MarkdownContentProps {
  content: string;
}

// ============================================================================
// Inline Formatting
// ============================================================================

/**
 * Processes inline markdown formatting within a text string.
 * Handles: **bold**, *italic*, `inline code`, and [links](url)
 */
function renderInlineContent(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Match bold, italic, inline code, and links
  const inlineRegex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)|(\[(.+?)\]\((.+?)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = inlineRegex.exec(text)) !== null) {
    // Add plain text before this match
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // **bold**
      nodes.push(
        <strong key={match.index} className="font-semibold text-stone-900 dark:text-stone-50">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // *italic*
      nodes.push(
        <em key={match.index} className="italic">
          {match[4]}
        </em>
      );
    } else if (match[5]) {
      // `inline code`
      nodes.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-primary-600 dark:text-primary-400 text-[0.875em] font-mono"
        >
          {match[6]}
        </code>
      );
    } else if (match[7]) {
      // [link](url)
      nodes.push(
        <a
          key={match.index}
          href={match[9]}
          className="text-primary-600 dark:text-primary-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {match[8]}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

// ============================================================================
// Code Block Component
// ============================================================================

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  return (
    <div className="group relative my-6 rounded-xl overflow-hidden bg-stone-900 dark:bg-stone-950 shadow-soft">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-stone-800 dark:bg-stone-900 border-b border-stone-700">
        <div className="flex items-center gap-2">
          {/* Terminal dots */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          {language && (
            <span className="ml-2 text-xs font-mono text-stone-400 uppercase tracking-wider">
              {language}
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-stone-400 hover:text-stone-200 hover:bg-stone-700 transition-all duration-200"
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code className="text-stone-300 font-mono">
            {code.split('\n').map((line, idx) => (
              <div key={idx} className="table-row">
                <span className="table-cell pr-4 text-right text-stone-600 select-none text-xs w-8">
                  {idx + 1}
                </span>
                <span className="table-cell">{line || ' '}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

// ============================================================================
// Block Types
// ============================================================================

interface TextBlock {
  type: 'paragraph';
  content: string;
}

interface HeaderBlock {
  type: 'header';
  level: 1 | 2 | 3 | 4;
  content: string;
  id: string;
}

interface CodeBlockData {
  type: 'code';
  language: string;
  code: string;
}

interface ListBlock {
  type: 'list';
  ordered: boolean;
  items: string[];
}

interface BlockquoteBlock {
  type: 'blockquote';
  content: string;
}

interface HrBlock {
  type: 'hr';
}

interface ChecklistBlock {
  type: 'checklist';
  items: { checked: boolean; text: string }[];
}

type Block =
  | TextBlock
  | HeaderBlock
  | CodeBlockData
  | ListBlock
  | BlockquoteBlock
  | HrBlock
  | ChecklistBlock;

// ============================================================================
// Content Parser
// ============================================================================

function parseMarkdown(content: string): Block[] {
  const lines = content.split('\n');
  const blocks: Block[] = [];

  let i = 0;
  let currentList: { ordered: boolean; items: string[] } | null = null;
  let currentChecklist: { checked: boolean; text: string }[] | null = null;
  let currentBlockquote: string[] | null = null;

  const flushList = () => {
    if (currentList) {
      blocks.push({ type: 'list', ...currentList });
      currentList = null;
    }
  };

  const flushChecklist = () => {
    if (currentChecklist) {
      blocks.push({ type: 'checklist', items: currentChecklist });
      currentChecklist = null;
    }
  };

  const flushBlockquote = () => {
    if (currentBlockquote) {
      blocks.push({ type: 'blockquote', content: currentBlockquote.join('\n') });
      currentBlockquote = null;
    }
  };

  const flushAll = () => {
    flushList();
    flushChecklist();
    flushBlockquote();
  };

  while (i < lines.length) {
    const line = lines[i]!;

    // Code blocks
    if (line.trimStart().startsWith('```')) {
      flushAll();
      const language = line.trimStart().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i]!.trimStart().startsWith('```')) {
        codeLines.push(lines[i]!);
        i++;
      }
      i++; // skip closing ```
      blocks.push({ type: 'code', language, code: codeLines.join('\n') });
      continue;
    }

    // Horizontal rules
    if (/^---+$/.test(line.trim())) {
      flushAll();
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    // Headers (check ### before ## before # to avoid false matches)
    const headerMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headerMatch) {
      flushAll();
      const level = headerMatch[1]!.length as 1 | 2 | 3 | 4;
      const content = headerMatch[2]!;
      const id = slugify(content);
      blocks.push({ type: 'header', level, content, id });
      i++;
      continue;
    }

    // Blockquotes
    if (line.startsWith('> ') || line === '>') {
      flushList();
      flushChecklist();
      const text = line.startsWith('> ') ? line.slice(2) : '';
      if (currentBlockquote) {
        currentBlockquote.push(text);
      } else {
        currentBlockquote = [text];
      }
      i++;
      continue;
    } else {
      flushBlockquote();
    }

    // Checklist items
    const checkMatch = line.match(/^-\s+\[([ xX])\]\s+(.+)$/);
    if (checkMatch) {
      flushList();
      const checked = checkMatch[1] !== ' ';
      const text = checkMatch[2]!;
      if (currentChecklist) {
        currentChecklist.push({ checked, text });
      } else {
        currentChecklist = [{ checked, text }];
      }
      i++;
      continue;
    } else {
      flushChecklist();
    }

    // Unordered list items
    if (line.match(/^-\s+(.+)$/)) {
      flushChecklist();
      const text = line.replace(/^-\s+/, '');
      if (currentList && !currentList.ordered) {
        currentList.items.push(text);
      } else {
        flushList();
        currentList = { ordered: false, items: [text] };
      }
      i++;
      continue;
    }

    // Ordered list items
    const olMatch = line.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      flushChecklist();
      const text = olMatch[1]!;
      if (currentList && currentList.ordered) {
        currentList.items.push(text);
      } else {
        flushList();
        currentList = { ordered: true, items: [text] };
      }
      i++;
      continue;
    }

    // Flush any pending lists
    flushList();

    // Empty lines
    if (!line.trim()) {
      i++;
      continue;
    }

    // Regular paragraphs
    blocks.push({ type: 'paragraph', content: line });
    i++;
  }

  // Flush remaining
  flushAll();

  return blocks;
}

// ============================================================================
// Block Renderers
// ============================================================================

function renderBlock(block: Block, index: number): React.ReactNode {
  switch (block.type) {
    case 'header':
      return renderHeader(block, index);
    case 'code':
      return <CodeBlock key={index} code={block.code} language={block.language} />;
    case 'paragraph':
      return (
        <p key={index} className="mb-4 text-stone-700 dark:text-stone-300 leading-relaxed">
          {renderInlineContent(block.content)}
        </p>
      );
    case 'list':
      return renderList(block, index);
    case 'blockquote':
      return (
        <blockquote
          key={index}
          className="my-6 pl-4 border-l-4 border-primary-500 dark:border-primary-400 bg-primary-50/50 dark:bg-primary-950/20 py-3 pr-4 rounded-r-lg"
        >
          <p className="text-stone-700 dark:text-stone-300 italic leading-relaxed">
            {renderInlineContent(block.content)}
          </p>
        </blockquote>
      );
    case 'hr':
      return (
        <hr
          key={index}
          className="my-10 border-none h-px bg-gradient-to-r from-transparent via-stone-300 dark:via-stone-600 to-transparent"
        />
      );
    case 'checklist':
      return (
        <ul key={index} className="my-4 space-y-2">
          {block.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  item.checked
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'border-stone-300 dark:border-stone-600'
                }`}
              >
                {item.checked && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </span>
              <span className="text-stone-700 dark:text-stone-300 leading-relaxed">
                {renderInlineContent(item.text)}
              </span>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

function renderHeader(block: HeaderBlock, index: number) {
  const baseClasses =
    'font-display text-stone-900 dark:text-stone-50 scroll-mt-24 group';

  switch (block.level) {
    case 1:
      return (
        <h2 key={index} id={block.id} className={`${baseClasses} text-2xl md:text-3xl mt-12 mb-5`}>
          {renderInlineContent(block.content)}
          <a href={`#${block.id}`} className="ml-2 opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity text-primary-500" aria-hidden>
            #
          </a>
        </h2>
      );
    case 2:
      return (
        <h3 key={index} id={block.id} className={`${baseClasses} text-xl md:text-2xl mt-10 mb-4`}>
          {renderInlineContent(block.content)}
          <a href={`#${block.id}`} className="ml-2 opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity text-primary-500" aria-hidden>
            #
          </a>
        </h3>
      );
    case 3:
      return (
        <h4 key={index} id={block.id} className={`${baseClasses} text-lg md:text-xl mt-8 mb-3`}>
          {renderInlineContent(block.content)}
          <a href={`#${block.id}`} className="ml-2 opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity text-primary-500" aria-hidden>
            #
          </a>
        </h4>
      );
    case 4:
      return (
        <h5 key={index} id={block.id} className={`${baseClasses} text-base md:text-lg mt-6 mb-2 font-medium`}>
          {renderInlineContent(block.content)}
        </h5>
      );
    default:
      return null;
  }
}

function renderList(block: ListBlock, index: number) {
  const Tag = block.ordered ? 'ol' : 'ul';
  return (
    <Tag
      key={index}
      className={`my-4 space-y-2 ${
        block.ordered
          ? 'list-decimal pl-6 marker:text-primary-500 dark:marker:text-primary-400 marker:font-semibold'
          : 'pl-1'
      }`}
    >
      {block.items.map((item, idx) => (
        <li
          key={idx}
          className={`text-stone-700 dark:text-stone-300 leading-relaxed ${
            block.ordered
              ? 'pl-1'
              : 'flex items-start gap-3'
          }`}
        >
          {!block.ordered && (
            <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-primary-400" />
          )}
          <span>{renderInlineContent(item)}</span>
        </li>
      ))}
    </Tag>
  );
}

// ============================================================================
// Exported Utilities
// ============================================================================

/**
 * Extracts heading information from markdown content for table of contents.
 */
export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(content: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const lines = content.split('\n');

  let inCodeBlock = false;
  for (const line of lines) {
    if (line.trimStart().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{1,4})\s+(.+)$/);
    if (match) {
      headings.push({
        id: slugify(match[2]!),
        text: match[2]!,
        level: match[1]!.length,
      });
    }
  }

  return headings;
}

// ============================================================================
// Main Component
// ============================================================================

export function MarkdownContent({ content }: MarkdownContentProps) {
  const blocks = useMemo(() => parseMarkdown(content), [content]);

  return (
    <div className="prose-custom max-w-none">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}
