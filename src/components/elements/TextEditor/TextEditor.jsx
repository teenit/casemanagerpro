import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Icon from '../Icons/Icon';
import { formats, modules } from './constants';

const TextEditor = ({ saveHandler, val }) => {
  const [value, setValue] = useState(val)
  const [initialValue, setInitialValue] = useState(val)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    setValue(val)
    setInitialValue(val)
  }, [val])

  const changeHandler = (newValue) => {
    setValue(newValue)
    setDisabled(newValue === initialValue)
  };

  const save = () => {
    if (disabled) return
    saveHandler(value);
    setInitialValue(value)
    setDisabled(true)
  };
setInterval(() => {
  save()
}, 30000);
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
      <div className='TextEditor-icon' style={{ opacity: disabled ? "0.5" : "1" }}>
        <Icon icon={"save"} addClass={"save-icon fs40"} onClick={save} />
      </div>
    </div>
  );
};

export default TextEditor;
