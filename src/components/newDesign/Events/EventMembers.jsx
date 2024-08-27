import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ModalConfirm from '../../Modals/ModalConfirm'
import Icon from '../../elements/Icons/Icon'
import { apiResponse } from '../../Functions/get_apiObj'


const EventMembers = ({ getEventData, event_id, managers, members, membersNew = [], managersNew = [] }) => {
    const [modalDelete, setModalDelete] = useState({
        show: false,
        body: null,
        meta_id: null
    })

    const closeModalDelete = () => {
        setModalDelete({
            show: false,
            body: null,
            meta_id: null
        })
    }

    const deleteHandler = () => {
        apiResponse({meta_id: modalDelete.meta_id},"events/delete-meta.php").then((res)=>{
            getEventData();
            closeModalDelete();
        })
    }

    const MemberItem = ({ item, type }) => {
        console.log(item, type)
        return type == "manager" ? (
            <div className="EventPage-MemberItem">
                <div className='EventPage-MemberItem-line'>
                    <NavLink to={`/user/${item.user_id}`}>{item.name}</NavLink>
                    <div className="EventPage-MemberItem-right">
                        <div><a href={`tel:${item.phone}`}>{item.phone}</a></div>
                        <Icon icon={"delete"} addClass={"close-icon"} onClick={() => {setModalDelete({
                            ...modalDelete,show:true, meta_id: item.meta_id, body: <b>Ви впевнені, що хочече видалити організатора {item.name} ?</b>
                        }) }} />
                    </div>
                </div>
                <div className='EventPage-MemberItem-role'>
                    <div>{item.role}</div>
                </div>
            </div>
        ) : (
            <div className="EventPage-MemberItem">
                <div className='EventPage-MemberItem-line'>
                    <NavLink to={`/case/${item.case_id}`}>{item.name}</NavLink>
                    <div className="EventPage-MemberItem-right">
                        {/* <div className="EventPage-MemberItem-right-role">role</div> */}
                        <div><a href={`tel:${item.phone}`}>{item.phone}</a></div>
                        <Icon icon={"delete"} addClass={"close-icon"} onClick={() => {setModalDelete({
                            ...modalDelete,show:true, meta_id: item.meta_id, body: <b>Ви впевнені, що хочече видалити організатора {item.name} ?</b>
                        }) }} />
                    </div>
                </div>
                <div className='EventPage-MemberItem-role'>
                    <div>{item.role}</div>
                </div>
            </div>
        )
    }
    const MemberItemNew = ({ item }) => {
        return (
            <div className="EventPage-MemberItem without-in-system">
                <div className='EventPage-MemberItem-line'>
                    <div>{item.name}</div>
                    <div className="EventPage-MemberItem-right">
                        <div><a href={`tel:${item.phone}`}>{item.phone}</a></div>
                        <Icon icon={"delete"} addClass={"close-icon"} onClick={() => {setModalDelete({
                            ...modalDelete,show:true, meta_id: item.meta_id, body: <b>Ви впевнені, що хочече видалити організатора {item.name} ?</b>
                        }) }} />
                    </div>
                </div>
                <div className='EventPage-MemberItem-role'>
                    <div>{item.role}</div>
                </div>
               
            </div>
        ) 
    }
    return (
        <div className="EventPage-members-inner">
            <div className="EventPage-members-inner-block">
                <div className="EventPage-members-inner-block-title">Організатори</div>
                <div className="EventPage-members-inner-block-members">
                    {managers && managers.length > 0 && managers.map((item, index) => {
                        return <MemberItem key={index} item={item} type="manager" />
                    })}
                    {
                        managersNew && managersNew.length > 0 && managersNew.map((item,index)=>{
                            return <MemberItemNew key={index + item.name + item.phone} item={item}/>
                        })
                    }
                </div>
            </div>

            <div className="EventPage-members-inner-block">
                <div className="EventPage-members-inner-block-title">Учасники</div>
                <div className="EventPage-members-inner-block-members">
                    {members && members.length > 0 && members.map((item, index) => {
                        return <MemberItem key={index} item={item} type="member" />
                    })}
                    {
                        membersNew && membersNew.length > 0 && membersNew.map((item,index)=>{
                            return <MemberItemNew key={index + item.name + item.phone} item={item}/>
                        })
                    }
                </div>
            </div>
            {
                modalDelete.show && 
                    <ModalConfirm
                        closeHandler={closeModalDelete}
                        successHandler={deleteHandler}
                        text={modalDelete.body}
                    />
                    
            }
        </div>
    )
}

export default EventMembers