module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['your-image-domain.com'], // Replace with your image domains
  },
  env: {
    CLERK_FRONTEND_API: process.env.CLERK_FRONTEND_API,
    CLERK_API_KEY: process.env.CLERK_API_KEY,
    MEILISEARCH_URL: process.env.MEILISEARCH_URL,
    MEILISEARCH_API_KEY: process.env.MEILISEARCH_API_KEY,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
  },
};