import React, { useEffect, useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Add, AttachFile, Check, Close, Delete, Edit, MailOutline, Send } from '@mui/icons-material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const Icon = ({ icon, addClass }) => {
    const [state, setState] = useState(null);

    useEffect(() => {
        let ico = null;
        switch (icon) {
            case "delete":
                ico = <Delete className={addClass} />
                break;
            case "add":
                ico = <Add className={addClass} fontSize='large' />;
                break;
            case "edit":
                ico = <Edit className={addClass} />;
                break;
            case "phone":
                ico = <PhoneAndroidIcon className={addClass} />;
                break;
            case "email":
                ico = <MailOutline className={addClass} />;
                break;
            case "location":
                ico = <LocationOnIcon className={addClass} />;
                break;
            case "date_created":
                ico = <CalendarTodayIcon className={addClass} />;
                break;
            case "channel":
                ico = <NotificationsIcon className={addClass} />;
                break;
            case "contract_date":
            case "contract_number":
                ico = <AssignmentIcon className={addClass} />;
                break;
            case "categories":
                ico = <FolderOpenIcon className={addClass} />;
                break;
            case "attach_file":
                ico = <AttachFile className={addClass} />;
                break;
            case "send":
                ico = <Send className={addClass} />;
                break;
            case "close":
                ico = <Close className={addClass} />;
                break;
            case "save":
                ico = <Check className={addClass} />;
                break;
            default:
                ico = null;
        }
        setState(ico);
    }, [icon]);

    return (
        <div>{state}</div>
    );
};

export default Icon;
