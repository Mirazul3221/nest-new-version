'use client'
// components/DisplayQuestion.jsx
import { useEffect } from "react";

const DisplayQuestion = ({ htmlContent }) => {
  useEffect(() => {
    if (!window.MathJax) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
      script.async = true;
      script.onload = () => window.MathJax.typeset();
      document.head.appendChild(script);
    } else {
      window.MathJax.typeset();
    }
  }, [htmlContent]);

  return (
    <div
      className="prose mt-4 p-4 border border-gray-300 rounded w-full h-full overflow-auto"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default DisplayQuestion;
