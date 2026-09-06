import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// API version date
const apiVersion = "2024-01-01";

// Only enable Sanity if a project ID other than the old template default (snu4zq4v) is set
export const isSanityConfigured = Boolean(projectId && projectId.trim() !== "" && projectId !== "snu4zq4v");

export const client = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

