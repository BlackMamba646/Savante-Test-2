export const ENVIRONMENT = {
  // URLs públicas (accesibles en cliente)
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  OFFICIAL_WEBSITE_URL:
    process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000",

  // CMS (SOLO servidor)
  CMS_SECRET_KEY: process.env.NEXT_CMS_SECRET_TOKEN || "",

  // BASE URL
  YOUTUBE_BASE_URL: "https://www.googleapis.com/youtube/v3",

  // API KEY
  YOUTUBE_API_KEY: process.env.NEXT_YOUTUBE_API_KEY || "",
  YOUTUBE_CHANNEL_ID: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || "",

  // Email
  SMTP_HOST: "",
  SMTP_EMAIL: "",
  SMTP_PASSWORD: "",
  SMTP_PORT: 123,
  EMAIL_INFO: "",

  // pagination
  MAX_PER_PROPERTIES: 9,
  MAX_PER_PROJECTS: 6,

  // Mortgage Calculator
  CAL_MIN_YEARS: 3,
  CAL_MAX_YEARS: 30,
  CAL_DEFAULT_YEARS: 20,

  CAL_MIN_INTEREST: 2,
  CAL_MAX_INTEREST: 15,
  CAL_DEFAULT_INTEREST: 4,

  CAL_DEFAULT_DOWN_PAYMENT: 25,
  CAL_DEFAULT_LOAN_AMOUNT: 33.8,

  //sitemap
  MAX_PROPERTIES_SITEMAP: 100,
  MAX_PROPERTIES_SEO: 100,

  // CACHE
  CACHE_REVALIDATE: 1800,

  // CURRENCY
  CURRENCY: "AED",

  // YOUTUBE MAX VIDEOS
  YOUTUBE_MAX_VIDEOS: 5,

  // Savante GPT
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
};
