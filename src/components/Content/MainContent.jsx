import React from "react";
import Login from "../Auth/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import AddCase from '../Cases/Add-case/AddCase';
import Registration from "../Auth/Registration";
import Home from "../Home/Home";
import User from "../User/User";
import Settings from "../Settings/Settings";
import Recovery from "../Recovery/Recovery";
import Contacts from "../Contacts/Contacts";
import Resources from "../Resources/Resources";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../hooks/use-auth";
import Events from "../Events/Events";
import Event from "../Events/Event/Event";
import Calendar from "../Calendar/Calendar";
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
import TextEditor from "../elements/TextEditor/TextEditor";
import File from "../pages/File";
import UpdateLog from "../pages/UpdateLog";

const MainContent = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.user);
  const access = {
    add_case: AccessCheck('page', 'a_page_case_add'),
    cases: AccessCheck('page', "a_cases_get"),
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
  }
  const { isAuth } = useAuth();
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
        <Route path='/events' element={access.events ? <Events /> : <NotFound />} />
        <Route path='/event/:id' element={access.event ? <Event /> : <NotFound />} />
        <Route path='/calendar' element={access.calendar ? <Calendar /> : <NotFound />} />
        <Route path='/cooperation' element={<Cooperation />} />
        <Route path='/groups' element={access.groups ? <Groups /> : <NotFound />} />
        <Route path='/group/:id' element={<Group />} />
        <Route path='/task' element={<Task />} />
        <Route path='/test' element={<TestPage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/file/:id' element={<File />} />
        <Route path='/update' element={<UpdateLog />} />
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  ) : (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/recovery' element={<Recovery />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default MainContent;
