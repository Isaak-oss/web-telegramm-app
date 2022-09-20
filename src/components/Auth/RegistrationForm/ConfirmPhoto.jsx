import React from 'react';
import s from "../../../pages/AuthPage/AuthPage.module.scss"
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setIsOpen} from "../../../store/slices/MainSlice";
import axios from "axios";
import {setUserData} from "../../../store/slices/ProfileSlice";
import {setAuth} from "../../../store/slices/AuthSlice";
import defaulMaleAvatar from "./defaulMaleAvatar.png"
import {useState} from "react";

const ConfirmPhoto = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let accessToken = useSelector((state) => state.auth.accessToken)
    let userFirstName = useSelector((state) => state.auth.userFirstName)

    const onSubmit = (e) => {
        //change image
        let image = e.target.files[0]
        const userId = JSON.parse(localStorage.getItem('id'))
        axios.put(`https://99fa-217-29-24-186.ngrok.io/api-bot/userbot/${userId}`, {
            image: image,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => {
            dispatch(setUserData(res.data))
            dispatch(setAuth())
            dispatch(setIsOpen())
            navigate("mainPage")
        })
    }


    return (
        <div className="container">
            <div className="content">
                <div className="wrap">
                    <div className="altc">
                        <div className={s.imgWrap}>

                                <div className={s.selectImg}>
                                    <i className='bx bx-camera'></i>
                                </div>

                        </div>
                        <div className={s.title} id="confirmAvatarTitle">
                            Эй, {userFirstName}, а фоточку?
                        </div>
                        <div className={s.text} id="confirmAvatarText">
                            Скажем по секрету, профили с фотками лайкают на 146% чаще.
                        </div>
                        <div className={s.confirmBtn}>
                            <input id="confirmImg" className={s.avaratImg}
                                   type="file" accept="image/*"
                                   onChange={onSubmit}/>
                            <label htmlFor="confirmImg" className={s.confirmImg}>
                                <div id="confirmAvatarBtn"
                                     className={s.submitBtn}>
                                    Выбрать фото
                                </div>
                            </label>
                        </div>
                        <div onClick={() => {
                            navigate("/maiPage")
                            dispatch(setIsOpen())
                        }} className={s.secontContenta}>
                            Что ж, обойдусь без лайков
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPhoto;