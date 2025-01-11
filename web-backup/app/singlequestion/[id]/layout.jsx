import { baseurl, viewurl } from "@/app/config";
export async function generateMetadata({ params }) {
  // console.log(dynamicUrl)
    const res = await fetch(`${baseurl}/allquestionscollection/publicUser/find/${params.id}`);
    const data = await res.json();
    const Q = data[0];
   console.log(params)
    return {
      title: `${Q.question} from bcs online platform`,
      description:`You will get answer of ${Q.question.slice(0, 42)}... | proper job solution, bcs preparation guide line and more from BCS preparation platform`,
      keywords:`${Q.topic},${Q.subject},${Q.option_01},${Q.option_02},${Q.option_03},${Q.option_04}`,
      alternates:{
        canonical:`${viewurl}/singlequestion/${params.id}`
      }
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
  