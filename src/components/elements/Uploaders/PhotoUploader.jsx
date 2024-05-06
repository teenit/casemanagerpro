import React, { useState } from 'react';
import axios from 'axios';
import { serverAddres } from '../../Functions/serverAddres';
import pdfImg from "./../../../img/resources/pdf.png";
import docImg from "./../../../img/resources/doc.png";
import docxImg from "./../../../img/resources/docx.png";
import jpegImg from "./../../../img/resources/jpeg.png";
import jpgImg from "./../../../img/resources/jpg.png";
import movImg from "./../../../img/resources/mov.png";
import mp3Img from "./../../../img/resources/mp3.png";
import mp4Img from "./../../../img/resources/mp4.png";
import pngImg from "./../../../img/resources/png.png";
import pptImg from "./../../../img/resources/ppt.png";
import pptxImg from "./../../../img/resources/pptx.png";
import xlsImg from "./../../../img/resources/xls.png";
import xlsxImg from "./../../../img/resources/xlsx.png";
import send from '../../../img/icons/send-media.png';
import add from '../../../img/icons/add-media.png';
import {apiResponse} from '../../Functions/get_apiObj'
import defaultImg from "../../../img/default_profile.png";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Button, Icon } from '@mui/material';
import { Close } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';

const FORMAT = {
  pdf: { imgUrl: pdfImg },
  doc: { imgUrl: docImg },
  docx: { imgUrl: docxImg },
  jpeg: { imgUrl: jpegImg },
  jpg: { imgUrl: jpgImg },
  mov: { imgUrl: movImg },
  mp3: { imgUrl: mp3Img },
  mp4: { imgUrl: mp4Img },
  png: { imgUrl: pngImg },
  ppt: { imgUrl: pptImg },
  pptx: { imgUrl: pptxImg },
  xls: { imgUrl: xlsImg },
  xlsx: { imgUrl: xlsxImg }
};

function ext(name) {
  return name.match(/\.([^.]+)$|$/)[1];
}

function PhotoUploader({ multiple = true, successHandler = () => {}, meta = null, close = ()=>{} }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log(files)
    if (files) {
      const filesArray = Array.from(files);
      setSelectedFiles(filesArray);
    }
  };

  const handleUpload = async () => {
    if (!meta) return console.log("meta object is required");
    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append(`files[${i}]`, selectedFiles[i]);
    }

    const metaObject = { ...meta };
    formData.append('meta', JSON.stringify(metaObject));

    axios({
      url: serverAddres("upload-files.php"),
      method: "POST",
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      onUploadProgress: event => {
        console.log(Math.round(event.loaded * 100 / event.total))
      }
    })
      .then((response) => {
        setSelectedFiles([])
        successHandler(response.data)
      })
      .catch((error) => console.log(error))
  };


const handleDelete = (index)=>{
  const newMas = [...selectedFiles]
  newMas.splice(index,1)
  setSelectedFiles(newMas)
}
//ALTER TABLE case_helps ADD FOREIGN KEY (user_id) REFERENCES users(id);
  return (
    <div className="PhotoUploader">
       <div className="PhotoUploader-buttons">
        <label htmlFor="PhotoUploader"><Icon component={AttachFileIcon}/></label>
        <input style={{ display: "none" }} id="PhotoUploader" multiple type="file" onChange={handleFileChange} />
        <label htmlFor="submitInput" onClick={handleUpload}><Icon component={SendIcon}/></label>
        <input style={{ display: "none" }} type="submit" id="submitInput" />
        <Close onClick={close} sx={{color:"red"}}/>
        
      </div>
      <div className='PhotoUploader-img'>
        {
          !selectedFiles.length && <img className='img' src={defaultImg}/>
        }
        {selectedFiles.map((file, index) => (
          <img key={index} className='img' src={URL.createObjectURL(file)}/>
        ))} 
      </div>
     
    </div>
  );
}

export default PhotoUploader;