import React, { useEffect, useState } from 'react';
import { apiResponse } from '../Functions/get_apiObj';
import { useParams } from 'react-router-dom';
import TextEditor from "../elements/TextEditor/TextEditor";
import SmallNotification from '../elements/Notifications/SmallNotification';
import Icon from '../elements/Icons/Icon';
import InputBlock from '../elements/Inputs/InputBlock';
import Input from '../elements/Inputs/Input';
import { LANG } from '../../services/config';
import AccessCheck from "../Functions/AccessCheck"
import parse from 'html-react-parser';
import { Button } from '@mui/material';
const File = () => {
  const [data, setData] = useState(null);
  const editCheck = AccessCheck("view_edit", "a_page_file", "edit")
  const [alert, setAlert] = useState({
    success: false,
    error: false,
    message: ""
  });
  const [edit, setEdit] = useState({
    name: false,
    text: false
  })
  const editHandler = (key) => {
    setEdit({ ...edit, [key]: !edit[key] })
  }
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
      alertHandler("success", LANG.file.alertMessages.success);
      getFileData();
      if (edit.name) {
        editHandler("name")
      }
    }).catch((error) => {
      alertHandler("error", LANG.file.alertMessages.error);
    });
  };

  return (
    <div className='File'>
      <div className='File-header'>
        {edit.name ? (
          <div className="File-header-title">
            <Input label={LANG.file.name} value={data.title ? data.title : ""} onChange={(e) => { dataHandler("title", e.target.value) }} />
            <div className="InputBlock-editer-icons">
              <span onClick={() => { updateData("title", data.title) }}>
                <Icon icon={"save"} addClass={"save-icon"} />
              </span>
              <span onClick={() => { editHandler("name") }}>
                <Icon icon={"close"} addClass={"close-icon"} />
              </span>
            </div>
          </div>
        ) : (
          <div className="File-header-title">
            <div>{data?.title ? data.title : LANG.file.withoutName}</div>
            {editCheck && <div className="edit-icon">
              <Icon icon={"edit"} addClass={"default-icon"} onClick={() => { editHandler("name") }} />
            </div>}

          </div>
        )}

        <div>{data?.last_updated && `${LANG.file.last_updated}: ${data.last_updated}`}</div>
      </div>
      <div className='File-editor'>
        {data && (
          <div className='File-editor'>
            {editCheck && edit.text ? (
              <TextEditor
                close={() => { editHandler("text") }}
                val={data.value}
                saveHandler={(value) => updateData("value", value)}
              />
            ) : (
              <div className='File-text'>
                <div>{typeof data.value == "string" && parse(data.value).length > 0 ? parse(data.value) : LANG.file.empty_file}</div>
                <span>
                  <Button variant='contained' onClick={() => { editHandler("text") }}>
                    {LANG.GLOBAL.edit}
                  </Button>
                </span>
              </div>
            )}
          </div>
        )}


      </div>
      <div className='File-info'>
        <div className='File-info-column'>
          <InputBlock
            disabled={true}
            value={data?.date_created}
            icon={"date_created"}
            label={data?.date_created}
            inputType={"text"}
            titleDefault={LANG.file.date_created}
          />

          <InputBlock
            disabled={!editCheck}
            textarea={true}
            value={data?.description}
            onChange={(e) => { dataHandler("description", e.target.value) }}
            icon={"book"}
            label={data?.description}
            inputType={"text"}
            saveHandler={(value) => { updateData("description", value) }}
            titleDefault={LANG.file.description}
          />
        </div>

      </div>
      {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { alertHandler("success", "") }} />}
      {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { alertHandler("error", "") }} />}
    </div>
  );
};

export default File;
