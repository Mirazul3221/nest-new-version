'use client'
import React from 'react'
const ShareAPI = ({title,uri}) => {
  const share = ()=> {
if (navigator.share) {
  navigator.share({
    title: `${title}`,
    text: 'Check out this question!',
    url: `https://bcs-prep.vercel.app/${uri}`
  })
  .then(() => console.log('Successfully shared'))
  .catch((error) => console.error('Share failed:', error));
} else {
  alert('Sharing not supported on this browser');
}
  }
  return (
    <div>
        <h2 onClick={share}>Share</h2>
    </div>
  )
}

export default ShareAPI