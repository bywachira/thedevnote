import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "tailwindcss/tailwind.css";
import { setup } from "goober";
import { prefix } from "goober-autoprefixer";
import AppLayout from "../layouts/app-layout";

import "../styles.css";
import React from "react";

setup(React.createElement, prefix);

export default function MyApp({ Component, pageProps }: any) {
  const getLayout =
    Component?.getLayout ||
    ((page: React.ReactNode) => <AppLayout children={page} />);

  return getLayout(<Component {...pageProps} />);
}
