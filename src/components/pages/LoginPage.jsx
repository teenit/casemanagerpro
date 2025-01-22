import React, { useState, useEffect } from "react";
import Input from "../elements/Inputs/Input";
import { apiResponse } from "../Functions/get_apiObj";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { loadUserAuth } from "../../actions/auth";
import { Button } from "@mui/material";
import Registration from "../Auth/Registration";

const LoginPage = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
        secretCode: '',
        activeCode: false,
        isLocked: false,
        lockMessage: '',
        remainingTime: 0,
        go: 1,
        type: 'login'
    });
    const [activeLogin, setActiveLogin] = useState(true)

    useEffect(() => {
        const checkLockStatus = () => {
            const lockUntil = parseInt(localStorage.getItem('lockUntil')) || 0;
            const now = Math.floor(new Date().getTime() / 1000);
            const remainingTime = lockUntil - now;

            if (remainingTime > 0) {
                setState(prevState => ({
                    ...prevState,
                    isLocked: true,
                    lockMessage: `Account is locked. Try again in ${Math.ceil(remainingTime / 60)} minute${Math.ceil(remainingTime / 60) > 1 ? 's' : ''}.`,
                    remainingTime
                }));

                // Start a timer to update the remaining time every second
                const timer = setInterval(() => {
                    const now = Math.floor(new Date().getTime() / 1000);
                    const updatedRemainingTime = lockUntil - now;

                    if (updatedRemainingTime <= 0) {
                        clearInterval(timer);
                        setState(prevState => ({
                            ...prevState,
                            isLocked: false,
                            lockMessage: '',
                            remainingTime: 0
                        }));
                        localStorage.removeItem('lockUntil');
                    } else {
                        setState(prevState => ({
                            ...prevState,
                            remainingTime: updatedRemainingTime
                        }));
                    }
                }, 1000);

                return () => clearInterval(timer); // Cleanup the interval on component unmount
            } else {
                setState(prevState => ({
                    ...prevState,
                    isLocked: false,
                    lockMessage: '',
                    remainingTime: 0
                }));
            }
        };

        checkLockStatus();
    }, [state.go]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sendPassword = () => {
        const tries = parseInt(localStorage.getItem('tries')) || 0;
        const now = Math.floor(new Date().getTime() / 1000);

        // Check if the account is locked
        if (state.isLocked) {
            alert(state.lockMessage);
            return;
        }

        apiResponse({
            login: state.email,
            password: state.password,
            type: state.type,
            secretCode: state.secretCode
        }, 'user/login.php').then((res) => {
            if (res.status) {
                if (res.message == "Authorization successful.") {
                    localStorage.setItem("token", res.userData.token);
                    localStorage.setItem("email", res.userData.email);
                    localStorage.setItem("id", res.userData.user_id);
                    localStorage.setItem("userName", res.userData.userName);
                    localStorage.setItem("profilePhoto", res.userData.profilePhoto);
                    dispatch(setUser({
                        email: res.userData.email,
                        id: res.userData.user_id,
                        token: res.userData.token,
                        userName: res.userData.userName,
                        profilePhoto: res.userData.profilePhoto,
                        access: res.access
                    }));

                    if (window.location.pathname == "/login") {
                        window.location.href = "/";
                    } else {
                        window.location.reload();
                    }
                   
                } else {
                    setState({ ...state, activeCode: true, type: 'secretCode' });
                    // Reset tries on successful login
                    localStorage.removeItem('tries');
                    localStorage.removeItem('lockUntil');
                }
              
            } else {
                let updatedTries = tries + 1;
                localStorage.setItem('tries', updatedTries);

                if (updatedTries >= 10) {
                    // Lock for 1 hour after 10 failed attempts
                    localStorage.setItem('lockUntil', now + 3600);
                    setState({
                        ...state,
                        isLocked: true,
                        lockMessage: 'Too many failed attempts. Account locked for 1 hour.',
                        remainingTime: 3600,
                        go: now + 3600
                    });
                } else if (updatedTries >= 5) {
                    // Lock for 5 minutes after 5 failed attempts
                    localStorage.setItem('lockUntil', now + 300);
                    setState({
                        ...state,
                        isLocked: true,
                        lockMessage: 'Too many failed attempts. Account locked for 5 minutes.',
                        remainingTime: 300,
                        go: now + 300
                    });
                } else {
                    alert('Incorrect password. Try again.');
                }
            }
        });
    };

    const sendSecretCode = () => {
        apiResponse({...state, login: state.email}, 'user/login.php').then((data)=>{
            if (data.status) {
                localStorage.setItem("token", data.userData.token);
                localStorage.setItem("email", data.userData.email);
                localStorage.setItem("id", data.userData.user_id);
                localStorage.setItem("userName", data.userData.userName);
                localStorage.setItem("profilePhoto", data.userData.profilePhoto);
                dispatch(setUser({
                    email: data.userData.email,
                    id: data.userData.user_id,
                    token: data.userData.token,
                    userName: data.userData.userName,
                    profilePhoto: data.userData.profilePhoto,
                    access: data.access
                }));
                
                if (window.location.pathname == "/login") {
                    window.location.href = "/";
                } else {
                    window.location.reload();
                }
            }
        })
        
    };

    // Determine if the login button should be disabled
    const isDisabled = !state.email || !state.password || state.isLocked;

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes} minute${minutes > 1 ? 's' : ''} ${secs} second${secs > 1 ? 's' : ''}`;
    };

    return (
        <div className="LoginPage">
            <div className="" >
                <span className={`LoginPage-switch ${activeLogin && 'active'}`} onClick={()=>setActiveLogin(true)}>Авторизація</span>
                <span>/</span>
                <span className={`LoginPage-switch ${!activeLogin && 'active'}`} onClick={()=>setActiveLogin(false)}>Реєстрація</span>
                </div>
            {activeLogin ? <div className="LoginPage-form">
            {!state.activeCode && ( <Input
                label={"Електронна пошта"}
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                type={'email'}
                disabled={state.isLocked}
            />)}
            {!state.activeCode && (
                <Input
                    label={"Пароль"}
                    value={state.password}
                    onChange={(e) => setState({ ...state, password: e.target.value })}
                    type={'password'}
                    disabled={state.isLocked}
                />
            )}
            {state.activeCode && (
                <Input
                    label={"Код"}
                    value={state.secretCode}
                    onChange={(e) => setState({ ...state, secretCode: e.target.value })}
                    type={'text'}
                />
            )}
            <Button 
                variant='contained'
                onClick={()=>{
                    if (state.type == 'secretCode') {
                        sendSecretCode();
                    } else {
                        sendPassword();
                    }
                }} 
                disabled={isDisabled}>Увійти</Button>
            {state.isLocked && <p>{state.lockMessage}</p>}
            {state.remainingTime > 0 && <p>Залишилось часу: {formatTime(state.remainingTime)}</p>}
            </div>: <Registration switchForms={()=>setActiveLogin(true)}/>
            }
            
        </div>
    );
}

export default LoginPage;
