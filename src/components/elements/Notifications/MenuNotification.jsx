import React from 'react'
import Icon from '../Icons/Icon'
import { NavLink, useNavigate } from 'react-router-dom'
import { LANG } from '../../../services/config'

const MenuNotification = ({ data, read, deleteNotification }) => {
    const key = data.meta_key
    const isUnread = !data.date_read
    const navigate = useNavigate();
    const GetMessage = () => {
        const item = data.meta_value
        switch (key) {
            case "created_new_case":
                return <div>
                    <NavLink to={`/user/${item.user_id_created}`}>{item.user_name_created}</NavLink> {LANG.MENU_NOTIFICATION.created_new_case} <NavLink to={`/case/${item.case_id}`}>{item.name}</NavLink>
                </div>
            case "created_new_event":
                return <div>
                    <NavLink to={`/user/${item.user_id_created}`}>{item.user_name_created}</NavLink> {LANG.MENU_NOTIFICATION.created_new_event} <NavLink to={`/event/${item.event_id}`}>{item.name}</NavLink>
                </div>
            case "change_case_name":
                return <div>
                    <NavLink to={`/user/${item.user_id_changer}`}>{item.user_name_changer}</NavLink> {LANG.MENU_NOTIFICATION.changed_case_name} <NavLink to={`/case/${item.case_id}`}>{item.case_id}</NavLink> з {item.older_name} на {item.new_name}
                </div>
            case "birthday":
                return <div>{LANG.MENU_NOTIFICATION.case} <NavLink to={`/case/${data.case_id}`}>№{data.case_id} {data.case_name}</NavLink> {data.when} <b>{data.years} років</b> {data.happy_day}</div>
            case "created_new_task": 
                return <div>{LANG.MENU_NOTIFICATION.notifications.new_task}: <NavLink to={`/task/${item?.task_id}`}>{item?.task_name}</NavLink></div>
            default:
                return <></>
                break;
        }

    }

    const notificationType = {
        created_new_case: {
            title: LANG.MENU_NOTIFICATION.notifications.new_case,
            icon: "add_notification",
            icon_class: "notification-icon-blue",
            color: "#d9eafd",
           // link: `/case/${data.meta_value.case_id}`,
            click: () => { navigate(`/case/${data.meta_value.case_id}`) },
            showButton: true,
            buttonText: LANG.MENU_NOTIFICATION.notifications.more,
            type: 'case-created'
        },
        created_new_event: {
            title: LANG.MENU_NOTIFICATION.notifications.new_event,
            icon: "add_notification",
            icon_class: "notification-icon-purple",
            color: "#E9F4FE",
            click: () => { navigate(`/event_new/${data.meta_value.event_id}`) },
            showButton: true,
            buttonText: LANG.MENU_NOTIFICATION.notifications.more,
            type: 'event-created'
        },
        change_case_name: {
            title: LANG.MENU_NOTIFICATION.notifications.edit_case,
            icon: "edit",
            icon_class: "notification-icon-blue",
            color: "#E9F4FE",
            click: () => { navigate(`/case/${data.meta_value.case_id}`) },
            showButton: true,
            buttonText: LANG.MENU_NOTIFICATION.notifications.more,
            type: 'edit-case'
        },
        update: {
            title: LANG.MENU_NOTIFICATION.notifications.update,
            icon: "star",
            icon_class: "notification-icon-yellow",
            color: "#FFE55F"
        },
        birthday: {
            title: LANG.MENU_NOTIFICATION.notifications.birthday,
            icon: "birthday",
            icon_class: "notification-icon-purple",
            color: "#9747FF",
            type: 'birthday'
        },
        created_new_task: {
            title: LANG.MENU_NOTIFICATION.notifications.new_task,
            icon: "add_notification",
            icon_class: "notification-icon-blue",
            color: "#d900fd",
            type: 'case-created'
        }
    }
    return (
        <div className={`MenuNotification ${!isUnread && 'MenuNotification-read'} ${notificationType[key]?.type}`}>
            <div className='MenuNotification-header'>
                <div className="MenuNotification-header-title">
                    <Icon icon={notificationType[key]?.icon} addClass={notificationType[key]?.icon_class} />
                    <div>{notificationType[key]?.title}</div>
                </div>
                {isUnread && data.meta_key !== 'birthday' && <div className="MenuNotification-header-unread" onClick={() => { read(data.notification_id) }}>Нове</div>}

            </div>
            <div className='MenuNotification-inner'>
                <GetMessage />
                {data.meta_key !== 'birthday' && <><div className='MenuNotification-inner-date'>{data.date_created}</div>
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
                        <Icon icon={'delete'} addClass={'delete-icon'} onClick={() => deleteNotification(data.notification_id)} />
                    </div>

                </div></>}
            </div>
        </div>
    )
}

export default MenuNotification