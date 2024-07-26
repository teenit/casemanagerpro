import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@mui/material';
import { LANG } from '../../../services/config';
import { formats, modules } from './constants';

const TextEditor = ({ saveHandler, val, close }) => {
  const [value, setValue] = useState(val);
  const [initialValue, setInitialValue] = useState(val);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setValue(val);
    setInitialValue(val);
  }, [val]);

  useEffect(() => {
    const autoSave = setInterval(() => {
      if (!disabled) {
        save();
      }
    }, 30000);

    return () => clearInterval(autoSave);
  }, [value, disabled]);

  const changeHandler = (newValue) => {
    setValue(newValue);
    setDisabled(newValue === initialValue);
  };

  const save = () => {
    if (disabled) return;
    saveHandler(value);
    setInitialValue(value);
    setDisabled(true);
  };

  return (
    <div className='TextEditor'>
      <ReactQuill
        className='TextEditor-editor'
        theme="snow"
        value={value}
        onChange={changeHandler}
        modules={modules}
        formats={formats}
      />
      <div className='TextEditor-buttons'>
        <Button disabled={disabled} variant='contained' onClick={()=>{
          save()
          close()
        }}>{LANG.GLOBAL.save}</Button>
        <Button color='error' variant='contained' onClick={close}>{LANG.GLOBAL.close}</Button>
      </div>
    </div>
  );
};

export default TextEditor;
