import { useEffect, useRef } from 'react'
export function Banner() {
    const banner = useRef()

   const atOptions = {
    'key' : 'a8180de7a0d7ef81fa2e6c1b2cad2f75',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
};
    useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
        const conf = document.createElement('script')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `//www.topcreativeformat.com/${atOptions.key}/invoke.js`
        conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

        banner.current.append(conf)
        banner.current.append(script)
    }
}, [banner])

    return <div className="mx-2 my-5 border border-gray-200 justify-center items-center text-white text-center" ref={banner}></div>
}
export function BannerMobile({key,format="iframe",height,width,}) {
    const banner = useRef()

   const atOptions = {
    'key' : '1e4c448d5eee38ea6fe4d00ccc81e2f1',
    'format' : 'iframe',
    'height' : 300,
    'width' : 160,
    'params' : {}
};
    useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
        const conf = document.createElement('script')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `//www.topcreativeformat.com/${atOptions.key}/invoke.js`
        conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

        banner.current.append(conf)
        banner.current.append(script)
    }
}, [banner])

    return <div className="mx-2 my-5 border border-gray-200 justify-center items-center text-white text-center" ref={banner}></div>
}


export function BannerMobile1({key,format="iframe",height,width,}) {
    const bannerm = useRef()

   const atOptions = {
    'key' : '1e4c448d5eee38ea6fe4d00ccc81e2f1',
    'format' : 'iframe',
    'height' : 300,
    'width' : 160,
    'params' : {}
};
    useEffect(() => {
    if (bannerm.current && !bannerm.current.firstChild) {
        const conf = document.createElement('script')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `//www.topcreativeformat.com/${atOptions.key}/invoke.js`
        conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

        bannerm.current.append(conf)
        bannerm.current.append(script)
    }
}, [bannerm])

    return <div className="mx-2 my-5 border border-gray-200 justify-center items-center text-white text-center" ref={bannerm}></div>
}