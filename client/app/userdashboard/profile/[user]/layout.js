import { baseurl, viewurl } from "@/app/config";
export async function generateMetadata({ params }) {
  // console.log(dynamicUrl)
    const res = await fetch(`${baseurl}/auth/publicuser/findbyid/${params.user}`);
    const data = await res.json();
 return {
    title:`${ data.name} || profile || edu++`,
    description:data.description,
    keywords: `${data.name}, eduplusplus, job solution, bcs question bank`,
    alternates: {
      canonical: `${baseurl}/userdashboard/profile/${params.id}`,
    },
    openGraph: {
    title:`${ data.name} || profile || edu++`,
    description:data.description,
      url:  `${baseurl}/userdashboard/profile/${params.id}`,
      images: [
        {
          url: `${data.profile}`, // you can dynamically generate this
          width: 630,
          height: 630,
          alt: data.name,
        },
      ],
      siteName: 'EDU ++',
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
    title:`${ data.name} || profile || edu++`,
    description:data.description,
      images: [`${data.profile}`],
    },
  };
  }
  export default function ProfileLayout({ children }) {
    return <>{children}</>;
  }//
  