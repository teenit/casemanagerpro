import React, { useEffect, useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Add, ArrowBack, ArrowBackIos, ArrowDownwardOutlined, ArrowForwardIos, AttachFile, Cake, Call, Check, Close, Delete, Download, Edit, ExitToApp, ExpandLess, ExpandLessRounded, ExpandLessSharp, ExpandMore, Logout, LogoutRounded, MailOutline, Man, MenuBook, Print, PriorityHigh, Replay, Replay5Outlined, Search, Send, Settings, SettingsOutlined, SystemUpdate, TodaySharp, Visibility, VisibilityOff, Work, WorkOutline } from '@mui/icons-material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EventIcon from '@mui/icons-material/Event';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PrintIcon from '@mui/icons-material/Print';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import QuizIcon from '@mui/icons-material/Quiz';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import BarChartIcon from '@mui/icons-material/BarChart';
import SearchOffIcon from '@mui/icons-material/SearchOff';
const Icon = ({ icon, addClass="", onClick }) => {
    const [state, setState] = useState(null);

    useEffect(() => {
        let ico = null;
        switch (icon) {
            case "no_results":
                ico = <SearchOffIcon fontSize='large' className={addClass} onClick={onClick} />
                break;
            case "add_notification":
                ico = <LibraryAddIcon className={addClass} onClick={onClick} />
                break;
            case "notification":
                ico = <NotificationsNoneIcon className={addClass} onClick={onClick} />
                break;
            case "star":
                ico = <StarRoundedIcon className={addClass} onClick={onClick} />
                break;
            case "download":
                ico = <Download className={addClass} onClick={onClick} />
                break;
            case "call":
                ico = <Call className={addClass} onClick={onClick} />
                break;
            case "warning":
                ico = <PriorityHigh className={addClass} onClick={onClick} />
                break;
            case "work":
                ico = <WorkOutline className={addClass} onClick={onClick} />;
                break;
            case "sex":
                ico = <Man className={addClass} onClick={onClick} />;
                break;
            case "settings":
                ico = <SettingsOutlined style={{ cursor: 'pointer' }} className={addClass} onClick={onClick} />;
                break;
            case "print":
                ico = <PrintIcon className={addClass} onClick={onClick} />;
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
                ico = <MenuBook className={addClass} onClick={onClick} />;
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
                ico = <Delete style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "add":
                ico = <Add className={addClass} style={{ cursor: "pointer" }} fontSize='large' onClick={onClick} />;
                break;
            case "edit":
                ico = <Edit style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
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
            case "  ":
                ico = <AttachFile className={addClass} onClick={onClick} />;
                break;
            case "send":
                ico = <Send style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "close":
                ico = <Close style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "save":
                ico = <Check style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "arrow_down":
                ico = <KeyboardArrowDownIcon style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "arrow_back":
                ico = <ArrowBackIos style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "arrow_next":
                ico = <ArrowForwardIos style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "arrow_down_sort":
                ico = <ExpandLess style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "arrow_up_sort":
                ico = <ExpandMore style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "eye_on":
                ico = <Visibility style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "eye_off":
                ico = <VisibilityOff style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "replay":
                ico = <Replay style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "today":
                ico = <TodaySharp style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "logout":
                ico = <LogoutIcon style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "profile":
                ico = <PermIdentityIcon style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "cases":
                ico = <GroupIcon style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "transaction":
                ico = <AccountBalanceWalletIcon style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "resource":
                ico = <TextSnippetIcon style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "access":
                ico = <VpnKeyIcon style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "check-list":
                ico = <ChecklistRtlIcon style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "groups":
                ico = <Diversity3Icon style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "quiz":
                ico = <QuizIcon style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "file":
                ico = <InsertDriveFileIcon style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "statistic":
                ico = <BarChartIcon style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            case "statistic":
                ico = <BarChartIcon style={{ cursor: "pointer" }} className={addClass} onClick={onClick} />;
                break;
            default:
                ico = <StarRoundedIcon className={addClass} onClick={onClick} />;
        }
        setState(ico);
    }, [icon, addClass, onClick]);

    return <>{state}</>;
};

export default Icon;
