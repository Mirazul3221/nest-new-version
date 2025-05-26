'use client';

import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';

export default function ProfileCardHover() {
  const [showCard, setShowCard] = useState(false);
  const [position, setPosition] = useState('bottom'); // 'top' or 'bottom'
  const profileRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!showCard) return;

    const profile = profileRef.current;
    const card = cardRef.current;
    if (!profile || !card) return;

    // Timeout allows the card to render first so its height can be measured
    const timeout = setTimeout(() => {
      const profileRect = profile.getBoundingClientRect();
      const cardHeight = card.offsetHeight;
      const spaceAbove = profileRect.top;
      const spaceBelow = window.innerHeight - profileRect.bottom;

      if (spaceBelow >= cardHeight + 10) {
        setPosition('bottom');
      } else if (spaceAbove >= cardHeight + 10) {
        setPosition('top');
      } else {
        setPosition(spaceBelow > spaceAbove ? 'bottom' : 'top');
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [showCard]);

  return (
    <div className="relative bg-gray-50">
      {[...Array(50)].map((_, i) => (
            <div className='bg-white mt-5 border w-1/2 p-5 mx-auto rounded-md'>
                <Card id={'67e2e13c4d945e960076e49e'}> <img className='w-32 h-32 cursor-pointer rounded-full' alt='Hello world' src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/366788529/original/efecf2bcbf7c8d1499921b4718d233364f2ef92a.png"/></Card>
                <Card id={'67e2e13c4d945e960076e49e'}><h2 className='font-bold text-2xl cursor-pointer'>Toriqul Islam</h2> </Card>    
                <h2 className='font-bold'>Dsj jdskgjds kjkdfg jgd ggj gkjdgsd gjngd gildsg gjdg sgljsg skgjsd gksdg hhg
                     kgsklg lgksdlkg jkgdsklg sgk jsdkg jkjk mkj j lsfjk gkjsgsd gkjsdngs gkjsg skdjgsg sjdgnsjdg skdjgs 
                     sdkgjsg slgs dgkjsgnsgsbsng sk  gsgsd gjkag kjgadgna gkjaga gjakg kgjdg gjksdgn gsdjngsd gksjdbgsd
                     jdgkls kgsdkg agkjdh ajg ngajfga ajhga kag akjgah hgahsfa sjhasgf
                    </h2>     
            </div>
      ))}
      <div
        ref={cardRef}
        onMouseEnter={() => setShowCard(true)}
        onMouseLeave={() => setShowCard(false)}
        className={`absolute w-64 p-4 bg-white rounded shadow-lg z-50 transition-opacity duration-200
          ${showCard ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}
        `}
      >
        <h4 className="font-bold text-lg mb-2">John Doe</h4>
        <p className="text-sm text-gray-600">Web Developer at Example Co.</p>
      </div>
    </div>
  );
}
