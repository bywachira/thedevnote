import { css } from "goober";
import imageUrlBuilder from "@sanity/image-url";
//@ts-ignore
import BlockContent from "@sanity/block-content-to-react";
// @ts-ignore
import moment from "moment";
// @ts-ignore
import momentTz from "moment-timezone";
import Link from "next/link";
import Meta from "../../components/head";
import sanityClient from "../../client";
import { serializer } from "../../components/post";

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
      <section className="my-8">
        <h1 className="text-white text-center px-4 mb-2 font-sans text-5xl font-extrabold">
          {post.title}
        </h1>
        <section className="flex flex-col justify-center place-items-center">
          <section className="text-center text-white">
            <section className="flex justify-center place-items-center">
              {post.categories.map((item: string) => (
                <Link href={`/tag/${item}`}>
                  <a className="text-white underline mx-2 lowercase">
                    <p className="italic font-bold">{item}</p>
                  </a>
                </Link>
              ))}
            </section>
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
                `} text-white`}
              >
                <p className="font-extrabold">wachira</p>
                <p className="text-gray-400">@__wchr</p>
              </a>
            </section>
          </section>
        </section>
        <div className="content py-2">
          {post?.main_image && (
            <section
              className="w-full rounded-2xl h-96 pt-4 mb-2 grayscale bg-center text-center overflow-hidden"
              style={{
                backgroundImage: `url(${urlFor(post.main_image)
                  .width(1200)
                  .url()})`,
                backgroundSize: "cover",
              }}
            ></section>
          )}
          <article className="p-4 text-white font-serif leading-loose">
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
          {/* <Discord text={<section>Let's continue the chat on Discord</section>} /> */}
        </div>
      </section>
    </>
  );
};

export default BlogPost;
