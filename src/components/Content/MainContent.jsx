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
import { useDispatch } from "react-redux";
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

const localToken = localStorage.getItem("token");

const MainContent = ()=>{
  const dispatch = useDispatch();
  const {isAuth} = useAuth();
    return isAuth ?(
        <div className='wrap__content'>
          <Routes >
            <Route path='/add-case' element={<AddCaseForm />} />
            <Route path='/cases' element={<Cases />} />
            <Route path='/case/:id' element={<Case />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/login' element={<Login />} />
            <Route path='/user' element={<User />} />
            <Route path='settings' element={<Settings />} />
            <Route path='/contacts' element={<Contacts/>} />
            <Route path="/resources" element = {<Resources />} />
            <Route path="/access" element = {<AccessPage />} />
            <Route path="/access/:id" element = {<AccessPageRight />} />
            <Route path='events' element={<Events />} />
            <Route path='events/:link' element={<Event />} />
            <Route path='calendar' element={<Calendar />} />
            <Route path='cooperation' element={<Cooperation />} />
            <Route path='groups' element={<Groups />} />
            <Route path='task' element={<Task />} />
            <Route path='test' element={<TestPage />} />
            <Route index element={<Home />} />
          </Routes>
        </div>
    ):(
      <Routes>
         <Route path='/login' element={<Login />} />
         <Route path='/recovery' element={<Recovery />} />
      </Routes>
       
    )
}

export default MainContent;