import dynamic from 'next/dynamic';
import { useEffect, useMemo } from 'react';

// Dynamically import JoditEditor with SSR disabled
const JoditEditor = dynamic(() => import('jodit-react'), {
    ssr: false
});

const JoditEditorWrapper = (props) => {
    // Default config with MathJax support
  const defaultConfig = useMemo(() => ({
    events: {
      change: () => {
        if (window.MathJax) {
          window.MathJax.typeset();
        }
      },
      afterSetMode: () => {
        if (window.MathJax) {
          window.MathJax.typeset();
        }
      }
    },
  }), []);
// useEffect(() => {
//     // Ensure MathJax is loaded
//     if (!document.getElementById("MathJax-script")) {
//       const script = document.createElement("script");
//       script.id = "MathJax-script";
//       script.async = true;
//       script.src =
//         "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
//       document.head.appendChild(script);
//     }
//   }, []);
    return (
        <div>
            <JoditEditor  config={{
    // Prevent Jodit from interpreting or executing MathJax
    processPaste: (html) => html,
    iframe: false,
    // Optional: Disable unwanted sanitization
    cleanHTML: {
      removeEmptyElements: false
    },
    // Optional: disable editing rendered HTML directly
    allowResizeX: false,
    allowResizeY: false
  }} {...props} />
        </div>
    );
};

export default JoditEditorWrapper;
