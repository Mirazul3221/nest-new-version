import Image from 'next/image'
import React from 'react'
import bangla from '@/public/subtitleimgs/bangla.jpg'
import english from '@/public/subtitleimgs/english.jpg'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
const Layout = () => {
    const subjectsInfo1 = [
        {title:"বাংলা",image:bangla,countInfo:"Total 14000",link:'/subject/bangla'},
        {title:"ইংরেজি",image:english,countInfo:"Total 12000",link:'/subject/english'},
        {title:"গণিত",image:english,countInfo:"Total 15000",link:'/subject/math'},
        {title:"সাধারণ জ্ঞান",image:english,countInfo:"Total 15000",link:'#'},
    ]
    const subjectsInfo2 = [
        {title:"ভূগোল",image:english,countInfo:"Total 15000",link:'#'},
        {title:"আইসিটি",image:english,countInfo:"Total 15000",link:'#'},
        {title:"নাগরিক",image:english,countInfo:"Total 15000",link:'#'},
        {title:"অন্যান্য",image:english,countInfo:"Total 15000",link:'#'},
    ]
    const settings1 = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        centerPadding: "60px",
        slidesToScroll: 1,
        autoplay: true,
        rtl: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
    const settings2 = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        centerPadding: "60px",
        slidesToScroll: 1,
        autoplay: true,
        rtl: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
  return (
    <div>
         <Slider {...settings1}>
         {subjectsInfo1.map((sub,i)=>{
         return (
          
             <div key={i}>
                 <Card title={sub.title} image={sub.image} countInfo={sub.countInfo} link={sub?.link}  />
             </div>
       
         )
       })} 
         </Slider>
         <Slider {...settings2}>
         {subjectsInfo2.map((sub,i)=>{
         return (
          
             <div key={i}>
                 <Card title={sub.title} image={sub.image} countInfo={sub.countInfo} link={sub?.link}  />
             </div>
       
         )
       })} 
         </Slider>
    </div>
  )
}

export default Layout

const Card = ({title,image,countInfo,link}) => {
    return (
        <>
        <Link href={link}>
           <div className="cursor-pointer shadow-md mt-4 mx-2 rounded-md border-2 md:border-4 bg-gray-100 flex justify-between">
              <div className='bg-gray-200 md:rounded-r-[60px] rounded-r-3xl w-1/2 py-2 pl-4 md:py-10 md:pl-10'>
              <h2 className='md:text-2xl text-gray-500 font-bold mb-4 md:mb-16'>{title}</h2>
             <p className='text-sm md:text-lg'>{countInfo}</p>
              </div>
             <Image className='md:w-[160px] w-[60px] py-2 pr-4 md:py-10 md:pr-10' src={image} alt='image'/>
           </div>
           </Link>
        </>
    )
}
