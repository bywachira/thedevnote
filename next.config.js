const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const rewrites = async () => [
  {
    destination: 'https://cdn.splitbee.io/sb.js',
    source: '/sb.js',
  },
  {
    destination: 'https://hive.splitbee.io/:slug',
    source: '/sb-api/:slug'
  }
]

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
  rewrites
});
