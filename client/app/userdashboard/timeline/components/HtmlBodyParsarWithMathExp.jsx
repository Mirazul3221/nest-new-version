import HTMLReactParser from 'html-react-parser';
import React, { useEffect, useRef } from 'react';

const HtmlBodyParsarWithMathExp = ({ content }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise && ref.current) {
      window.MathJax.typesetPromise([ref.current]);
    }
  }, [content]);

  return (
    <div ref={ref}>
      {HTMLReactParser(content)}
    </div>
  );
};

export default HtmlBodyParsarWithMathExp;
