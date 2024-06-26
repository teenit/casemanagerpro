import React, { useEffect, useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Add, ArrowDownwardOutlined, AttachFile, Cake, Check, Close, Delete, Edit, ExitToApp, MailOutline, MenuBook, Print, Search, Send, Settings, SettingsOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EventIcon from '@mui/icons-material/Event';

const Icon = ({ icon, addClass, onClick }) => {
    const [state, setState] = useState(null);

    useEffect(() => {
        let ico = null;
        switch (icon) {
            case "settings":
                ico = <SettingsOutlined style={{cursor:'pointer'}} className={addClass} onClick={onClick} />;
                break;
            case "print":
                ico = <Print className={addClass} onClick={onClick} />;
                break;
            case "search":
                ico = <Search className={addClass} onClick={onClick} />;
                break;
            case "birthday":
                ico = <Cake className={addClass} onClick={onClick} />;
                break;
            case "eye_off":
                ico = <VisibilityOff fontSize='large' className={addClass} onClick={onClick} />;
                break;
            case "eye":
                ico = <Visibility fontSize='large' className={addClass} onClick={onClick} />;
                break;
            case "book":
                ico = <MenuBook fontSize='large' className={addClass} onClick={onClick} />;
                break;
            case "exit":
                ico = <ExitToApp fontSize='large' className={addClass} onClick={onClick} />;
                break;
            case "event":
                ico = <EventIcon fontSize='large' className={addClass} onClick={onClick} />;
                break;
            case "add_case":
                ico = <PersonAddAlt1Icon fontSize='large' className={addClass} onClick={onClick} />;
                break;
            case "calendar":
                ico = <CalendarMonthIcon fontSize='large' className={addClass} onClick={onClick} />;
                break;
            case "delete":
                ico = <Delete style={{cursor:"pointer"}} className={addClass} onClick={onClick} />;
                break;
            case "add":
                ico = <Add className={addClass} style={{cursor:"pointer"}} fontSize='large' onClick={onClick} />;
                break;
            case "edit":
                ico = <Edit style={{cursor:"pointer"}} className={addClass} onClick={onClick} />;
                break;
            case "phone":
                ico = <PhoneAndroidIcon className={addClass} onClick={onClick} />;
                break;
            case "email":
                ico = <MailOutline className={addClass} onClick={onClick} />;
                break;
            case "location":
                ico = <LocationOnIcon className={addClass} onClick={onClick} />;
                break;
            case "date_created":
                ico = <CalendarTodayIcon className={addClass} onClick={onClick} />;
                break;
            case "channel":
                ico = <NotificationsIcon className={addClass} onClick={onClick} />;
                break;
            case "contract_date":
            case "contract_number":
                ico = <AssignmentIcon className={addClass} onClick={onClick} />;
                break;
            case "categories":
                ico = <FolderOpenIcon className={addClass} onClick={onClick} />;
                break;
            case "attach_file":
                ico = <AttachFile className={addClass} onClick={onClick} />;
                break;
            case "send":
                ico = <Send style={{cursor:"pointer"}} className={addClass} onClick={onClick} />;
                break;
            case "close":
                ico = <Close style={{cursor:"pointer"}} className={addClass} onClick={onClick} />;
                break;
            case "save":
                ico = <Check style={{cursor:"pointer"}} className={addClass} onClick={onClick} />;
                break;
            case "arrow_down":
                ico = <ArrowDownwardOutlined className={addClass} onClick={onClick} />;
                break;
            default:
                ico = null;
        }
        setState(ico);
    }, [icon, addClass, onClick]);

    return <>{state}</>;
};

export default Icon;
