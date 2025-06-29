import HTMLReactParser from 'html-react-parser';
import React, { useEffect, useReducer } from 'react'

const HtmlBodyParsarWithMathExp = ({ content }) => {
      const ref = useReducer(null);
     useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([ref.current]);
    }
  }, [content]);
  return (
   <h2 ref={ref}>
      {HTMLReactParser(`${content}`)}
    </h2>
  )
}

export default HtmlBodyParsarWithMathExp