import { Button } from '@mui/material';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LANG } from '../../../services/config';

const TextEditor = ({ width,save, val}) => {
  const [value, setValue] = useState(val);

  return (
    <div className='TextEditor'>
      <ReactQuill className='TextEditor-editor' style={{ width: width ? width : "100%" }} theme="snow" value={value} onChange={setValue} />
      <Button variant='contained' onClick={() => {
        console.log(value);
        save(value)
      }}>{LANG.GLOBAL.save}</Button>
    </div>
  );
}

export default TextEditor;