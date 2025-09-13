import { mathTopicValue, scrollToTop } from '@/app/assistantdashboard/components/data'
import React from 'react'

const Math3 = ({ stage, setStage, chapter, setChapter }) => {
  return (
    <div>
           <div className="hidden md:block">
                  <label htmlFor="chapter">Chapter</label>
                 <select
                   required
                   value={chapter}
                   onChange={(e) => setChapter(e.target.value)}
                   className="outline-none flex w-28 py-1 px-2 rounded-md border"
                 >
            <option value="others">others</option>
                   {mathTopicValue[3].value.map((item, i) => (
                     <option key={i}>{item}</option>
                   ))}
                 </select>
               </div>
           
                         {
                       stage == 2 && <div className="flex gap-2 flex-wrap mt-4 mb-8">
               
                         {mathTopicValue[3].value.map((topic,i) => {
                           return (
                             <>
                                 <h3  key={i} onClick={(e) => { setChapter(e.target.innerText); setStage(3);scrollToTop()}} className="bg-green-500 text-white px-2 w-fit text-sm rounded-md cursor-pointer">
                                     {topic}
                                   </h3>
                             </>
                           );
                         })}
                       </div>
                     }
    </div>
  )
}

export default Math3
