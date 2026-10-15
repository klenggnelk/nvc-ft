import type { MetadataRoute } from "next";

// Web app manifest: name and icon used when the app is added to a home screen (Android/Chrome).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NVC Foundation Training",
    short_name: "NVC Edu",
    description: "Resources, exercises and self-checks for participants in the NVC Foundation Training.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f4",
    theme_color: "#1d3767",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
