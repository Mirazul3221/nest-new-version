import { baseurl } from "@/app/config";
export async function generateMetadata({ params }) {
  // console.log(dynamicUrl)
    const res = await fetch(`${baseurl}/allquestionscollection/publicUser/find/${params.id}`);
    const data = await res.json();
    const Q = data[0];
   console.log(params)
    return {
      title: Q.question,
      description:`${Q.topic},${Q.subject},${Q.option_01},${Q.option_02},${Q.option_03},${Q.option_04}`,
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
  