/* eslint-disable @next/next/no-img-element */
import { css } from "goober";
import Link from "next/link";
import React from "react";

export default function Nav(): React.ReactElement {
  return (
    <nav
      className={`w-full flex justify-center ${css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 99;
        background-color: rgba(22, 21, 21, 0.5);
        backdrop-filter: blur(5px);
      `}`}
    >
      <section className={`flex justify-between place-items-center`}>
        <a
          href="https://twitter.com/__wchr"
          target="_blank"
          className="hover:text-white text-gray-400" rel="noreferrer"
        >
          Twitter
        </a>
        <Link href={`/`} passHref={true}>
          <section className="px-10 py-4">
            <img src="/thedevnote.svg" className="w-16" alt="the-dev-note" />
          </section>
        </Link>
        <a
          href="https://discord.gg/rJuy8brmKn"
          target="_blank"
          className="hover:text-white text-gray-400" rel="noreferrer"
        >
          Discord
        </a>
      </section>
    </nav>
  );
}

// font-family: 'Inter',-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
// -webkit-box-align: center;
// align-items: center;
// display: flex;
// -webkit-box-pack: justify;
// justify-content: space-between;
// margin: auto;
// max-width: 980px;
// padding-bottom: 20px;
// padding-left: 20px;
// padding-right: 20px;
// padding-top: 20px;
