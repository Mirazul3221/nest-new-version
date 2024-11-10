'use client'

import React, { useState } from 'react'
import { useEffect } from 'react'

const Page = () => {
    const [loading,setLod] = useState(false)
useEffect(() => {
     const myFunc = ()=>{
        console.log(loading)
        console.log(window.scrollY + window.innerHeight)
        if ( window.scrollY + window.innerHeight >= document.body.offsetHeight-100) {
          console.log('yes') 
          setLod(true) 
        }
     }
    window.addEventListener('scroll',myFunc)
    return () => {
      window.removeEventListener('scroll',myFunc)  
    };
}, [loading]);
  return (
    <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia dolorem quasi voluptatem ipsa molestiae placeat necessitatibus omnis error aliquam vero, maxime nam, numquam beatae inventore ipsam. Eius repellendus quibusdam tenetur.
    </div>
  )
}

export default Page