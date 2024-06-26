import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { apiResponse } from '../../Functions/get_apiObj'
import Icon from '../../elements/Icons/Icon'
import { LANG } from '../../../services/config'
import SettingsModal from './SettingsModal'
import ModalConfirm from "../../Modals/ModalConfirm"

const Group = () => {
    const [id, setId] = useState(0)
    const [data, setData] = useState(null)
    const [settings, setSettings] = useState(false)
    const [modal, setModal] = useState({
        delete:false
    })
    const modalHandler = (key)=>{
        setModal({...modal, [key]:!modal[key]})
    }
    const mas = [{ name: "skdiei" }, { name: "skdusiei" }, { name: "ggrgrhhdiei" }]
    const params = useParams()
    useEffect(() => {
        setId(params.id)
        apiResponse({ ...id }, "groups/get-group-by-id.php").then((res) => {
            setData([...res])
        })
    }, [])
    const Member = ({ item }) => {
        const [editMember, setEditMember] = useState(0)
        return (
            <div className='Group-member' onMouseEnter={() => { setEditMember(1) }} onMouseLeave={() => { setEditMember(0) }}>
                <NavLink to={`/case/${params.id}`}>{item.name}</NavLink>
                <span style={{ opacity: editMember }}>
                    <Icon icon={"delete"} addClass={"close-icon"} onClick={()=>{modalHandler("delete")}}/>
                </span>
                {modal.delete && <ModalConfirm closeHandler={()=>{modalHandler("delete")}} 
                text={"Ви впевнені, що хочете видалити зі списку учасників користувача  ?"}/>}
            </div>
        )
    }
    return (
        <div className='Group'>
            {settings ? <SettingsModal close={() => { setSettings(!settings) }} /> : <div className='Group-settings'>
                <Icon icon={"settings"} onClick={() => { setSettings(!settings) }} />
            </div>}

            <div className='Group-title'>
                <div>Group {id}</div>
                <div className="Group-title-desc">jkdhjcsj</div>
            </div>
            <div className="Group-members">
                <div className='Group-members-title'>
                    <div>{LANG.groups.group.members}</div>
                </div>
                <div className='Group-members-inner'>
                    <div className='Group-members-inner-column'>
                        <div>Зареєстровані</div>
                        {mas.map((item, index) => {
                            return <Member key={index} item={item} />
                        })}
                    </div>
                    <div className='Group-members-inner-column'>
                        <div>Не зареєстровані</div>
                        {/* {mas.map((item, index) => {
                            return <Member key={index} item={item} />
                        })} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Group