import React, { useState } from 'react';
import axios from 'axios';
import { serverAddres } from '../../Functions/serverAddres';
import docxImg from "./../../../img/resources/docx.svg";
import mp3Img from "./../../../img/resources/mp3.svg";
import pdfImg from "./../../../img/resources/pdf.svg";
import pptxImg from "./../../../img/resources/pptx.svg";
import xlsxImg from "./../../../img/resources/xlsx.svg";
import codeImg from "./../../../img/resources/code.svg"
import zipImg from "./../../../img/resources/zip.svg"
import mp4Img from "./../../../img/resources/mp4.svg"
import pngImg from "./../../../img/resources/img.svg"
import send from '../../../img/icons/send-media.png';
import add from '../../../img/icons/add-media.png';
import loadImg from '../../../img/loading_3.gif';
import SmallNotification from '../Notifications/SmallNotification';
import { useSelector } from 'react-redux';
import Icon from "../Icons/Icon"
import { MenuItem, Select } from '@mui/material';
import { LANG } from '../../../services/config';

const FORMAT = {
  pdf: { imgUrl: pdfImg },
  doc: { imgUrl: docxImg },
  docx: { imgUrl: docxImg },
  jpeg: { imgUrl: pngImg },
  jpg: { imgUrl: pngImg },
  mov: { imgUrl: mp4Img },
  mp3: { imgUrl: mp3Img },
  mp4: { imgUrl: mp4Img },
  png: { imgUrl: pngImg },
  ppt: { imgUrl: pptxImg },
  pptx: { imgUrl: pptxImg },
  xls: { imgUrl: xlsxImg },
  xlsx: { imgUrl: xlsxImg },
  zip: { imgUrl: zipImg },
  html: { imgUrl: codeImg },
  css: { imgUrl: codeImg },
  js: { imgUrl: codeImg },
  py: { imgUrl: codeImg },
};

function ext(name) {
  return name.match(/\.([^.]+)$|$/)[1];
}

function FilesUploader({ multiple = true, successHandler = () => { }, meta = null, type = "case" }) {
  const [fileSelect, setFileSelect] = useState(false);
  const [fileType, setFileType] = useState(typeof meta.key === 'string' ? meta.key : meta.key[0]);
  const [alert, setAlert] = useState({
    error: false,
    success: false
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { id, token } = useSelector(state => state.user);

  const alertHandler = (key) => {
    setAlert({ ...alert, [key]: !alert[key] });
  }

  const getFromType = () => {
    if (type === "case") return "upload-case-files.php";
    if (type === "resource") return "upload-resource-files.php";
    if (type === "event") return "event/upload.php";
  }

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setSelectedFiles(filesArray);
    }
    if (Array.isArray(meta.key)) {
      setFileSelect(true);
    }
  };

  const handleUpload = async (metaKey) => {
    if (!meta || selectedFiles.length < 1) return alertHandler("error");

    setUploading(true);
    const formData = new FormData();
    selectedFiles.forEach((file, i) => formData.append(`files[${i}]`, file));

    const metaObject = { ...meta, key: metaKey, id, token };
    formData.append('meta', JSON.stringify(metaObject));
    
    try {
      const response = await axios({
        url: serverAddres(getFromType()),
        method: "POST",
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
        onUploadProgress: event => {
          console.log(Math.round(event.loaded * 100 / event.total));
        }
      });
      setSelectedFiles([]);
      successHandler(response.data);
      alertHandler("success");
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const checkUpload = () => {
    if (typeof meta.key === "string") {
      handleUpload(meta.key);
    } else if (Array.isArray(meta.key)) {
      handleUpload(fileType)
    }
  }

  const handleDelete = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  }

  const cutTitle = (str) => str.length > 20 ? `${str.substring(0, 20)}...` : str;

  return (
    <>
      <div className="FilesUploader">
        {selectedFiles.length > 0 && (
          <div className="FilesUploader-files">
            {selectedFiles.map((file, index) => (
              <div key={index}>
                <p style={{ textDecoration: "underline" }}>{cutTitle(file.name)}</p>
                {FORMAT[ext(file.name)] && (
                  <img className='FilesUploader-files-preview' src={FORMAT[ext(file.name)].imgUrl} alt={`File type: ${ext(file.name)}`} />
                )}
                <span onClick={() => handleDelete(index)}>
                  <Icon icon={"close"} addClass={"close-icon"} />
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="FilesUploader-buttons">
          <label htmlFor="fileInput">
            <img src={add} alt="Завантажити файл" />
          </label>
          <input style={{ display: "none" }} id="fileInput" multiple={multiple} type="file" onChange={handleFileChange} />
          {!uploading ? (
            <label htmlFor="submitInput" onClick={checkUpload}>
              <img src={send} alt="Відправити файл" />
            </label>
          ) : (
            <img style={{ width: "30px" }} src={loadImg} />
          )}
          <input disabled={uploading} style={{ display: "none" }} type="submit" id="submitInput" />
        </div>

        {alert.success && <SmallNotification isSuccess={true} text="Файли завантажено успішно" close={() => alertHandler("success")} />}
        {alert.error && <SmallNotification isSuccess={false} text="Неправильні дані" close={() => alertHandler("error")} />}
      </div>

      {fileSelect && (
        <Select value={fileType} onChange={(e) => setFileType(e.target.value)}>
          {meta.key.map((item, index) => (
            <MenuItem key={index} value={item}>{LANG.FILES[item]}</MenuItem>
          ))}
        </Select>
      )}
    </>
  );
}

export default FilesUploader;
