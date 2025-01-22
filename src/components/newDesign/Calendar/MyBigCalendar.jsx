import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { apiResponse } from '../../Functions/get_apiObj';
import { Button, IconButton } from '@mui/material';
import Icon from '../../elements/Icons/Icon';
import Modal from '../../Modals/Modal';
import { LANG } from '../../../services/config';
import AddCalendarEvent from './AddCalendarEvent';
import { invertColor } from '../../Functions/invertColor';
import { useSelector } from 'react-redux';
import AccessCheck from '../../Functions/AccessCheck';
// Локалізація з moment.js
const localizer = momentLocalizer(moment);

const DEFAULT_ADD_FORM = {
  link: "",
  day: "",
  month: "",
  year: "",
  title: "",
  text: "",
  color: "",
  start: "",
  end: "",
  key: 'myCalendar'
}


const MyBigCalendar = () => {
  const [events, setEvents] = useState([]);
  const [currentYear, setCurrentYear] = useState(moment().year()); // Поточний рік за замовчуванням
  const [currentMonth, setCurrentMonth] = useState(moment().month());
  const [activeViewCalendar, setActiveViewCalendar] = useState("month");
  const [eventModal, setEventModal] = useState({...DEFAULT_ADD_FORM});
  const [editEvent, setEditEvent] = useState(true);
  const [showEventModal, setShowEventModal] = useState(false);
  const [view, setView] = useState('month'); // Зберігаємо поточний вигляд
  const [date, setDate] = useState(new Date()); // Зберігаємо поточну дату
  // Отримання поточної дати за допомогою moment
  const checkAddEvent = AccessCheck("yes_no", "a_page_calendar_add_event");

  useEffect(() => {
    getCalendarList();
  }, [currentMonth, currentYear]);

  const handleNavigate = (newDate, view, action) => {
    const year = moment(newDate).year(); // Отримуємо рік з вибраної дати
    const month = moment(newDate).month(); // Отримуємо місяць з вибраної дати
    setCurrentYear(year); // Оновлюємо стан вибраного року
    setCurrentMonth(month); // Оновлюємо стан вибраного місяця
    setDate(newDate); // Оновлюємо поточну дату
    setView(view); // Оновлюємо вигляд (місяць, тиждень, день)
  };

  const getCalendarList = () => {
    // Виклик API з поточними місяцем і роком
    apiResponse({
      month: currentMonth + 1, // moment.js місяці починаються з 0, тому додаємо 1
      year: currentYear
    }, "user/get-cal-month.php").then((res) => {
     // console.log("API відповідь:", res); // Логування API відповіді
      const transformedEvents = transformEvents(res);
     // console.log("Трансформовані події:", transformedEvents); // Логування трансформованих подій
      setEvents(transformedEvents);
    }).catch((error) => {
      console.error("Помилка отримання даних:", error);
    });
  }

const EventTitle = (event) => {

  return (
    <div style={{
      backgroundColor:event.value.color, 
      fontSize:"12px",
      color:"black",
      textOverflow: "ellipsis",

    }} title={event.value.title}>
        {event.value.title}
    </div>
  )
}

  // Функція для перетворення JSON у події для react-big-calendar
const transformEvents = (data) => {
  //console.log("Дані з API перед перетворенням:", data); // Логування даних з API
  return data.map(event => {
    let test = moment(event.date).format("YYYY-MM-DD")
    test = currentYear + test.slice(4)
    
    let value = event.value;
    let day = +value.day;
    let month = +value.month;
    let startTime = value.start;
    let endTime = value.end;

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    let isAllDay = (startTime === "00:00" && endTime === "23:59") || event.key === "happyCase";

    const start = new Date(`${currentYear}-${month}-${day}T${startTime}`);
    const end = new Date(`${currentYear}-${month}-${day}T${endTime}`);
    return({
    title: <EventTitle event={event}/>,
    start: start,
    end: end,
    allDay: isAllDay,
    resource: {...event.value, key: event.key,
                calendar_id: event.id, every_year: event.every_year,
              allDay:isAllDay} // Додаткові дані, якщо потрібні

  })});
};

const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  const goToToday = () => {
    toolbar.onNavigate('TODAY');
  };

  const goToMonthView = () => {
    toolbar.onView('month');
    setView('month');
  };

  const goToWeekView = () => {
    toolbar.onView('week');
    setView('week');
  };

  const goToDayView = () => {
    toolbar.onView('day');
    setView('day');
  };

  const goToAgendaView = () => {
    toolbar.onView('agenda');
    setView('agenda');
  };

  return (
    <div className="MyBigCalendar-custom-toolbar">
      <div>
        <IconButton style={{transform: "rotate(180deg)"}}>
          <Icon icon={'arrow_next'} onClick={goToBack}/>
        </IconButton>
        <Button onClick={goToToday}>
          <Icon icon={'today'} />
          Сьогодні  
        </Button>
        <IconButton>
          <Icon icon={'arrow_next'} onClick={goToNext}/>
        </IconButton>
      </div>
      <div className='MyBigCalendar-custom-toolbar-text'>
        <span>{toolbar.label}</span>
      </div>
      <div>

        <Button onClick={goToMonthView} variant={activeViewCalendar === "month" ? "outlined" : "text"}>Місяць</Button>
        <Button onClick={goToWeekView} variant={activeViewCalendar === "week" ? "outlined" : "text"}>Тиждень</Button>
        <Button onClick={goToDayView} variant={activeViewCalendar === "day" ? "outlined" : "text"}>День</Button>
        <Button onClick={goToAgendaView} variant={activeViewCalendar === "agenda" ? "outlined" : "text"}>Тільки події</Button>
      </div>

      
    </div>
  );
};

