import storeContext from '@/app/global/createContex';
import { useSocket } from '@/app/userdashboard/global/SocketProvider';
import React, { useContext, useEffect, useState } from 'react'
import { HiOutlinePhoneMissedCall } from "react-icons/hi";
import { IoVideocamOffOutline } from "react-icons/io5";
import { GoDeviceCameraVideo } from "react-icons/go";
import { LuPhoneCall } from "react-icons/lu";
import '../../../components/cssfiles/waterdrop.css'
const CallReceiverRoom = () => {
  const {socket,createAnswer} = useSocket()
  const {store} = useContext(storeContext)
  const [window, setWindow] = useState(true)
  const [cancleWindow,setCancleWindow] = useState(false)
  const [data,setData] = useState(null)
  const [randomRingtone,setRandomRingtone] = useState('')
  const audio = new Audio('/call-ringtone/nokia-1600-47764.mp3')
  const autoPlay =async ()=>{
    try {
      await audio.play()
      audio.loop = true
    } catch (error) {
       console.log(error)
    }
 }//
// window && autoPlay()
  useEffect(() => {
    const ringtons = [
      'nokia-1600-47764.mp3',
      'Nokia 5300 Glow.mp3',
      'nokia_original.mp3',
      'nokia_bold.mp3',
      'nokia_1600.mp3',
      'zamil_zamil_arabic.mp3',
      'simple.mp3',
      'muhammad_nabina.mp3',
      'islamic_tone.mp3',
      'arabic_trend.mp3',
      'subhanallah_islamic_to.mp3',
      'ya_rabbe_mustafa.mp3',
      'sami_yusuf_urdu.mp3'
    ]
    socket?.on('signal-call',(data)=>{
      setCancleWindow(true)
      setWindow(true)
        setData(data)
        setRandomRingtone(ringtons[Math.floor(Math.random() * ringtons.length)])
    })
    return () => {
      socket?.off("signal-call")
    };
  }, [socket]);

  useEffect(() => {
   socket && socket?.on('end-call-signal',(res)=>{
       if (res) {
         setWindow(false)
       }
    })
    return () => {
      socket && socket?.off("end-call-signal")
    };
  }, [socket]);
  const handleReceiveCall = async()=>{
    console.log(data)
    setCancleWindow(false)
    const answer = await createAnswer(data?.offer)
   await socket?.emit('callStatus',{id:data?.senderId,msg:'call-received',answer})
  }

  const cancleCall =async ()=>{
    setCancleWindow(false)
   await socket?.emit('callStatus',{id:data?.senderId,msg:'call-cancle'})
  }
  return (
     <div>
       {
        cancleWindow &&    <div>
        {
          window ? <div className='w-screen h-screen bg-gray-300/60 text-white fixed flex justify-center items-center left-0 top-0 z-40'>
          <div className="md:w-3/12 md:h-2/3 w-full h-full rounded-2xl shadow-md bg-gray-50/90 md:bg-white justify-center flex items-center">
          <div className="relative">
          <h2 className='mb-4 text-lg text-center text-gray-700'>Incoming Call</h2>
            <img
              className="border-[3px] border-white mx-auto w-32 h-32 shadow-[-1px_5px_40px_0px_gray] rounded-full"
              src={data?.profile}
              alt="profile-image"
            />
            {data?.type === "Video" && (
              <h3 className="text-md md:text-2xl text-gray-500 text-center">
                {data?.name} is calling you
              </h3>
            )}
            {data?.type === "Audio" && (
              <h3 className="text:md md:text-2xl text-gray-500 text-center">
              {data?.name} is calling you
              </h3>
            )}
        <div className="flex justify-center items-center gap-14 mt-3 md:mt-6">
        <h4 onClick={()=>{
          cancleCall()
        }} className="text-white w-fit bg-red-500 p-2 rounded-full border-2 cursor-pointer" >
           {
            data?.type === 'Audio' ?  <HiOutlinePhoneMissedCall size={30}/> :  data?.type === 'Video' ?   <IoVideocamOffOutline size={30}/> : ''
           }
            </h4>
            <h4 onClick={handleReceiveCall} className="text-white duration-500 w-fit bg-green-500 p-2 rounded-full border-2 cursor-pointer drop" >
               <a target='_blank' href={`/userdashboard/components/messanger/video-audio-callcenter?my_peear=${encodeURIComponent(store.userInfo.id)}&friend_peear=${encodeURIComponent(data?.senderId)}&name=${encodeURIComponent(data?.name)}&profile=${data?.profile}&title=${data?.title}&type=${data?.type}&action=call-received`}>{data?.type === "Audio" ? <LuPhoneCall size={30}/> : data?.type === "Video" ? <GoDeviceCameraVideo size={30}/> : ''}</a>
            </h4>
        </div>
          </div>
        </div>
        <audio autoPlay loop src={`/call-ringtone/${randomRingtone}`}></audio>
      </div> : 
      <div className='w-screen h-screen bg-gray-300/60 text-white fixed flex justify-center items-center left-0 top-0 z-40'>
                  <div className="md:w-3/12 md:h-2/3 w-full h-full rounded-2xl shadow-md bg-gray-50/90 md:bg-white justify-center flex items-center">
          <div className="relative">
          <h2 className='mb-4 text-lg text-center text-gray-700'>Incoming call end</h2>
            <img
              className="border-[3px] border-white mx-auto w-32 h-32 shadow-[-1px_5px_40px_0px_gray] rounded-full"
              src={data?.profile}
              alt="profile-image"
            />
            <h2 className='text-gray-700 text-center mt-4 font-bold text-lg'>{data?.name}</h2>
        <div className="flex justify-center items-center gap-14 mt-3 md:mt-6">
        <h4 onClick={()=>{
          cancleCall()
        }} className="text-white w-fit bg-red-500 p-2 rounded-full border-2 cursor-pointer" >
           {
            data?.type === 'Audio' ?  <HiOutlinePhoneMissedCall size={30}/> :  data?.type === 'Video' ?   <IoVideocamOffOutline size={30}/> : ''
           }
            </h4>
            <h4 onClick={()=>{
          setCancleWindow(false)
        }} className="text-white w-fit bg-green-500 p-2 rounded-full border-2 cursor-pointer" >
               <a target='_blank' href={`/userdashboard/components/messanger/video-audio-callcenter?my_peear=${encodeURIComponent(store.userInfo.id)}&friend_peear=${encodeURIComponent(data?.senderId)}&name=${encodeURIComponent(data?.name)}&profile=${data?.profile}&title=${data?.title}&type=${data?.type}&action=call-start`}>{data?.type === "Audio" ? <LuPhoneCall size={30}/> : data?.type === "Video" ? <GoDeviceCameraVideo size={30}/> : ''}</a>
            </h4>
        </div>
          </div>
        </div>
      </div> 
        }
       </div>
       }
     </div>
  )
}

export default CallReceiverRoom
