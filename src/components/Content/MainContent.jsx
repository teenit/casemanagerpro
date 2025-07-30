import React from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Registration from "../Auth/Registration";
import Home from "../Home/Home";
import User from "../User/User";
import Settings from "../Settings/Settings";
import Recovery from "../Recovery/Recovery";
import Contacts from "../Contacts/Contacts";
import Resources from "../Resources/Resources";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/use-auth";
import Events from "../Events/Events";
import Cooperation from "../Cooperation/Cooperation";
import Task from "../Task/Task";
import AccessPage from "../pages/AccessPage";
import AccessPageRight from "../pages/AccessPageRight";
import TestPage from "../pages/TestPage";
import AddCaseForm from "../Cases/newDesign/AddCaseForm";
import Case from "../newDesign/Case/Case";
import Cases from "../newDesign/Cases/Cases";
import Groups from "../Groups/Groups";
import Search from "../Search/Search";
import AccessCheck from "../Functions/AccessCheck";
import NotFound from "../pages/NotFound";
import Group from "../Groups/Group/Group";
import File from "../pages/File";
import EventsPage from "../pages/EventsPage";
import EventPage from "../pages/EventPage";
import LoginPage from "../pages/LoginPage";
import TransactionsPage from "../pages/TransactionsPage";
import MyBigCalendar from "../newDesign/Calendar/MyBigCalendar";
import TelegramPage from "../pages/TelegramPage";
import FieldsPage from "../pages/FieldsPage";
import GoogleDrivePage from "../pages/GoogleDrivePage";
import AncetsPage from "../pages/AncetsPage";
import AncetaPage from "../pages/AncetaPage";
import AncetaPageWrapper from "../pages/AncetaPageWrapper";
import Statistic from "../Home/Statistic/Statistic";
import UsersPage from "../pages/UsersPage";
import TasksPage from "../pages/TasksPage";
import TaskPage from "../pages/TaskPage";
import WrapperParams from "../pages/WrapperParams";

const MainContent = () => {
  const rights = useSelector(state => state.auth);
  const access = {
    add_case: AccessCheck('page', 'a_page_case_add'),
    cases: AccessCheck('page', "a_cases_get"),
    group: AccessCheck('page', "a_page_group"),
    case: AccessCheck('page', "a_page_case"),
    calendar: AccessCheck('page', "a_page_calendar"),
    access: AccessCheck('page', "a_page_access"),
    event: AccessCheck('page', "a_page_event"),
    events: AccessCheck('page', "a_page_events"),
    groups: AccessCheck('view_edit', "a_page_groups"),
    resources: AccessCheck('page', "a_page_resources"),
    settings: AccessCheck('page', "a_page_settings"),
    user: AccessCheck('page', "a_page_user"),
    phonebook: AccessCheck('page', "a_page_phonebook"),
    users: AccessCheck('yes_no', 'a_page_settings_tab_users'),
    tasks: AccessCheck('view_edit', 'a_task_manager', 'view'),
    task: AccessCheck('view_edit', 'a_task_manager', 'view'),
    file: AccessCheck('view_edit', "a_page_file", "view"),
    fields: AccessCheck('yes_no', "a_super")
  }
  const { isAuth } = useAuth();
  const params = useParams()
  return isAuth ? (
    <div className='wrap__content'>
      <Routes>
        <Route path='/add-case' element={access.add_case ? <AddCaseForm /> : <NotFound />} />
        <Route path='/cases' element={access.cases ? <Cases /> : <NotFound />} />
        <Route path='/case/:id' element={access.case ? <Case /> : <NotFound />} />
        <Route path='/user/:id' element={access.user ? <User /> : <NotFound />} />
        <Route path='/settings' element={access.settings ? <Settings /> : <NotFound />} />
        <Route path='/contacts' element={access.phonebook ? <Contacts /> : <NotFound />} />
        <Route path="/resources" element={access.resources ? <Resources /> : <NotFound />} />
        <Route path="/access" element={access.access ? <AccessPage /> : <NotFound />} />
        <Route path="/access/:id" element={access.access ? <AccessPageRight /> : <NotFound />} />
        {/* <Route path='/events' element={access.events ? <Events /> : <NotFound />} /> */}
        <Route path='/events' element={access.events ? <EventsPage /> : <NotFound />} />
        {/* <Route path='/event/:id' element={access.event ? <EventPage /> : <NotFound />} /> */}
        <Route path='/event/:id' element={access.event ? <EventPage /> : <NotFound />} />
        <Route path='/task/:id' element={access.task ? <WrapperParams component={TaskPage} /> : <NotFound />} />
        <Route path='/telegram' element={<TelegramPage />} />
        <Route path='/cooperation' element={<Cooperation />} />
        <Route path='/groups' element={access.groups ? <Groups /> : <NotFound />} />
        <Route path='/group/:id' element={access.group ? <Group /> : <NotFound />} />
        <Route path='/task' element={<Task />} />
        <Route path='/test' element={<TestPage />} />
        <Route path='/search' element={<Search />} />
        {/* <Route path='/login_new' element={<LoginPage />} /> */}
        <Route path='/transactions' element={<TransactionsPage />} />
        <Route path='/ancets/:id' element={<AncetaPageWrapper />} />
        <Route path='/file/:id' element={access.file ? <File /> : <NotFound />} />
        <Route path='/calendar' element={access.calendar ? <MyBigCalendar /> : <NotFound />} />
        <Route path='/ancets' element={<AncetsPage />} />
        <Route path='/statistic' element={<Statistic />} />
        {/* <Route path='/login' element={<LoginPage />} /> */}
        {/* <Route path='/google-drive' element={<GoogleDrivePage />} /> */}
        <Route path='/fields' element={access.fields ? <FieldsPage /> : <NotFound />} />
        <Route path='/users' element={access.users ? <WrapperParams component={UsersPage}/> : <NotFound />} />
        <Route path='/tasks' element={access.tasks ? <WrapperParams component={TasksPage} /> : <NotFound />} />
        {/* <Route path='/update' element={<UpdateLog />} /> */}
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  ) : (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<Registration />} />
      <Route path='/recovery' element={<Recovery />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default MainContent;
