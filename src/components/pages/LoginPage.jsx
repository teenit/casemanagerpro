import React, { useState, useEffect } from "react";
import Input from "../elements/Inputs/Input";
import { apiResponse } from "../Functions/get_apiObj";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/Slices/userSlice";
import { Button, TextField } from "@mui/material";
import { LANG } from "../../services/config";

const LoginPage = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
        secretCode: '',
        codeOrganisation: '',
        activeCode: false,
        isLocked: false,
        lockMessage: '',
        remainingTime: 0,
        go: 1,
        type: 'login'
    });

    useEffect(() => {
        const checkLockStatus = () => {
            const lockUntil = parseInt(localStorage.getItem('lockUntil')) || 0;
            const now = Math.floor(new Date().getTime() / 1000);
            const remainingTime = lockUntil - now;

            if (remainingTime > 0) {
                setState(prevState => ({
                    ...prevState,
                    isLocked: true,
                    lockMessage: `${LANG.loginForm.try_again} 
                    ${Math.ceil(remainingTime / 60)} ${LANG.loginForm.minutes}${Math.ceil(remainingTime / 60) > 1
                            ? LANG.loginForm.seconds : ''}.`,
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
            codeOrganisation: state.codeOrganisation,
            type: state.type,
            secretCode: state.secretCode,
            codeOrganisation: state.codeOrganisation
        }, 'user/login.php').then((res) => {
            if (res.status) {
                if (res.message == "Authorization successful.") {
                    localStorage.setItem("token", res.userData.token);
                    localStorage.setItem("email", res.userData.email);
                    localStorage.setItem("id", res.userData.user_id);
                    localStorage.setItem("userName", res.userData.userName);
                    localStorage.setItem("profilePhoto", res.userData.profilePhoto);
                    localStorage.setItem("codeOrganisation", state.codeOrganisation);
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
                        lockMessage: LANG.loginForm.locked_for_hour,
                        remainingTime: 3600,
                        go: now + 3600
                    });
                } else if (updatedTries >= 5) {
                    // Lock for 5 minutes after 5 failed attempts
                    localStorage.setItem('lockUntil', now + 300);
                    setState({
                        ...state,
                        isLocked: true,
                        lockMessage: LANG.loginForm.locked_for_5min,
                        remainingTime: 300,
                        go: now + 300
                    });
                } else {
                    alert(LANG.loginForm.incorrect_password);
                }
            }
        });
    };

    const sendSecretCode = () => {
        apiResponse({ ...state, login: state.email }, 'user/login.php').then((data) => {
            if (data.status) {
                localStorage.setItem("token", data.userData.token);
                localStorage.setItem("email", data.userData.email);
                localStorage.setItem("id", data.userData.user_id);
                localStorage.setItem("userName", data.userData.userName);
                localStorage.setItem("profilePhoto", data.userData.profilePhoto);
                localStorage.setItem("codeOrganisation", state.codeOrganisation);
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
                <span className='LoginPage-switch'>{LANG.loginForm.auth}</span>
            </div>
            <div className="LoginPage-form">
                {!state.activeCode && (
                    <>
                        <TextField
                            label={LANG.loginForm.org_code}
                            value={state.codeOrganisation}
                            onChange={(e) => {
                                setState({ ...state, codeOrganisation: e.target.value })
                            }}
                            type="password"
                            disabled={state.isLocked}
                        />
                    </>

                )}
                {!state.activeCode && (<Input
                    label={LANG.GLOBAL.email}
                    value={state.email}
                    onChange={(e) => setState({ ...state, email: e.target.value })}
                    type={'email'}
                    disabled={state.isLocked}
                    addClass="w100"
                    size="normal"
                />)}
                {!state.activeCode && (
                    <>
                        <TextField
                            label={LANG.GLOBAL.password}
                            value={state.password}
                            onChange={(e) => setState({ ...state, password: e.target.value })}
                            type="password"
                            disabled={state.isLocked}
                        />
                    </>

                )}
                {state.activeCode && (
                    <Input
                        label={LANG.loginForm.code}
                        value={state.secretCode}
                        onChange={(e) => setState({ ...state, secretCode: e.target.value })}
                        type={'text'}
                    />
                )}
                <Button
                    variant='contained'
                    onClick={() => {
                        if (state.type == 'secretCode') {
                            sendSecretCode();
                        } else {
                            sendPassword();
                        }
                    }}
                    disabled={isDisabled}>{LANG.loginForm.enter}</Button>
                {state.isLocked && <p>{state.lockMessage}</p>}
                {state.remainingTime > 0 && <p>${LANG.loginForm.time_remained}: {formatTime(state.remainingTime)}</p>}
            </div>

        </div>
    );
}

export default LoginPage;
