import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import GalleryBlock from "../blocks/GalleryBlock";
import useAccessCheck from "../Functions/AccessCheck"; // ✅ імпортуємо хук замість функції
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { serverAddres } from "../Functions/serverAddres";
import { apiResponse } from "../Functions/get_apiObj";
import Modal from "../Modals/Modal";
import { LANG } from "../../services/config";
import Textarea from "../elements/Inputs/Textarea";
import Icon from "../elements/Icons/Icon";
import AddMembers from "../Events/Event/AddMembers";
import AddPlan from "../Modals/EventModals/AddPlan";
import FilesUploader from "../elements/Uploaders/FilesUploader";
import EventPlans from "../newDesign/Events/EventPlans";
import EventMembers from "../newDesign/Events/EventMembers";
import LoadingPage from "../Loading/LoadingPage";
import NotFound from "./NotFound";

const EventPage = () => {
    const params = useParams();
    const downloadGallery = useAccessCheck('yes_no', 'a_page_event_media');
    const canAddMedia = useAccessCheck('yes_no', 'a_page_event_add_media');

    const [event, setEvent] = useState(null);
    const [state, setState] = useState(null);
    const [modal, setModal] = useState({
        addMember: false,
        addPlan: false
    });
    const [loader, setLoader] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const getEventData = () => {
        apiResponse({ event_id: params.id }, "events/get-event-by-id.php").then((res) => {
            if (res?.status) {
                setState(res);
                setEvent(res.event);
            } else {
                setNotFound(true);
            }
            setLoader(false);
        });
    };

    useEffect(() => {
        getEventData();
    }, []);

    const modalHandler = (key) => {
        setModal({ ...modal, [key]: !modal[key] });
    };

    const uploadFiles = () => {
        getEventData();
    };

    return !notFound ? (
        <div className="EventPage">
            {loader ? (
                <LoadingPage effload={loader} />
            ) : (
                <>
                    <div className="EventPage-header">
                        <div className="EventPage-header-title" style={{ borderBottom: `solid 3px ${event?.color}` }}>{event?.title}</div>
                        <div className="EventPage-header-subtitle">{event?.description}</div>
                    </div>

                    <div className="EventPage-members">
                        <div className="EventPage-members-title">
                            <div>{LANG.EVENT_PAGE.take_part}</div>
                            <Icon icon="add" addClass={"fs40"} onClick={() => { modalHandler("addMember") }} />
                        </div>
                        {state && <EventMembers
                            event_id={params.id}
                            getEventData={getEventData}
                            managers={state.event_user_manager}
                            members={state.event_case_member}
                            managersNew={state.event_user_manager_new}
                            membersNew={state.event_case_member_new}
                        />}
                    </div>

                    {state && <EventPlans getEventData={getEventData} feedbacks={state.event_feedbacks} plans={state.event_plans} event_id={params.id} />}

                    {state?.event_files?.length > 0 && <GalleryBlock data={state.event_files} check={downloadGallery} />}

                    {canAddMedia && (
                        <div className="EventPage-addFiles">
                            <div>{LANG.EVENT_PAGE.upload}</div>
                            <FilesUploader
                                successHandler={uploadFiles}
                                multiple={true}
                                meta={{
                                    key: "event_files",
                                    type: "event",
                                    title: "",
                                    description: "",
                                    eventID: params.id
                                }}
                                type="event"
                            />
                        </div>
                    )}
                </>
            )}

            {modal.addPlan && <AddPlan close={() => { modalHandler("addPlan") }} />}
            {modal.addMember && <AddMembers getEventData={getEventData} modalHandler={() => { modalHandler("addMember") }} />}
        </div>
    ) : (
        <NotFound />
    );
};

export default EventPage;
