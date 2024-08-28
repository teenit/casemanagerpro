import React, { useEffect, useState } from 'react';
import { apiResponse } from '../Functions/get_apiObj';
import { useNavigate, useParams } from 'react-router-dom';
import TextEditor from "../elements/TextEditor/TextEditor";
import SmallNotification from '../elements/Notifications/SmallNotification';
import Icon from '../elements/Icons/Icon';
import InputBlock from '../elements/Inputs/InputBlock';
import Input from '../elements/Inputs/Input';
import { LANG } from '../../services/config';
import AccessCheck from "../Functions/AccessCheck";
import { Button } from '@mui/material';
import ModalConfirm from "../Modals/ModalConfirm";
import Modal from '../Modals/Modal';
import Hint from '../elements/Hints/Hint';

const File = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [modal, setModal] = useState(false);
  const [tags, setTags] = useState(data?.tags ? data.tags : ["jss", "jdiiusdyusu"]);
  const [confirm, setConfirm] = useState(false);
  const editCheck = AccessCheck("view_edit", "a_page_file", "edit");
  const [alert, setAlert] = useState({
    success: false,
    error: false,
    message: ""
  });
  const [edit, setEdit] = useState({
    name: false,
    text: false
  });
  const [newTag, setNewTag] = useState("");

  const editHandler = (key) => {
    setEdit({ ...edit, [key]: !edit[key] });
  };

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
    let isMounted = true;
    apiResponse({ file_id: file_id }, "manage/files/get-by-id.php").then((res) => {
      if (isMounted) setData(res.data);
    }).catch((error) => {
      if (isMounted) console.error(error);
    });
    return () => { isMounted = false; };
  }, [file_id]);

  const deleteHandler = () => {
    apiResponse({ file_id: Number(file_id) }, "manage/files/delete.php").then((res) => {
      navigate(-1);
    });
  };

  const updateData = (key, value) => {
    apiResponse({ [key]: value, file_id: Number(file_id), type: "file" }, "manage/files/update.php").then((res) => {
      alertHandler("success", LANG.file.alertMessages.success);
      getFileData();
      if (edit.name) {
        editHandler("name");
      }
    }).catch((error) => {
      alertHandler("error", LANG.file.alertMessages.error);
    });
  };

  const addTag = () => {
    const newTags = newTag.includes(',') ? newTag.split(',') : [newTag.trim()]
    const filteredTags = newTags.map(item => item.trim()).filter(item => item.length > 0 && item.length < 50)
      if (newTag.trim() !== "" && filteredTags.length > 0) {
      setTags([...new Set([...tags, ...filteredTags])])
      setModal(false)
      setNewTag("")
    }
  };
  
  
  const removeTag = (name) => {
    setTags(tags.filter(item => item !== name))
  };

  const Tag = ({ name }) => {
    return (
      <div className="File-tag">
        <Icon icon={"close"} addClass={"close-icon"} onClick={() => removeTag(name)} />
        <span>{name}</span>
      </div>
    );
  };

  const closeModal = () => {
    setModal(false);
    setNewTag("");
  };

  return (
    <div className='File'>
      <div className='File-header'>
        <InputBlock
          header={true}
          value={data?.title ? data?.title : ""}
          label={data?.title}
          inputType={"text"}
          titleDefault={LANG.file.withoutName}
          onChange={(e) => { dataHandler("title", e.target.value) }}
          saveHandler={(value) => { updateData("title", value) }}
        />
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
              <div>
                {!data.value || data.value === "<p><br></p>" ? (
                  <div>
                    <div>{LANG.file.empty_file}</div>
                    <span>
                      <Button variant='contained' onClick={() => { editHandler("text") }}>
                        {LANG.GLOBAL.edit}
                      </Button>
                    </span>
                  </div>
                ) : (
                  <div className='File-text'>
                    <div dangerouslySetInnerHTML={{ __html: data.value }}></div>
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
        )}
      </div>
      <div className='File-info'>
        <div className='File-info-column'>
          <InputBlock
            hintMessage={LANG.hints.disabled}
            disabled={true}
            value={data?.date_created}
            icon={"date_created"}
            label={data?.date_created}
            inputType={"text"}
            titleDefault={LANG.file.date_created}
          />
          <InputBlock
            disabled={!editCheck}
            hintMessage={!editCheck && LANG.hints.disabled}
            textarea={true}
            value={data?.description}
            onChange={(e) => { dataHandler("description", e.target.value) }}
            icon={"book"}
            label={data?.description}
            inputType={"text"}
            saveHandler={(value) => { updateData("description", value) }}
            titleDefault={LANG.file.description}
          />
          <div className='File-info-tags'>
            {tags.map(tag => <Tag key={tag} name={tag} />)}
            <Icon icon={"add"} addClass={"fs35"} onClick={() => { setModal(true) }} />

          </div>
        </div>
      </div>
      {edit.text && <Button variant='contained' color='error' onClick={() => { setConfirm(true) }}>Видалити файл</Button>}
      {modal && <Modal closeHandler={closeModal} header={<span className='File-modal-header'>Додати тег <Hint text={LANG.hints.tag} /></span>} footer={
        <>
          <Button variant='contained' color='error' onClick={closeModal}>{LANG.GLOBAL.cancel}</Button>
          <Button variant='contained' onClick={addTag}>{LANG.GLOBAL.save}</Button>
        </>
      }>
        <Input value={newTag} onChange={(e) => { setNewTag(e.target.value) }} label='Назва тегу' />
      </Modal>}
      {confirm && <ModalConfirm text={"Ви впевнені, що хочете видалити цей файл?"} successHandler={deleteHandler} closeHandler={() => { setConfirm(false) }} />}
      {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { alertHandler("success", "") }} />}
      {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { alertHandler("error", "") }} />}
    </div>
  );
};

export default File;
