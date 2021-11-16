import Link from "next/link";
import Meta from "../components/head";
import { getDatabase, getPage } from "../services/getPosts";

const NOTION_BLOG_ID = "e75cb4251f67492eb20090ac629da31f";

export type Post = {
  id: string;
  slug: string;
  title: string;
  date: string;
  is_published: boolean;
  cover: {
    name: string;
    rawUrl: string;
    url: string;
  }[];
  type: string;
  description: string;
};

export const getServerSideProps = async () => {
  const database = await getDatabase(NOTION_BLOG_ID);

  return {
    props: {
      posts: database,
    },
  };
};

function HomePage({ posts }: { posts: any }) {
  return (
    <>
      <Meta />
      <div className="max-w-3xl p-4 font-sans">
        <section className="flex justify-center w-full">
          <div className="flex flex-col justify-center">
            <section>
              <h1 className="text-white text-4xl">My thoughts</h1>
            </section>
            {posts.map((post: any) => {
              if (post.properties.is_published.checkbox) {
                return (
                  <Link
                    href="/note/[slug]"
                    as={`/note/${post.properties.slug.rich_text[0].plain_text}`}
                    key={post.properties.slug.rich_text[0].plain_text}
                  >
                    <a className="w-full lg:flex my-4 flex-col">
                      <section>
                        <img
                          src={post.properties.cover.files[0].file?.url}
                          alt={post.properties.title.title.plain_text}
                          className="rounded-2xl"
                        />
                      </section>
                      <section className="flex flex-col justify-between leading-normal">
                        <h2 className="px-4 py-2 text-white font-bold text-lg">
                          {post.properties.title.title.plain_text}
                        </h2>
                        <section className="px-4 py-2">
                          <p className="text-gray-400">
                            {
                              post.properties.description.rich_text[0]
                                .plain_text
                            }
                          </p>
                          <div className="text-gray-300 italic">
                            jotted on {post.properties.date.date.start}
                          </div>
                        </section>
                      </section>
                    </a>
                  </Link>
                );
              }
            })}
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
