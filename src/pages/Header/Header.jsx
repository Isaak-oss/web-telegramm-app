import React, {useEffect, useState} from 'react';
import logo from "./logo.jpg"
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import defaultMaleAvatar from "./defaulMaleAvatar.png"
import defaultFemaleAvatar from "./defaulFemaleAvatar.png"
import s from "./Header.module.scss"
import axios from "axios";
import {setChatCount, setUserChatNew, setUsersChatList} from "../../store/slices/ChatSlice";

const Header = () => {
    let userPhoto = useSelector((state) => state.profile.userPhoto)
    let userChatNew = useSelector((state) => state.chat.userChatNew)
    const dispatch = useDispatch()
    let accessToken = useSelector((state) => state.auth.accessToken)

    useEffect(() => {
        axios.get(`https://0297-217-29-24-186.ngrok.io/api-bot/userbot/list_contacts_me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(res => {
            dispatch(setUserChatNew(res.data.results.filter(e => e.status === "new")))

        })
    }, [])

    return (
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="row_item">
                        <div className="chatLink">
                            <NavLink to="/chat">
                                <i className='bx bx-message-rounded'></i>
                                {userChatNew.length !== 0  && <div className={s.circle}></div>}
                            </NavLink>
                        </div>
                    </div>
                    <div className="row_item">
                        <NavLink to={"mainPage"}>
                            <div className="logo">
                                <img src={logo} alt="logo"/>
                            </div>
                        </NavLink>
                    </div>
                    <div className="row_item">
                        <div className="profileLink">
                            <NavLink to="/profile">
                                <img src={!userPhoto ? defaultMaleAvatar : userPhoto } alt=""/>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;