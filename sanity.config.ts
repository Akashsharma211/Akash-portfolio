import React from "react";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "portfolio-studio",
  title: "Akash Kumar Sharma",
  icon: () =>
    React.createElement("img", {
      src: "/logo.png",
      alt: "Akash Logo",
      width: 22,
      height: 22,
      style: { objectFit: "contain" },
    }),

  projectId: projectId || "disabled",
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
