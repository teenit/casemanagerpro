import React from 'react'
import { NavLink } from 'react-router-dom'


const EventMembers = ({ getEventData, event_id, managers, members }) => {
    const MemberItem = ({ item, type }) => {
        return type == "manager" ? (
            <div className="EventPage-MemberItem">
                <NavLink to={`/user/${item.user_id}`}>{item.userName}</NavLink>
                <div className="EventPage-MemberItem-right">
                    <div><a href={`tel:${item.phone}`}>{item.phone}</a></div>
                </div>
            </div>
        ) : (
            <div className="EventPage-MemberItem">
                <NavLink to={`/case/${item.case_id}`}>{item.name}</NavLink>
                <div className="EventPage-MemberItem-right">
                    <div className="EventPage-MemberItem-right-role">role</div>
                    <div><a href={`tel:${item.phone}`}>{item.phone}</a></div>
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
                </div>
            </div>

            <div className="EventPage-members-inner-block">
                <div className="EventPage-members-inner-block-title">Учасники</div>
                <div className="EventPage-members-inner-block-members">
                    {members && members.length > 0 && members.map((item, index) => {
                        return <MemberItem key={index} item={item} type="member" />
                    })}
                </div>
            </div>
        </div>
    )
}

export default EventMembers