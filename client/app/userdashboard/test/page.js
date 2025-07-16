'use client';

import { useEffect, useState, useRef } from 'react';

export default function ScrollProgressBar() {
  const [showBar, setShowBar] = useState(false);
  const [progress, setProgress] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Direction check
      if (currentScrollY < lastScrollY.current) {
        setShowBar(true); // Scrolling up
      } else {
        setShowBar(false); // Scrolling down
      }

      // Scroll progress calculation
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setProgress(scrolled);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
   <div>
       <div className='w-full h-[200vh] bg-amber-300'></div>
        <div
      className={`fixed bottom-0 left-0 h-1 bg-blue-500 transition-opacity duration-300 ${
        showBar ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ width: `${progress}%` }}
    />
   </div>
  );
}
