"use client";

import markdownStyles from "./markdown-styles.module.css";
import ReactMarkdown from "react-markdown";
import { CodeComponent } from "react-markdown/lib/ast-to-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
  content: string;
};

const CodeBlock: CodeComponent = ({ inline, className, children }) => {
  if (inline) {
    return <code className={className}>{children}</code>;
  }
  const match = /language-(\w+)/.exec(className || "");
  const lang = match && match[1] ? match[1] : "";

  return (
    <SyntaxHighlighter
      style={a11yDark}
      language={lang}
      children={String(children).replace(/\n$/, "")}
    />
  );
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className={markdownStyles["markdown"]}>
        <ReactMarkdown
          children={content}
          components={{
            code: CodeBlock,
          }}
        />
      </div>
    </div>
  );
};

export default PostBody;
