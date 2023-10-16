/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

export default function Nav(): React.ReactElement {
  return (
    <nav>
      <section
        className={`flex justify-between px-[32px] py-[8px] md:px-[32px] place-items-center gap-x-2`}
      >
        <Link
          href="https://twitter.com/__wchr"
          target="_blank"
          className="hover:text-black text-gray-400 w-auto min-w-[40px] min-h-[40px] flex place-items-center justify-center gap-x-2"
          rel="noreferrer"
        >
          <img className="h-5 w-5" src={"/logo-black.png"} alt={"x-logo"} />
          <span className="font-bold text-black select-none hidden md:block">
            follow on X
          </span>
        </Link>
        <Link href={`/`} passHref={true}>
          <section className="flex place-items-center gap-x-2">
            <div className="rounded-full">
              <img
                src="https://res.cloudinary.com/anotherone/image/upload/v1697339587/Group_1_abafpz.svg"
                className="h-10 w-10 rounded-full"
                alt="the-dev-note"
              />
            </div>
            <span className="font-bold select-none hidden md:block">
              thedevnote
            </span>
          </section>
        </Link>
        <Link
          href="https://wchr.xyz"
          target="_blank"
          className="hover:text-black text-gray-400 w-auto min-w-[40px] min-h-[40px] flex justify-center"
          rel="noreferrer"
        >
          <section className="flex place-items-center gap-x-2">
            <div className="p-[4px] border-[2px] border-black animate-rainbow-border rounded-full">
              <img
                src="https://res.cloudinary.com/anotherone/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688485357/PXL_20221223_223600623_2_2_cmvcal.jpg?_s=public-apps"
                className="h-5 w-5 rounded-full"
                alt="the-dev-note"
              />
            </div>
            <span className="font-bold text-black select-none hidden md:block animate-rainbow-color">
              {"<about-me />"}
            </span>
          </section>
        </Link>
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
