import React, { useState } from 'react';
import axios from 'axios';
import { serverAddres } from '../../Functions/serverAddres';
import defaultImg from "../../../img/default_profile.png";
import Icon from "../Icons/Icon";
import SmallNotification from "../Notifications/SmallNotification";
import { LANG } from '../../../services/config';


function PhotoUploader({ multiple = false, successHandler = () => { }, meta = null, close = () => { }, file }) {
  const [alert, setAlert] = useState({
    success: false,
    error: false,
    invalidFile: false
  });
  const [uploading, setUploading] = useState(false);

  const handleAlertChange = (key) => {
    setAlert({ ...alert, [key]: !alert[key] });
  };

  const handleUpload = async () => {
    if (!meta) return "meta object is required";
    if (!file.type.startsWith('image/')) {
      handleAlertChange("invalidFile");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append(`files[0]`, file);

    const metaObject = { ...meta };
    const orgCode = localStorage.getItem('codeOrganisation');
    formData.append('meta', JSON.stringify(metaObject));
    formData.append('codeOrganisation', orgCode);
    formData.append('action', 'upload_file');
   
    axios({
      url: serverAddres('upload/upload.php'),
      method: "POST",
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      onUploadProgress: event => {
      }
    })
      .then((response) => {
        handleAlertChange("success");
        successHandler(response.data);
        setUploading(false);
      })
      .catch((error) => {
        console.log(error);
        handleAlertChange("error");
        setUploading(false);
      });
  };

  return (
    <div className="PhotoUploader">
      <div className="PhotoUploader-buttons">
        <label className='label' htmlFor="submitInput" onClick={handleUpload}>
          <Icon icon={"save"} addClass={"save-icon"} />
        </label>
        <input style={{ display: "none" }} type="submit" id="submitInput" />
        <label className='label' htmlFor="" onClick={close}>
          <Icon icon={"close"} addClass={"delete-icon"} />
        </label>
      </div>
      <div className='PhotoUploader-img'>
        <img className='img' src={URL.createObjectURL(file)} alt="preview" />
      </div>
      {alert.success && (
        <SmallNotification
          isSuccess={true}
          text={LANG.uploaders.PhotoUploader.sucess}
          close={() => { handleAlertChange("success"); }}
        />
      )}
      {alert.error && (
        <SmallNotification
          isSuccess={false}
          text={LANG.uploaders.PhotoUploader.error}
          close={() => { handleAlertChange("error"); }}
        />
      )}
      {alert.invalidFile && (
        <SmallNotification
          isSuccess={false}
          text={LANG.uploaders.PhotoUploader.notAnImg}
          close={() => { handleAlertChange("invalidFile"); }}
        />
      )}
    </div>
  );
}

export default PhotoUploader;
