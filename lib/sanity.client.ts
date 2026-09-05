import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "snu4zq4v";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// API version date
const apiVersion = "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Use CDN for published content (fast, cached reads)
  useCdn: true,
});
