import { baseurl, viewurl } from '@/app/config';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'


const MessangerContainerRight = ({id}) => {
    const [data,setData] = useState(null)
    useEffect(() => {
         const fetchuser =async ()=> {
                 try {
                    const { data } = await axios.get(
                        `${baseurl}/auth/publicuser/findbyid/${id}`
                      );

                      setData(data)
                 } catch (error) {
                    console.log(error)
                 }
         }

         fetchuser()
    }, [id]);

    console.log(data)
  return (
    <div>
        <div className="top flex items-center flex-col">
           {
             data?.profile? <img className='shadow-md rounded-full w-20' src={data?.profile} alt={data?.name}/> : <div className="w-20 h-20 rounded-full bg-gray-200"></div>
           }
          <a title='Click here and show details' className='font-semibold text-2xl mt-2' href={`${viewurl}/userdashboard/searchusers/${id}`} target="_blank" rel="noopener noreferrer">{data?.name}</a>
            <div className="mt-2">
            <h3>
                                       Member since{" "}
                                       <span className="font-semibold">
                                         {moment(data?.createdAt).format("MMM YYYY")}
                                       </span>
                                     </h3>
                                     <h2>User role as {data?.status}</h2>
                                     <h3>Learn more about <a title='Click here and show details' className='lowercase underline duration-75 hover:text-violet-500' href={`${viewurl}/userdashboard/searchusers/${id}`} target="_blank" rel="noopener noreferrer">{data?.name}</a></h3>
            </div>
        </div>

    </div>
  )
}

export default MessangerContainerRight