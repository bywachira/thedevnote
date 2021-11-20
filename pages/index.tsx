import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
//@ts-ignore
import BlockContent from "@sanity/block-content-to-react";
// @ts-ignore
import moment from "moment";
// @ts-ignore
import momentTz from "moment-timezone";
import Meta from "../components/head";
import sanityClient from "../client";

function urlFor(source: any) {
  return imageUrlBuilder(sanityClient).image(source);
}

export const getServerSideProps = async () => {
  const response = await sanityClient.fetch(`
    *[_type == "post" && publishedAt < now()]|order(publishedAt desc){
      title,
      body,
      slug,
      description,
      "main_image": mainImage,
      "author_name": author->name,
      "categories": categories[]->title,
      "author_image": author->image,
      "published_at": publishedAt
    }
  `);

  return {
    props: {
      posts: response,
    },
  };
};

function HomePage({ posts }: { posts: any }) {
  return (
    <>
      <Meta />
      <section className="w-full mx-auto">
        <div className="max-w-3xl p-4 font-sans mx-auto">
          <section className="flex justify-left w-full">
            <div className="flex flex-col justify-center">
              {posts.map((post: any) => {
                return (
                  <Link
                    href="/note/[slug]"
                    as={`/note/${post.slug.current}`}
                    key={post.slug.current}
                  >
                    <a className="w-full lg:flex my-4 flex-col">
                      <section>
                        {post.main_image && (
                          <img
                            src={urlFor(post.main_image).width(800).url()}
                            alt={post.title}
                            className="filter grayscale rounded-2xl"
                          />
                        )}
                      </section>
                      <section className="flex flex-col justify-between leading-normal">
                        <h2 className="px-2 py-2 text-white font-bold text-2xl">
                          {post.title}
                        </h2>
                        <section className="px-2 py-2">
                          <p className="text-white">{post.description}</p>
                          <div className="text-gray-600 italic">
                            jotted on{" "}
                            {moment(
                              momentTz
                                .tz(post.published_at, momentTz.tz.guess())
                                .format()
                            ).format("MMMM Do YYYY HH:MM")}
                          </div>
                        </section>
                      </section>
                    </a>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default HomePage;
