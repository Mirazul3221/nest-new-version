import { computer, scrollToTop } from '@/app/assistantdashboard/components/data';
import React from 'react'

const Computer = ({ stage, setStage, chapter, setChapter }) => {
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
                    {computer.map((item) => (
                        <>
                            <option className='font-bold bg-gray-100' disabled>{item.subject}</option>
                            {
                                item.topic.map((topic, i) => {
                                    return <option key={i} disabled>{topic}</option>
                                })
                            }
                        </>
                    ))}
                </select>
            </div>

            {
                stage == 2 && <>
                    {
                        computer.map((item,i) => {
                           return <div key={i}>
                                <h3 className="bg-[#ed350c] text-lg font-bold text-center text-white px-2 rounded-md cursor-pointer">
                                    {item.subject}
                                </h3>
                                                   <div className="flex gap-3 flex-wrap mt-4 mb-8">

                        {item.topic.map((topic, i) => {
                            return (
                                <>
                                    <h3 key={i} onClick={(e) => { setChapter(e.target.innerText); setStage(3); scrollToTop() }} className="bg-[#ed350c] text-white px-2 w-fit text-sm rounded-md cursor-pointer">
                                        {topic}
                                    </h3>
                                </>
                            );
                        })}
                    </div>
                            </div>
                        })
                    }
                </>
            }

        </div>
    )
}

export default Computer
