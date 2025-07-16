// "use client"
// import React from 'react'
// import ProtectRoute from '@/app/global/ProtectRoute';
// import Link from 'next/link';
// import { CgProfile } from 'react-icons/cg';
// import { IoHomeOutline } from 'react-icons/io5';
// import { AiFillHeart } from 'react-icons/ai';
// // import { usePathname } from 'next/navigation';

// const Page = () => {

//   //  const filterQuestions = (sub)=>{
//   //     const filter = allQuestion.filter((question)=>question.subject == sub)
//   //     return filter
//   //  }
//   //  console.log(filterQuestions("English"), allQuestion)
//     //===============================
//     // const pathNamme = usePathname()
//     // console.log(pathNamme)
//   return (
//         <ProtectRoute>
//               <div className='md:p-20 p-2 md:w-1/2'>
//              <Link href={'./myfavourite/bangla'}>  <h2 className='py-2 px-6 mb-1 bg-[#3e19fa] text-center text-white rounded-lg cursor-pointer text-2xl'>Bangla</h2></Link>
//              <Link href={'./myfavourite/english'}>  <h2 className='py-2 px-6 mb-2 bg-[#3e19fa] text-center text-white rounded-lg cursor-pointer text-2xl'>English</h2></Link>
//        </div>
//             <div className="mobile-responsive flex justify-center items-center gap-2 fixed bottom-2 left-[50%] -translate-x-[50%]">
//             <div className=""><div className={`p-2 rounded-full bg-gray-200 shadow-md shadow-gray-500`}> <Link href={"./myprofile"}><CgProfile size={30} /></Link></div></div>
//             <div className=""><div className="p-2 rounded-full bg-gray-200 shadow-md shadow-gray-500"> <Link href={"/"}><IoHomeOutline size={30} /></Link></div></div>
//             <div className=""><div className={`${pathNamme == "/userdashboard/myfavourite" ? "bg-[#3e19fa] text-white scale-110 duration-500" : ""} p-2 rounded-full `}> <Link href={"./myfavourite"}><AiFillHeart size={30}/></Link></div></div>
//           </div>
//         </ProtectRoute>
//   )
// }

// export default Page
///
