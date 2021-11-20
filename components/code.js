import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Code({ node }) {
  if (!node || !node.code) {
    return null;
  }
  const { language, code } = node;
  return (
    <SyntaxHighlighter language={language || "text"} style={dark}>
      {code}
    </SyntaxHighlighter>
  );
}
