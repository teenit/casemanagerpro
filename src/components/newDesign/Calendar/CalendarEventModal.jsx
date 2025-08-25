import React, { useState } from "react";
import Modal from "../../Modals/Modal";
import ModalConfirm from "../../Modals/ModalConfirm";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { LANG } from "../../../services/config";
import Icon from "../../elements/Icons/Icon";
import { apiResponse } from "../../Functions/get_apiObj";
import AccessCheck from "../../Functions/AccessCheck";
import { NavLink } from "react-router-dom";
import AddCalendarEvent from "./AddCalendarEvent";
import TextDescription from "../../elements/TextFormatters/TextDescription";

const CalendarEventModal = ({ data = {}, loadEvents, close }) => {
  const [state, setState] = useState({ ...data });
  const [modalConfirm, setModalConfirm] = useState(false);
  const [edit, setEdit] = useState(false);

  const user = useSelector((s) => s.user);
  const checkEditEvent = AccessCheck("yes_no", "a_page_calendar_edit");
  const checkRemoveEvent = AccessCheck("yes_no", "a_page_calendar_remove");

  const deleteEvent = () => {
    if (state.key === "happyCase" || state.userID !== localStorage.getItem("id"))
      return;

    apiResponse({ calendar_id: state.calendar_id }, "calendar/delete.php").then(
      () => {
        loadEvents();
        close();
      }
    );
  };

  const CalendarInfoBlock = ({ data }) => {
    const [info] = useState({ ...data });

    return (
      <div className="CalendarInfoBlock">
        {info.key === "happyCase" ? (
          <NavLink style={{ color: info.color }} to={`/${info.link}`}>
            {info.title}
          </NavLink>
        ) : (
          <div style={{ color: info.color, fontWeight: "700" }}>
            {info.title}
          </div>
        )}

        <div>
          {!info.allDay ? (
            <div>
              {`${info.start} -> ${info.end}`}
            </div>
          ) : (
            <div>
              {`${info.day}-${info.month}-${info.year}`}
            </div>
          )}
        </div>

        <div>
          <TextDescription text={info.text} />
        </div>
      </div>
    );
  };

  return (
    <Modal
      header={
        <div className="Modal--head-header">
          {!edit && (
            <>
              <div className="title">{LANG.calendar.info}</div>
              {user.id === state.userID && state.key !== "happyCase" && (
                <>
                  {checkEditEvent && (
                    <Button
                      onClick={() => setEdit(true)}
                      startIcon={<Icon icon="edit" />}
                    >
                      {LANG.calendar.add_event.edit}
                    </Button>
                  )}
                  {state.calendar_id && checkRemoveEvent && (
                    <Button
                      color="error"
                      onClick={() => setModalConfirm(true)}
                      startIcon={<Icon icon="delete" />}
                    >
                      {LANG.calendar.add_event.delete}
                    </Button>
                  )}
                </>
              )}
            </>
          )}
        </div>
      }
      closeHandler={close}
      footer={
        !edit && (
          <div className="Modal--footer">
            <Button variant="contained" onClick={close}>
              {LANG.GLOBAL.close}
            </Button>
          </div>
        )
      }
    >
      {edit ? (
        <AddCalendarEvent data={state} loadEvents={loadEvents} close={close} />
      ) : (
        <CalendarInfoBlock data={state} />
      )}

      {modalConfirm && (
        <ModalConfirm
          successHandler={deleteEvent}
          closeHandler={() => setModalConfirm(false)}
          text={LANG.calendar.confirm_delete}
        />
      )}
    </Modal>
  );
};

export default CalendarEventModal;
