import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.lotolipi.space/sitemap.xml",
    host: "https://www.lotolipi.space",
  };
}
