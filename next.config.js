const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
    sw: "/service-worker.js",
  },
  target: "serverless",
  images: {
    domains: ["assets.vercel.com", "s3.us-west-2.amazonaws.com"],
  },
});
