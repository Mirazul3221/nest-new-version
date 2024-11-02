import { viewurl } from "./config";

export default function sitemap() {
    return [
      {
        url: `${viewurl}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: `${viewurl}/subject/english`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${viewurl}/subject/bangla`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ]
  }