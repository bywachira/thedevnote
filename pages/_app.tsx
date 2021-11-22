import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "tailwindcss/tailwind.css";
import { setup } from "goober";
import { prefix } from "goober-autoprefixer";
import AppLayout from "../layouts/app-layout";

import "../styles.css";
import React, { useEffect } from "react";
import splitbee from "@splitbee/web";

setup(React.createElement, prefix);

export default function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    splitbee.init({
      scriptUrl: "/bee.js",
      apiUrl: "/_hive",
    });
  }, []);

  const getLayout =
    Component?.getLayout ||
    ((page: React.ReactNode) => <AppLayout children={page} />);

  return getLayout(<Component {...pageProps} />);
}
