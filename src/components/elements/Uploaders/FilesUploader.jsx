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
import loadImg from '../../../img/loading_3.gif';
import SmallNotification from '../Notifications/SmallNotification';
import { useSelector } from 'react-redux';
import Icon from "../Icons/Icon"
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
function FilesUploader({ multiple = true, successHandler = () => { }, meta = null, type = "case" }) {
  const [alert, setAlert] = useState({
    error:false,
    success:false
  })
  const alertHandler = (key)=>{
    setAlert({...alert, [key]:!alert[key]})
  }
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { id, token } = useSelector(state => state.user)
  const getFromType = () => {
    if (type === "case") {
      return "upload-case-files.php";
    }
    if (type == "resource") {
      return "upload-resource-files.php";
    }
    if (type == "event") {
      return "event/upload.php";
    }
  }

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setSelectedFiles(filesArray);
    }
  };

  const handleUpload = async () => {

    if (!meta || selectedFiles.length<1) return alertHandler("error")
    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append(`files[${i}]`, selectedFiles[i]);
    }

    const metaObject = { ...meta, id, token };
    formData.append('meta', JSON.stringify(metaObject));

    axios({
      url: serverAddres(getFromType()),
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
        alertHandler("success")
        setUploading(false);
      })
      .catch((error) => console.log(error))
  };


  const handleDelete = (index) => {
    const newMas = [...selectedFiles]
    newMas.splice(index, 1)
    setSelectedFiles(newMas)
  }
  const cutTitle = (str) => {
    return str.length > 20 ? str.substring(0, 20) + "..." : str
  }
  return (
    <div className="FilesUploader">
      {selectedFiles.length > 0 && <div className="FilesUploader-files">
        {selectedFiles.map((file, index) => (
          <div key={index}>
            <p style={{ textDecoration: "underline" }}>{cutTitle(file.name)}</p>
            {/* {FORMAT[ext(file.name)] && <img className='FilesUploader-files-preview' src={FORMAT[ext(file.name)].imgUrl} alt={`File type: ${ext(file.name)}`} />} */}
            <span onClick={() => { handleDelete(index) }}>
              <Icon icon={"close"} addClass={"close-icon"} />
            </span>
          </div>
        ))}
      </div>}

      <div className="FilesUploader-buttons">
        <label htmlFor="fileInput"><img src={add} alt="Завантажити файл" /></label>
        <input style={{ display: "none" }} id="fileInput" multiple type="file" onChange={handleFileChange} />
        {!uploading ? <label htmlFor="submitInput" onClick={handleUpload}><img src={send} alt="Відправити файл" /></label> : <img style={{ width: "30px" }} src={loadImg} />}
        <input disabled={uploading} style={{ display: "none" }} type="submit" id="submitInput" />
      </div>
      {alert.success && <SmallNotification isSuccess={true} text="Файли завантажено успішно" close={() => { alertHandler("success") }} />}
      {alert.error && <SmallNotification isSuccess={false} text="Неправильні дані" close={() => { alertHandler("error") }} />}
    </div>
  );
}

export default FilesUploader;
