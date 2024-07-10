import { Button } from '@mui/material';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LANG } from '../../../services/config';

const TextEditor = ()=> {
  const [value, setValue] = useState('');

  return (
    <div>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
        <Button onClick={()=>console.log(value)}>{LANG.GLOBAL.save}</Button>
    </div>
  );
}

export default TextEditor;