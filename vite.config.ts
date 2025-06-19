import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// Get repository name from package.json or use a default name
// This will be used as the base path for GitHub Pages deployments
const getRepoName = () => {
  // Extract repository name from package.json or use a default
  // You may need to adjust this for your specific repo name
  return "StitchCounter2";
};

// Determine if we're building for GitHub Pages or running locally
const isGitHubPages = process.env.NODE_ENV === "production";
const base = isGitHubPages ? `/${getRepoName()}/` : "/";

// https://vite.dev/config/
export default defineConfig({
  base, // Set the base path for assets
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
