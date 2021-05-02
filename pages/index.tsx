import Link from "next/link";
import Meta from "../components/head";

const NOTION_BLOG_ID =
  process.env.NOTION_BLOG_ID || "7d52200c3d6e4e89a1fa20d855ff88f0";

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

export const getAllPosts = async (): Promise<Post[]> => {
  return await fetch(
    `https://notion.thedenseabyss.xyz/v1/table/${NOTION_BLOG_ID}`
  ).then((res) => res.json());
};

export async function getServerSideProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}

function HomePage({ posts }: { posts: Post[] }) {
  return (
    <>
      <Meta />
      <div className="content p-4 font-sans">
        <div className="grid grid-cols-1 divide-y divide-yellow-50">
          {posts.map((post) => {
            if (post?.is_published) {
              return (
                <Link
                  href="/note/[slug]"
                  as={`/note/${post.slug}`}
                  key={post.slug}
                >
                  <a className="w-full lg:flex my-4">
                    <section className="p-4 flex flex-col justify-between leading-normal">
                      <h2 className="text-white font-bold text-lg">
                        {post.title}
                      </h2>
                      <p className="text-gray-400">{post.description}</p>
                      {/* {post.cover && (
                        <section>
                          <img
                            src={post?.cover[0].url}
                            alt={post.title}
                            className="rounded-lg"
                          />
                        </section>
                      )} */}
                      <div className="text-gray-300 italic">
                        jotted on {post.date}
                      </div>
                    </section>
                  </a>
                </Link>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
