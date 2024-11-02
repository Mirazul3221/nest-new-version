import { baseurl } from "./config";

export default function sitemap() {
    return [
      {
        url: `${baseurl}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: `${baseurl}/subject/english`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseurl}/subject/bangla`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ]
  }