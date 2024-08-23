import React from 'react'
import Icon from '../Icons/Icon'
import { NavLink, useNavigate } from 'react-router-dom'

const MenuNotification = ({ data, read, deleteNotification }) => {
    const key = data.meta_key
    const isUnread = !data.date_read
    const navigate = useNavigate();
    const GetMessage = () => {
        const item = data.meta_value
        switch (key) {
            case "created_new_case":
                return <div>
                    <NavLink to={`/user/${item.user_id_created}`}>{item.user_name_created}</NavLink> створив новий кейс <NavLink to={`/case/${item.case_id}`}>{item.name}</NavLink>
                </div>
            case "created_new_event":
                return <div>
                    <NavLink to={`/user/${item.user_id_created}`}>{item.user_name_created}</NavLink> створив нову подію <NavLink to={`/event/${item.event_id}`}>{item.name}</NavLink>
                </div>
            case "change_case_name":
                return <div>
                    <NavLink to={`/user/${item.user_id_changer}`}>{item.user_name_changer}</NavLink> змінив ім'я кейсу <NavLink to={`/case/${item.case_id}`}>{item.case_id}</NavLink> з {item.older_name} на {item.new_name}
                </div>

            default:
                break;
        }

    }
    const notificationType = {
        created_new_case: {
            title: "Новий кейс",
            icon: "add_notification",
            icon_class: "notification-icon-yellow",
            color: "#E9F4FE",
            link: `/case/${data.meta_value.case_id}`,
            click: () => { navigate(`/case/${data.meta_value.case_id}`) },
            showButton: true,
            buttonText: "Детальніше",
            type: 'case-created'
        },
        created_new_event: {
            title: "Нова подія",
            icon: "add_notification",
            icon_class: "notification-icon-purple",
            color: "#E9F4FE",
            click: () => { navigate(`/event_new/${data.meta_value.event_id}`) },
            showButton: true,
            buttonText: "Детальніше",
            type: 'event-created'
        },
        change_case_name: {
            title: "Редагування кейсу",
            icon: "edit",
            icon_class: "notification-icon-blue",
            color: "#E9F4FE",
            click: () => { navigate(`/case/${data.meta_value.case_id}`) },
            showButton: true,
            buttonText: "Детальніше",
            type: 'edit-case'
        },
        update: {
            title: "Оновлення",
            icon: "star",
            icon_class: "notification-icon-yellow",
            color: "#FFE55F"
        },
        birthday: {
            title: "День народження",
            icon: "birthday",
            icon_class: "notification-icon-purple",
            color: "#9747FF"
        }
    }
    return (
        <div className={`MenuNotification ${!isUnread && 'MenuNotification-read'} ${notificationType[key].type}`}>
            <div className='MenuNotification-header'>
                <div className="MenuNotification-header-title">
                    <Icon icon={notificationType[key].icon} addClass={notificationType[key].icon_class} />
                    <div>{notificationType[key].title}</div>
                </div>
                {isUnread && <div className="MenuNotification-header-unread" onClick={() => { read(data.notification_id) }}>Нове</div>}

            </div>
            <div className='MenuNotification-inner'>
                <GetMessage />
                <div className='MenuNotification-inner-date'>{data.date_created}</div>
                <div className='MenuNotification-inner-options'>
                    {!!notificationType[key].showButton && typeof notificationType[key].click == 'function' &&
                        <button onClick={notificationType[key].click} className='MenuNotification-button MenuNotification-inner-options-more'>
                            <div className='MenuNotification-button-content'>
                                <Icon icon={"eye"} addClass={"notification-icon-button"} />
                                <div>{notificationType[key].buttonText}</div>
                            </div>
                        </button>}
                    {/* <button className='MenuNotification-button MenuNotification-inner-options-call'>
                        <div className='MenuNotification-button-content'>
                            <Icon icon={"call"} addClass={"notification-icon-button"} />
                            <div>Зателефонувати</div>
                        </div>
                    </button> */}
                    <div className='notification-delete'>
                        <Icon icon={'delete'} addClass={'notification-delete'} onClick={() => deleteNotification(data.notification_id)} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MenuNotification