import type { MetadataRoute } from "next";

const baseUrl = "https://www.lotolipi.space";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${baseUrl}/lo-lab`, changeFrequency: "monthly", priority: 0.8 },
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/work/workatlas`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/resume`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/lottolov`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