const handleSelectSlot = (slotInfo) => {

  let year = moment(slotInfo.start).year();
  let day = moment(slotInfo.start).date();
  let month = moment(slotInfo.start).month() + 1;
  let startTime = moment(slotInfo.start).format("HH:mm");
  let endTime = moment(slotInfo.end).format("HH:mm");
  
  if (view === 'day') {
    
    setEventModal({...DEFAULT_ADD_FORM,
      day: day,
      month: month,
      year: year,
      start: startTime,
      end: endTime,
    })
    if (checkAddEvent) {
      setShowEventModal(true);
    }
  }
  
  setDate(slotInfo.start); // Змінюємо поточну дату
  setView('day'); // Перемикаємо на вигляд дня
  setActiveViewCalendar('day')
};

const handleEventSelect = (e) => {
  const resources = e.resource;

  setEventModal({...resources});
  setShowEventModal(true);
  setEditEvent(false)
}

const CustomEvent = ({ event }) => {
  const invertedColor = invertColor(event.resource.color); // Інверсія кольору для контрасту
  return (
    <div 
      style={{ 
        backgroundColor: event.resource.color, 
        border: "solid 2px " + event.resource.color,
        fontSize: "12px", 
        color: invertedColor, 
        padding: '0 5px',
        borderRadius: '5px',
        textAlign: 'center',
        overflow: "hidden",
        textOverflow: "ellipsis",
        //opacity: '.5'
      }} 
      title={event.resource.title} // Передаємо конкретне поле для відображення при наведенні
    >
      {event.resource.title}
    </div>
  );
};


  return (
    <div className='MyBigCalendar'>
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        defaultView="month"
        onNavigate={handleNavigate} // Додаємо подію зміни навігації
        components={{
          toolbar: CustomToolbar,
          event: CustomEvent
        }}
        view={view} // Встановлюємо вигляд календаря
        date={date} // Встановлюємо поточну дату
        selectable={true} // Дозволяємо вибір комірок
        onSelectSlot={handleSelectSlot} // Виклик функції при натисканні на комірку
        onSelectEvent={handleEventSelect}
        
      />
      {showEventModal && <AddCalendarEvent loadEvents={getCalendarList} setEdit={()=>{setEditEvent(!editEvent)}} edit={editEvent} data={eventModal} close={()=>setShowEventModal(false)}/>}
    </div>
  );
};

export default MyBigCalendar;
