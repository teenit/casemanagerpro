import React, { useEffect, useState } from "react";
import { apiResponse } from "../Functions/get_apiObj";
import { Button, MenuItem, Select } from "@mui/material";
import Textarea from "../elements/Inputs/Textarea";
import FilesUploader from "../elements/Uploaders/FilesUploader";
import Modal from "../Modals/Modal";
import SmallTextEditor from "../elements/TextEditor/SmallTextEditor";
import { replaceParagraphTags } from "../Functions/translateString";
import SmallTextEditorTelegram from "../elements/TextEditor/SmallTextEditorTelegram";
import { isArray } from "chart.js/helpers";
import TextDescription from "../elements/TextFormatters/TextDescription";
import Galery from "../Galery/Galery";
import BigPhoto from "../Events/Event/BigPhoto";
import OpenPhoto from "../Galery/OpenPhoto";

const DEFAULT_URL = {
    media: "telegram/send-group-media-in-telegram.php",
    text: "telegram/send-message-in-telegram.php"
}

const TelegramPage = () => {

    const [state, setState] = useState({
        message: '',
        bot_id: 0,
        bot_id_messages: 0
    });
    const [bots, setBots] = useState([]);
    const [typeMessage, setTypeMessage] = useState("text");
    const [addMessage, setAddMessage] = useState(false);
    const [messages, setMessages] = useState([]);
    const [bigPhoto, setBigPhoto] = useState({
        link: null,
        show: false
    })
    useEffect(()=>{
        apiResponse({},"telegram/get-telegram-bot-list.php").then((res)=>{
            setBots([...res.data])
        })
    },[])

    const sendTextTelegram = () => {

        apiResponse({
            message: replaceParagraphTags(state.message),
            bot_id: state.bot_id
        }, DEFAULT_URL.text).then((res)=>{
            setState({
                message: '',
                bot_id: 0,
                bot_id_messages: 0
            });
            setAddMessage(false)
        })
    }

    const getMessagesByBotId = (bot_id) =>{
        setState({...state, bot_id_messages: bot_id})
        apiResponse({
            bot_id: bot_id,
            page: 1,
            per_page: 100,

        }, "telegram/load-telegram-messages-by-id.php").then((res)=>{
            if (res.status) setMessages([...res.data])
            else setMessages([])
        })
    }

    return (
        <>
        {bots.length > 0 ? <div className="Page TelegramPage">
            <div className="TelegramPage-controls">
                
                <Select name="bot_mes" value={state.bot_id_messages} onChange={(e) => { getMessagesByBotId(e.target.value);  }}>
                    <MenuItem value={0}>Оберіть бота</MenuItem>
                    {
                        bots.map((item)=><MenuItem key={item.id} value={item.id}>{item.bot_name}</MenuItem>)
                    }
                </Select>
                <Button variant='contained' onClick={()=>setAddMessage(true)}>Надіслати повідомлення</Button>
            </div>
            
            <div className="TelegramPage-messages">
            
                { messages.map((item)=>{
                    return(<div key={item.message_id} className="TelegramPage-messages-message">
                        <div className="TelegramPage-messages-message-date">{item.sent_at}</div>
                        <div className={`TelegramPage-messages-message-img total-${Array.isArray(item.files) ? item.files.length : 0}`}>
                        {Array.isArray(item.files) && item.files.map((file, index) => {
                            const absoluteUrl = new URL(file, window.location.origin).href;
                            return (
                                <div 
                                className="img-back" 
                                key={file + index}>
                                    <img src={absoluteUrl} onClick={()=>setBigPhoto({link: absoluteUrl, show: true})}/>
                                </div>
                            );
                            })}
                        </div>
                        <TextDescription text={item.message}/>
                        
                    </div>)
                })}
            </div>
            {
                addMessage && 
                <Modal
                    closeHandler={()=>setAddMessage(false)}
                    header={"Надіслати повідомлення в телеграм"}
                    successHandler={()=>setAddMessage(false)}
                    >
                <div className="TelegramPage-form">
                    <div className="TelegramPage-form-selects">
                        {bots.length > 0 && <Select name="bot" value={state.bot_id} onChange={(e) => { setState({...state, bot_id: e.target.value}) }}>
                            <MenuItem value={0}>Оберіть бота</MenuItem>
                            {
                                bots.map((item)=><MenuItem key={item.id} value={item.id}>{item.bot_name}</MenuItem>)
                            }
                        </Select>}
                        <Select name="typebot" value={typeMessage} onChange={(e) => { setTypeMessage(e.target.value) }}>
                            <MenuItem value={"media"}>Пост з файлами</MenuItem>
                            <MenuItem value={"text"}>Текстове повідомлення</MenuItem>
                        </Select>
                    </div>
           
                    <div className="TelegramPage-form-message">
                        {typeMessage == "text" && <SmallTextEditorTelegram 
                            label={"Повідомлення"}
                            value={state.message}
                            onChange={(e)=>{setState({...state, message: e})}}
                        />}
                         {typeMessage == "media" && <Textarea
                            label={"Повідомлення"}
                            value={state.message}
                            onChange={(e)=>{setState({...state, message: e.target.value})}}
                        />}
                    </div>
                    <div>
                        {typeMessage == "media" && <FilesUploader 
                            successHandler={()=>{
                                setState({
                                    message: '',
                                    bot_id: 0,
                                    bot_id_messages: 0
                                });
                            }}
                            multiple={true} 
                            meta={{
                                key:"telegram",
                                type:"telegram",
                                bot_id: state.bot_id,
                                message: state.message,
                            }}
                            type="telegram"
                        />}
                        {typeMessage == "text" && <Button variant='contained' onClick={sendTextTelegram}>Надіслати</Button>}
                    </div>
                </div>
                </Modal>
            }
           {bigPhoto.show && <OpenPhoto url={bigPhoto.link} close={()=>setBigPhoto({link: null, show: false})}/>}
        </div>: <div className="no-data">Чат ботів не знайдено</div>}
        </>
    )
}

export default TelegramPage;