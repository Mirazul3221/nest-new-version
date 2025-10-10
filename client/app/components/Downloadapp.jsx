import React from 'react'

const Downloadapp = () => {
 return (
    <a
      href="/app/base.apk"  // path inside /public
      download            // forces download instead of opening
      className="sm:text-sm px-4 py-2 bg-[#623bff] text-white rounded-lg hover:bg-[#4719ff]"
    >
      <span className='hidden md:block'>Download Prograssive App (Android)</span>
      <span className='md:hidden'>Download App (Android)</span>
    </a>
  );
}

export default Downloadapp
