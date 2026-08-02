import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dasoftwaresystems.web.app";
  const lastModified = new Date();
  return ["", "/privacy-policy", "/account-deletion"].map((path) => ({ url: `${baseUrl}${path}`, lastModified, changeFrequency: "yearly", priority: path === "" ? 1 : 0.5 }));
}
