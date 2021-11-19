import { Fragment } from "react";

export const Text = ({ text }: { text: string }) => {
  return <p className="text-lg text-white">{text}</p>;
};

export const formatBlocks = (blocks: any) => {
  let _blocks: any = [];

  blocks.forEach((block: any) => {
    Object.assign(_blocks, {
      [block.type]: block,
    });
  });

  return _blocks;
};

export const renderBlock = (block: any) => {
  const { type, id } = block;
  const value = block[type];

  console.log({ type, value });

  switch (type) {
    case "column_list":
      return (
        <section>
          {value.children.map((item: string) => {
            return renderBlock(item);
          })}
        </section>
      );

    case "paragraph":
      return (
        <p>
          {value.text.map((item: any) => {
            return <Text text={item.plain_text} />;
          })}
        </p>
      );
    case "callout":
      return (
        <section className="flex">
          <section className="mr-2">
            {value.icon.type === "emoji" && value.icon.emoji}
          </section>
          <section>
            {value.text.map((item: any) => {
              if (item.href) {
                return (
                  <a href={item.href} className="flex flex-col justify-left">
                    <p>{item.plain_text}</p>
                  </a>
                );
              } else {
                return <p>{item.plain_text}</p>;
              }
            })}
          </section>
        </section>
      );
    case "divider":
      return <hr />;
    case "heading_1":
      return (
        <h1>
          {value.text.map((item: any) => {
            return <Text text={item.plain_text} />;
          })}
        </h1>
      );
    case "heading_2":
      return (
        <h2>
          {value.text.map((item: any) => {
            return <Text text={item.plain_text} />;
          })}
        </h2>
      );
    case "heading_3":
      return (
        <h3>
          {value.text.map((item: any) => {
            return <Text text={item.plain_text} />;
          })}
        </h3>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li>
          {value.text.map((item: any) => {
            return <Text text={item.plain_text} />;
          })}
        </li>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            {value.text.map((item: any) => {
              return <Text text={item.plain_text} />;
            })}
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            {value.text.map((item: any) => {
              return <Text text={item.plain_text} />;
            })}
          </summary>
          {value.children?.map((block: any) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      );
    case "child_page":
      return <p>{value.title}</p>;
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};
