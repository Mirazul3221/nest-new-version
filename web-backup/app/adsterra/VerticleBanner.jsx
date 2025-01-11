import { useEffect, useRef } from 'react'
export default function VerticleBanner() {
    const banner = useRef()

	const 	atOptions = {
		'key' : '0d3e5bc30b579ee2841b922929a369db',
		'format' : 'iframe',
		'height' : 600,
		'width' : 160,
		'params' : {}
	};

    useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
        const conf = document.createElement('script')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `//www.highperformanceformat.com/${atOptions.key}/invoke.js`
        conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

        banner.current.append(conf)
        banner.current.append(script)
    }
}, [banner])

    return <div className="mx-2 my-2 justify-center items-center text-white text-center" ref={banner}></div>
}


