import type { ReactNode } from "react";

export default function MarkdownArticle({ markdown }: { markdown: string }) {
  const lines = markdown.replace(/\r\n/g, "\n").trim().split("\n");

  if (lines[0]?.startsWith("# ")) lines.shift();

  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const Heading = heading[1].length === 1 ? "h2" : heading[1].length === 2 ? "h3" : "h4";
      blocks.push(
        <Heading
          key={index}
          className={`mt-12 text-gray-950 first:mt-0 ${
            Heading === "h2"
              ? "text-2xl font-semibold leading-tight md:text-3xl"
              : Heading === "h3"
                ? "text-xl font-semibold leading-tight md:text-2xl"
                : "text-lg font-semibold leading-tight"
          }`}
        >
          {inline(heading[2])}
        </Heading>,
      );
      index += 1;
      continue;
    }

    if (/^-{3,}$/.test(line)) {
      blocks.push(<hr key={index} className="my-10 border-gray-200" />);
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().slice(2));
        index += 1;
      }
      blocks.push(
        <ul key={index} className="my-6 list-disc space-y-3 pl-6 text-base leading-8 text-gray-600">
          {items.map((item) => <li key={item}>{inline(item)}</li>)}
        </ul>,
      );
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }
      blocks.push(
        <ol key={index} className="my-6 list-decimal space-y-3 pl-6 text-base leading-8 text-gray-600">
          {items.map((item) => <li key={item}>{inline(item)}</li>)}
        </ol>,
      );
      continue;
    }

    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quote.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push(
        <blockquote key={index} className="my-8 border-l-2 border-gray-900 bg-gray-50 px-6 py-5 text-base italic leading-8 text-gray-600">
          {quote.map((item) => <p key={item}>{inline(item)}</p>)}
        </blockquote>,
      );
      continue;
    }

    if (line.startsWith("|") && lines[index + 1]?.trim().startsWith("|")) {
      const header = cells(line);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(cells(lines[index].trim()));
        index += 1;
      }
      blocks.push(
        <div key={index} className="my-8 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm text-gray-600">
            <thead>
              <tr>{header.map((cell) => <th key={cell} className="border border-gray-200 bg-gray-50 px-4 py-3 font-semibold text-gray-900">{inline(cell)}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>{row.map((cell) => <td key={cell} className="border border-gray-200 px-4 py-3 align-top">{inline(cell)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    const paragraph: string[] = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index].trim())) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push(<p key={index} className="my-6 text-base leading-8 text-gray-600">{inline(paragraph.join(" "))}</p>);
  }

  return <div className="mt-12 border-t border-gray-200 pt-10"><div className="mx-auto max-w-4xl">{blocks}</div></div>;
}

function isBlockStart(line: string) {
  return /^(#{1,3})\s+|^-{3,}$|^-\s+|^\d+\.\s+|^>|^\|/.test(line);
}

function cells(line: string) {
  return line.split("|").slice(1, -1).map((cell) => cell.trim());
}

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\*[^*]+\*)/g).filter(Boolean).map((part, index) => {
    if ((part.startsWith("**") && part.endsWith("**")) || (part.startsWith("__") && part.endsWith("__"))) {
      return <strong key={index} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index} className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.9em] text-gray-900">{part.slice(1, -1)}</code>;
    }
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    return <span key={index}>{part}</span>;
  });
}
