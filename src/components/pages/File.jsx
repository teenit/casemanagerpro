import React, { useEffect, useState } from 'react';
import { apiResponse } from '../Functions/get_apiObj';
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
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
import LoadingPage from '../Loading/LoadingPage';
import NotFound from './NotFound';

const File = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [modal, setModal] = useState(false);
  const [tags, setTags] = useState();
  const [confirm, setConfirm] = useState(false);
  const editCheck = AccessCheck("view_edit", "a_page_file", "edit");
  const access = {
    file_edit: AccessCheck("view_edit", "a_page_file", "edit")
  }
  const [alert, setAlert] = useState({
    success: false,
    error: false,
    message: ""
  });
  const [error, setError] = useState(false)
  const [edit, setEdit] = useState({
    name: false,
    text: false
  });
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(true);
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
  const [searchParams] = useSearchParams();

  const getFileData = () => {
    
    let obj = { file_id: file_id };
    for (const [key, value] of searchParams.entries()) {
      obj[key] = value;
    }
  
    apiResponse(obj, "manage/files/get-by-id.php").then((res) => {
      if (!res?.status) {
        setError(true);
        setLoading(false);
        return;
      }
      setData(res.data);
      let dataTags = res.data.tag ? res.data.tag.split(',').map((item) => item.trim()) : []
      setTags([...dataTags])
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  };

  useEffect(() => {
    getFileData()
  }, [file_id]);

  const deleteHandler = () => {
    apiResponse({ file_id: Number(file_id) }, "manage/files/delete.php").then((res) => {
      navigate(-1);
    });
  };

  const updateData = (key, value) => {
    apiResponse({ [key]: value, file_id: Number(file_id), type: "file" }, "manage/files/update.php").then((res) => {
      if(key!=="tag"){
        alertHandler("success", LANG.file.alertMessages.success);
      }
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
      const uniqueTags = [...new Set([...tags, ...filteredTags])]
      setModal(false)
      setNewTag("")
      setTags(uniqueTags)
      updateData("tag", uniqueTags.join(','))
    }
  };


  const removeTag = (name) => {
    const newTags = tags.filter(item => item !== name)
    setTags(newTags)
    updateData("tag", newTags.join(','))
  };

  const Tag = ({ name }) => {
    return (
      <div className="File-tag">
        {access.file_edit && <Icon icon={"close"} addClass={"close-icon"} onClick={() => removeTag(name)} />}
        <span>{name}</span>
      </div>
    );
  };

  const closeModal = () => {
    setModal(false);
    setNewTag("");
  };

  return (
    <>
     {loading && <LoadingPage message={error.message} effload={loading}/>}
     {error && <NotFound />}
    {!loading && !error && <div className='File'>
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
        <div><NavLink to={data?.client?.link}>{data?.client?.title}</NavLink></div>
      </div>
      <div className='File-editor'>
      <div className='File-editor-control'>
        <div className='File-editor-control-up'>
          <div className='File-editor-control-up-btn edit'>
            {access.file_edit && editCheck && !edit.text &&
              <Button className="button"  onClick={() => { editHandler("text") }}><Icon icon={'edit'} /></Button>}
           
          </div>
          {/* <div className='File-editor-control-up-btn save'>
          {edit.text && access.file_edit && 
            <Button className="button" color='success'><Icon icon={'save'} /></Button>}
            
          </div>
          <div className='File-editor-control-up-btn close'>
          {edit.text && access.file_edit && 
            <Button className="button" color='error'  onClick={() => { editHandler("text") }}><Icon icon={'close'} /></Button>}
          </div> */}
        </div>
        <div className='File-editor-control-down'>
          <div className='File-editor-control-down-btn delete'>
          {edit.text && access.file_edit && 
            <Button variant='outlined' className="button" color='error' onClick={()=>setConfirm(true)}><Icon icon={'delete'} /></Button>}
          </div>
        </div>   
      </div>
        {data && (
          <div className='File-editor-block'>
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
                    {/* {access.file_edit && <span>
                      <Button variant='contained' onClick={() => { editHandler("text") }}>
                        {LANG.GLOBAL.edit}
                      </Button>
                    </span>} */}
                  </div>
                ) : (
                  <div className='File-text'>
                    <div dangerouslySetInnerHTML={{ __html: data.value }}></div>
                    {/* {access.file_edit && <span>
                      <Button variant='contained' onClick={() => { editHandler("text") }}>
                        {LANG.GLOBAL.edit}
                      </Button>
                    </span>} */}
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
            {tags && (tags.length > 0 ? tags.map(tag => <Tag key={tag} name={tag} />) : <div>{LANG.file.add_tag}</div>)}
            {access.file_edit && <Icon icon={"add"} addClass={"fs35"} onClick={() => { setModal(true) }} />}

          </div>
        </div>
      </div>
      {/* {edit.text && access.file_edit && <Button variant='contained' color='error' onClick={() => { setConfirm(true) }}>Видалити файл</Button>} */}
      {modal && <Modal closeHandler={closeModal} header={<span className='File-modal-header'>{LANG.file.add_tags} <Hint text={LANG.hints.tag} /></span>} footer={
        <>
          <Button variant='contained' color='error' onClick={closeModal}>{LANG.GLOBAL.cancel}</Button>
          <Button variant='contained' onClick={addTag}>{LANG.GLOBAL.save}</Button>
        </>
      }>
        <Input value={newTag} onChange={(e) => { setNewTag(e.target.value) }} label={LANG.file.your_tags} />
      </Modal>}
      {confirm && <ModalConfirm text={LANG.file.confirm_delete} successHandler={deleteHandler} closeHandler={() => { setConfirm(false) }} />}
      {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { alertHandler("success", "") }} />}
      {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { alertHandler("error", "") }} />}
    </div>}
    </>
  );
};

export default File;
