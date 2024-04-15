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

function FilesUploader({ multiple = true, successHandler = () => {}, meta = null }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const files = event.target.files;
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
        console.log(response.data)
        successHandler(response.data)
      })
      .catch((error) => console.log(error))
  };


const handleDelete = (index)=>{
  const newMas = [...selectedFiles]
  newMas.splice(index,1)
  setSelectedFiles(newMas)
}
  return (
    <div className="FilesUploader">
      <div className="FilesUploader-files">
        {selectedFiles.map((file, index) => (
          <div key={index}>
            <p style={{ textDecoration: "underline" }}>{file.name}</p>
            {FORMAT[ext(file.name)] && <img className='FilesUploader-files-preview' src={FORMAT[ext(file.name)].imgUrl} alt={`File type: ${ext(file.name)}`} />}
            <div className="FilesUploader-files-delete" onClick={()=>{
              handleDelete(index)
            }}></div>
          </div>
        ))}
      </div>
      <div className="FilesUploader-buttons">
        <label htmlFor="fileInput"><img src={add} alt="Завантажити файл" /></label>
        <input style={{ display: "none" }} id="fileInput" multiple type="file" onChange={handleFileChange} />
        <label htmlFor="submitInput" onClick={handleUpload}><img src={send} alt="Відправити файл" /></label>
        <input style={{ display: "none" }} type="submit" id="submitInput" />
      </div>
    </div>
  );
}

export default FilesUploader;
