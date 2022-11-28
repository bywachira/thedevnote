import React from "react";
// @ts-ignore
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../client";
import Code from "./code";

function urlFor(source: any) {
  return imageUrlBuilder(sanityClient).image(source);
}

export const serializer = {
  list: (props: any) => {
    const { type } = props;
    const bullet = type === "bullet";
    if (bullet) {
      return <ul className="list-disc pl-8 text-lg">{props.children}</ul>;
    }
    return <ol className="list-decimal pl-8 text-lg">{props.children}</ol>;
  },
  listItem: (props: any) => <li>{props.children}</li>,
  marks: {
    link: ({ mark, children }: any) => (
      <a
        href={mark.href}
        rel="noopener noreferrer"
        target="_blank"
        className="text-blue-400 underline"
      >
        {children}
      </a>
    ),
  },
  types: {
    code: (props: any) => {
      console.log({ props })
      return <Code node={props.node} />
    },
    image: (props: any) => (
      <figure className="has-text-centered">
        <img
          src={urlFor(props.node.asset).width(800).url()}
          alt={props.node.alt}
          style={{ borderRadius: "5px" }}
          className="rounded-2xl"
        />

        <figcaption>{props.node.caption}</figcaption>
      </figure>
    ),
    block(props: any) {
      switch (props.node.style) {
        case "h1":
          return (
            <h1 className="text-5xl font-extrabold my-2">{props.children}</h1>
          );

        case "h2":
          return <h2 className="font-bold text-4xl my-2">{props.children}</h2>;

        case "h3":
          return <h3 className="font-bold text-3xl my-2">{props.children}</h3>;

        case "h4":
          return <h4 className="font-bold text-2xl my-2">{props.children}</h4>;
        case "li":
          return <p className="text-lg">{props.children}</p>;
        case "blockquote":
          return (
            <blockquote className="border-l-4 pl-4 py-2 border-gray-600">
              {props.children}
            </blockquote>
          );
        case "normal":
          return (
            <p className="is-family-secondary is-size-5 my-2 text-lg">
              {props.children}
            </p>
          );
        default:
          return (
            <p className="is-family-secondary text-lg my-2">{props.children}</p>
          );
      }
    },
  },
};
