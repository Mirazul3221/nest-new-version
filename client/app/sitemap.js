import { baseurl, viewurl } from "./config";

export default async function sitemap() {
    // const res = await fetch(`${baseurl}/allquestionscollection/findall`);
    // const data =await res.json()
    // const dynamicUrl = data.map((m)=>({
    //   url: `${viewurl}/singlequestion/${m.slug ? m.slug : m._id}`,
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly',
    //   priority: 1,
    // }))

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