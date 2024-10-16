'use client'
import React from 'react'
const EntryPoint = ({user}) => {
    const {myId,fdId,name,profile,title,type} = user
    const handleCallEntry = () => {
        const url = `/userdashboard/components/messanger/video-audio-callcenter?my_peear=${encodeURIComponent(myId)}&friend_peear=${encodeURIComponent(fdId)}&name=${encodeURIComponent(name)}&profile=${profile}&title=${title}&type=${type}&action=call-start`
        const config = 'width = 1440,height = 800, resizable=yes, scrollbars=yes'
        window.open(url,'_blank',config)
      }

        return (
          <div>
              <h2 className='cursor-pointer' onClick={handleCallEntry}>{type}</h2>
          </div>
        )
}

export default EntryPoint
//