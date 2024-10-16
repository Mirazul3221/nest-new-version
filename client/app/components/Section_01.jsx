import Image from 'next/image'
import React from 'react'
import mobile from '@/public/mobile-view.png'
const Section_01 = () => {
  return (
    <div className='w-full bg-white md:flex justify-between items-center p-4 md:px-20 md:mt-20'>
  <div className="md:flex justify-between items-center gap-6">
  <div className="left md:w-1/2 px-2">
  <h2 className='font-bold md:text-2xl pb-2 border-b-2'>কেন আপনি বিসিএস প্রি-পারেশান অনলাইন প্লাটফর্ম থেকে স্টাডি করবেন?</h2>
  <p className='md:text-lg mt-2'>বিসিএস প্রি পারেশান অনলাইন প্লাটফর্মটি সম্পূর্ণ নতুন একটি প্লাটফর্ম। এই প্লাটফর্মে আমার বাজারে প্রচলিত জব সলুশন বইয়ে যা আছে সেই সব প্রশ্ন ও এর সমাধান রাখতে চাই যাতে আপনি পরিপূর্ণ প্রস্তুতি নিতে কোন অংশে পিছিয়ে না পরেন। এছাড়া প্রতি প্রশ্নের সমাধানের এর সাথে প্রশ্ন সম্পর্কিত অসংখ্য তথ্য থাকবে যা আপনার পরিপূর্ণ প্রস্তুতি নিতে সহায়ক হবে। এছাড়া আপনার কছে যে প্রশ্নটি উত্তম মনে হবে সেটি সংরক্ষণ করে রাখার ব্যবস্থা থাকবে যেন আপনি পরবর্তীতে পড়তে পারেন</p>
   </div>
        <div className="right md:w-1/2">
            <Image className='md:h-2/3' src={mobile} alt='bcs_banner'/>
        </div>
  </div>
    </div>
  )
}

export default Section_01