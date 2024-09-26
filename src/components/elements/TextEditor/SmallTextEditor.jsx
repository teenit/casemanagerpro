import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@mui/material';
import { LANG } from '../../../services/config';
import { formats, modules } from './constants';

const SmallTextEditor = ({ onChange, value }) => {
 
  return (
    <div className='SmallTextEditor'>
      <ReactQuill
        className='TextEditor-editor'
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
     
    </div>
  );
};

export default SmallTextEditor;
