import SyntaxHighlighter from "react-syntax-highlighter";

export default function Code({ node }) {
  if (!node || !node.code) {
    return null;
  }
  const { language, code } = node;
  return (
    <SyntaxHighlighter customStyle={{
      background: "#000",
      borderRadius: "8px"
    }} language={language || "text"}>{code}</SyntaxHighlighter>
  );
}
