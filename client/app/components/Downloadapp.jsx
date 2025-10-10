import React from 'react'

const Downloadapp = () => {
 return (
    <a
      href="/app/base.apk"  // path inside /public
      download            // forces download instead of opening
      className="px-4 py-2 bg-[#623bff] text-white rounded-lg hover:bg-[#4719ff]"
    >
      Download Prograssive App (Android)
    </a>
  );
}

export default Downloadapp
