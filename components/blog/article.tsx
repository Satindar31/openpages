import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import raw from "rehype-raw";
import katex from "rehype-katex";
import "katex/dist/katex.min.css";

import sanitize from "rehype-sanitize";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Article({
  content,
  title,
  author,
}: {
  content: string;
  title: string;
  author: { name: string };
}) {
  return (
    <div>
      <h1>{title}</h1>
      <h2>{author.name}</h2>
      <Markdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[raw, katex, sanitize]}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                ref={undefined}
                PreTag="div"
                // eslint-disable-next-line react/no-children-prop
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={materialLight}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
        className={"markdown"}
        // eslint-disable-next-line react/no-children-prop
        children={content}
      />
    </div>
  );
}
