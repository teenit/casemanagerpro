import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@mui/material';
import { LANG } from '../../../services/config';
import { formatsTelegram, modulesTelegram } from './constantsToTelegram';

const SmallTextEditorTelegram = ({ onChange, value }) => {
 
  return (
    <div className='SmallTextEditor'>
      <ReactQuill
        className='TextEditor-editor'
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modulesTelegram}
        formats={formatsTelegram}
      />
     
    </div>
  );
};

export default SmallTextEditorTelegram;
