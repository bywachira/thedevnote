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

module.exports = {
  images: {
    domains: ["assets.vercel.com", "s3.us-west-2.amazonaws.com"],
  },
  rewrites
};
