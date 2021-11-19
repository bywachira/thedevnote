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

  return (
    <>
      <Meta
        title={post.title}
        image={post.main_image && urlFor(post.main_image).width(1200).url()}
        description={`Post Tag: ${post.categories.join(
          ","
        )}, Was jotted: ${moment(
          momentTz.tz(post.published_at, momentTz.tz.guess()).format()
        ).format("MMMM Do YYYY HH:MM")}`}
        link={`https://thedevnote.xyz/note/${post.slug.current}`}
      />
      <div className="content py-2">
        <h1 className="text-white px-4 mb-2 font-sans text-3xl font-extrabold">
          {post.title}
        </h1>
        {post?.main_image && (
          <section
            className="w-full h-96 pt-4 mb-2 grayscale bg-center text-center overflow-hidden"
            style={{
              backgroundImage: `url(${urlFor(post.main_image)
                .width(1200)
                .url()})`,
            }}
          ></section>
        )}
        <section className="flex p-4 my-4 justify-between place-items-center">
          <section className="flex place-items-center space-x-2">
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
              `} text-white`}
            >
              <p className="font-extrabold">wachira</p>
              <p className="text-gray-400">@__wchr</p>
            </a>
          </section>
          <div className="text-white">
            jotted on{" "}
            {moment(
              momentTz.tz(post.published_at, momentTz.tz.guess()).format()
            ).format("MMMM Do YYYY HH:MM")}
          </div>
        </section>
        <article className="p-4 text-white font-serif">
          <BlockContent
            blocks={post.body}
            imageOptions={{ w: 320, h: 240, fit: "max" }}
            {...sanityClient.config()}
          />
        </article>
        {/* <Discord text={<section>Let's continue the chat on Discord</section>} /> */}
      </div>
    </>
  );
};

export default BlogPost;
