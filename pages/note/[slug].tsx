/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { css } from "goober";
import imageUrlBuilder from "@sanity/image-url";
//@ts-ignore
import BlockContent from "@sanity/block-content-to-react";
// @ts-ignore
import moment from "moment";
// @ts-ignore
import momentTz from "moment-timezone";
import Meta from "../../components/head";
import sanityClient from "../../client";
import { serializer } from "../../components/post";
import { useEffect } from "react";
import splitbee from "@splitbee/web";

function urlFor(source: any) {
  return imageUrlBuilder(sanityClient).image(source);
}

export async function getServerSideProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const response = await sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
    title,
    body,
    slug,
    "main_image": mainImage,
    "author_name": author->name,
    "categories": categories[]->title,
    "author_image": author->image,
    "published_at": publishedAt
  }`,
    {
      slug,
    }
  );

  return {
    props: {
      post: response,
    },
  };
}

const BlogPost: React.FC<{ post: any }> = ({ post }) => {
  if (!post) return null;

  useEffect(() => {
    const action: string = `reading-post-${post.slug.current}`;

    const data: any = {};

    splitbee.track(action, data);
  }, [post.slug]);

  return (
    <>
      <Meta
        title={post.title}
        image={`/api/og?title=${post.title}`}
        description={`Post Tag: ${post.categories.join(
          ","
        )}, Was jotted: ${moment(
          momentTz.tz(post.published_at, momentTz.tz.guess()).format()
        ).format("MMMM Do YYYY HH:MM")}`}
        link={`https://thedevnote.xyz/note/${post.slug.current}`}
      />
      <section className="my-8">
        <h1 className="text-black text-center px-4 mb-2 max-w-screen text-5xl font-extrabold">
          {post.title}
        </h1>
        <section className="flex flex-col justify-center place-items-center">
          <section className="text-center text-black">
            {/* <section className="flex justify-center place-items-center">
              {post.categories.map((item: string) => (
                <Link href={`/tag/${item}`} key={item}>
                  <p className="italic font-bold">{item}</p>
                </Link>
              ))}
            </section> */}
            <p>
              {moment(
                momentTz.tz(post.published_at, momentTz.tz.guess()).format()
              ).format("D/MM/YYYY")}
            </p>
            <section className="flex place-items-center space-x-2 my-4">
              {post.author_image && (
                <img
                  className="h-10 w-10 rounded-full ring-2 ring-white"
                  src={urlFor(post.author_image).width(100).url()}
                  alt={post.author_name}
                />
              )}
              <a
                href="https://twitter.com/__wchr"
                target="_blank"
                className={`${css`
                  display: grid;
                  grid-template-columns: 1fr;
                  grid-template-rows: repeat(2, 1fr);
                  grid-column-gap: 0px;
                  grid-row-gap: 0px;
                `} text-black`}
                rel="noreferrer"
              >
                <p className="font-extrabold">wachira</p>
                <p className="text-gray-400">@__wchr</p>
              </a>
            </section>
          </section>
        </section>
        <div className="content py-2">
          <img
            src={`/api/og?title=${post.title}`}
            alt={post.title}
            className="filter grayscale rounded-2xl"
          />
          <article className="p-4 text-black font-serif leading-loose">
            <BlockContent
              blocks={post.body}
              imageOptions={{ w: 320, h: 240, fit: "max" }}
              {...sanityClient.config()}
              serializers={{
                types: serializer.types,
                list: serializer.list,
                listItem: serializer.listItem,
                marks: serializer.marks,
              }}
            />
          </article>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
