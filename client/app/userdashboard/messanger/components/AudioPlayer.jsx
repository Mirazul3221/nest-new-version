'use client'
import React, { useRef } from 'react'

const AudioPlayer = ({audioSrc,duration}) => {
      const audioRef = useRef(null);
  return (
    <div>
        <audio src={audioSrc} controls></audio>
        <p>{duration}</p>
    </div>
  )
}

export default AudioPlayer
