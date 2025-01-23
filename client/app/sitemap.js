import axios from "axios";
import { baseurl, viewurl } from "./config";

export default async function sitemap() {

    const {data} =await axios.get(`${baseurl}/allquestionscollection/publicUser/all`)
    const dynamicUrl = data.map((m)=>({
      url: `${viewurl}/singlequestion/${m.slug ? m.slug : m._id}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    }))

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
        url: `${viewurl}/blogs/static/how-to-prepare-myself-for-bcs-and-other-job`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${viewurl}/blogs/static/bcs-preliminary-exam`,
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
      ...dynamicUrl
    ]
  }