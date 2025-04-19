'use client'

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Editor01 = ({ value, id ,func }) => {
  const modules = useMemo(() => ({
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link'],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['blockquote', 'code-block'],
      [{ color: [] }, { background: [] }],
      [{ direction: 'rtl' }],
      ['clean'],
    ],
  }), []);

  return (
    <div className="editor-container">
      <ReactQuill
        value={value}
        onChange={(e)=>{func(id,'projectDescription',e)}}
        modules={modules}
        theme="snow"
      />
    </div>
  );
};

export default Editor01;
