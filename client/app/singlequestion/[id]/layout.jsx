import { baseurl } from "@/app/config";
import HTMLReactParser from "html-react-parser";

// app/posts/[id]/layout.jsx (Server Component)
export async function generateMetadata({ params }) {
    const res = await fetch(`${baseurl}/allquestionscollection/singleUser/find/${params.id}`);
    const Q = await res.json();
   console.log('don')
    return {
      title: Q.question,
      description: HTMLReactParser(Q.description),
      keywords:`${Q.topic},${Q.subject},${Q.option_01},${Q.option_02},${Q.option_03},${Q.option_04}`,
    //   openGraph: {
    //     title: Q.question,
    //     description: Q.description,
    //     url: `${baseurl}/singlequestion/${params.id}`,
    //   },
    };
  }
  
  export default function PostLayout({ children }) {
    return <>{children}</>;
  }
  