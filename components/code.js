import Codemirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { go } from '@codemirror/legacy-modes/mode/go';
import { sql } from '@codemirror/lang-sql';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-python'
import { StreamLanguage } from '@codemirror/language';
import { githubDark } from '@uiw/codemirror-theme-github'

export default function Code({ node }) {
  const langs = {
    javascript,
    go,
    python,
    sql,
    html,
    css,
    json,
  }

  if (!node || !node.code) {
    return <></>;
  }

  const { language, code } = node;

  return (
    <Codemirror 
      extensions={[langs[language] ? langs[language]() : javascript({ jsx: true })]}
      theme={"dark"}
      value={code}
      readOnly={true}
      editable={false}
    />
  )
}
