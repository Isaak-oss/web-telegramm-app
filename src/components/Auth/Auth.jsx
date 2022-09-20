import React, {useEffect, useState} from 'react';
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setAccess, setIsAuthFetching} from "../../store/slices/AuthSlice";
import Preloader from "../../modules/Preloader/Preloader";

const Auth = () => {
    const dispatch = useDispatch()
    // let tg = window.Telegram.WebApp;
    // let userId = tg.initDataUnsafe.user.id
    let isAuthFetching = useSelector((state) => state.auth.isAuthFetching)
    useEffect(() => {
        axios.post(`https://99fa-217-29-24-186.ngrok.io/api-bot/userbot/auth`, {id: 54321})
            .then(res => {
                    dispatch(setAccess(res.data))
                    localStorage.setItem('id', JSON.parse(54321))
                }
            )
    }, [])

    return (
        <div className="container ">
            {!isAuthFetching ? <Preloader/> :
                <RegistrationForm/>
            }
        </div>
    );
};

export default Auth;