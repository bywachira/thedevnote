import { css } from "goober";
import { NotionRenderer, BlockMapType } from "react-notion";

import { Post } from "..";
import Discord from "../../components/discord";
import Meta from "../../components/head";
import { getBlocks, getDatabase, getPage } from "../../services/getPosts";

const NOTION_BLOG_ID = "e75cb4251f67492eb20090ac629da31f";

export async function getServerSideProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  // Get all posts again
  const posts = await getDatabase(NOTION_BLOG_ID);

  // Find the current blogpost by slug
  const post: any = posts.find(
    (t: any) => t.properties.slug.rich_text[0].plain_text === slug
  );

  const page = await getPage(post.id);

  const blocks = await getBlocks(post.id);

  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block: any) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  return {
    props: {
      blocks: blocksWithChildren,
      post: page,
    },
  };
}

const BlogPost: React.FC<{ post: Post; blocks: BlockMapType }> = ({
  post,
  blocks,
}) => {
  if (!post) return null;

  return (
    <>
      <Meta
        title={post.title}
        image={post?.cover[0].url}
        description={`Post Tag: ${post.type}, Was jotted: ${post.date}`}
        link={`https://thedevnote.xyz/note/${post.slug}`}
      />
      <div className="content py-2">
        <h1 className="text-white px-4 mb-2 font-sans text-3xl font-extrabold">
          {post.title}
        </h1>
        {post?.cover && (
          <section
            className="w-full h-96 pt-4 mb-2 grayscale bg-center text-center overflow-hidden"
            style={{ backgroundImage: `url(${post?.cover[0].url})` }}
          ></section>
        )}
        <section className="flex p-4 my-4 justify-between place-items-center">
          <section className="flex place-items-center space-x-2">
            <img
              className="h-10 w-10 rounded-full ring-2 ring-white"
              src="https://pbs.twimg.com/profile_images/1388605610028109829/e5FX97PB_400x400.jpg"
              alt="__wchr"
            />
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
          <div className="text-white">jotted on {post.date}</div>
        </section>
        <article className="p-4 text-white font-serif">
          <NotionRenderer blockMap={blocks} />
        </article>
        <Discord text={<section>Let's continue the chat on Discord</section>} />
      </div>
    </>
  );
};

export default BlogPost;
