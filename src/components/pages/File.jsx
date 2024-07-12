import React, { useEffect, useState } from 'react';
import { apiResponse } from '../Functions/get_apiObj';
import { useParams } from 'react-router-dom';
import TextEditor from "../elements/TextEditor/TextEditor";
import SmallNotification from '../elements/Notifications/SmallNotification';
import Icon from '../elements/Icons/Icon';
import InputBlock from '../elements/Inputs/InputBlock';
import Input from '../elements/Inputs/Input';

const File = () => {
  const [data, setData] = useState(null);
  const [alert, setAlert] = useState({
    success: false,
    error: false,
    message: ""
  });
  const [editName, setEditName] = useState(false);

  const dataHandler = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const alertHandler = (key, message) => {
    setAlert({ ...alert, [key]: !alert[key], message: message });
  };

  let params = useParams();
  const file_id = params.id;

  const getFileData = () => {
    apiResponse({ file_id: file_id }, "manage/files/get-by-id.php").then((res) => {
      setData(res.data);
    }).catch((error) => {
      console.error(error);
    });
  };

  useEffect(() => {
    getFileData();
  }, []);

  const updateData = (key, value) => {
    apiResponse({ [key]: value, file_id: Number(file_id) }, "manage/files/update.php").then((res) => {
      getFileData();
      alertHandler("success", "Дані оновлено");
    }).catch((error) => {
      alertHandler("error", "Виникла помилка");
    });
  };

  return (
    <div className='File'>
      <div className='File-header'>
        {editName ? (
          <div className="File-header-title">
            <Input label='Назва файлу' value={data.title ? data.title : ""} onChange={(e) => { dataHandler("title", e.target.value) }} />
            <div className="InputBlock-editer-icons">
              <span onClick={() => { updateData("title", data.title) }}>
                <Icon icon={"save"} addClass={"save-icon"} />
              </span>
              <span onClick={() => { setEditName(false) }}>
                <Icon icon={"close"} addClass={"close-icon"} />
              </span>
            </div>
          </div>
        ) : (
          <div className="File-header-title">
            <div>{data?.title ? data.title : "Файл без назви"}</div>
            <div className="edit-icon">
              <Icon icon={"edit"} addClass={"default-icon"} onClick={() => { setEditName(!editName) }} />
            </div>
          </div>
        )}

        <div>{data?.last_updated && `Останнє редагування: ${data.last_updated}`}</div>
      </div>
      <div className='File-editor'>
        {data && <TextEditor val={data.value} saveHandler={(value) => { updateData("value", value) }} />}
      </div>
      <div className='File-info'>
        <div className='File-info-column'>
          <div className='File-info-column-row'>
            <Icon icon={"date_created"} addClass={"default-icon"} />
            <div className='File-info-column-row-text'>
              <div>Дата створення</div>
              <span>{data?.date_created}</span>
            </div>
          </div>

          <InputBlock
            textarea={true}
            value={data?.description}
            onChange={(e) => { dataHandler("description", e.target.value) }}
            icon={"book"}
            label={data?.description}
            inputType={"text"}
            saveHandler={(value) => { updateData("description", value) }}
            titleDefault={"Опис"}
          />
        </div>

      </div>
      {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { alertHandler("success", "") }} />}
      {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { alertHandler("error", "") }} />}
    </div>
  );
};

export default File;
