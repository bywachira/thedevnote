import "react-notion/src/styles.css";
import "tailwindcss/tailwind.css";
import { Analytics } from "@vercel/analytics/react";
import { setup } from "goober";
import { prefix } from "goober-autoprefixer";
import AppLayout from "../layouts/app-layout";

import "../styles.css";
import "../public/prism.css";
import React from "react";

setup(React.createElement, prefix);

export default function MyApp({ Component, pageProps }: any) {
  const getLayout =
    Component?.getLayout ||
    ((page: React.ReactNode) => <AppLayout>{page}</AppLayout>);

  return getLayout(
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
