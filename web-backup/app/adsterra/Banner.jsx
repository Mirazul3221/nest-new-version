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

    return <div className="justify-center items-center text-white text-center" ref={banner}></div>
}
