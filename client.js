import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "cyvlslus",
  dataset: "production",
  useCdn: true,
});
