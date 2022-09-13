import React from 'react';
import s from "../../../pages/AuthPage/AuthPage.module.scss"
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setIsOpen} from "../../../store/slices/MainSlice";

const ConfirmPhoto = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
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
                            Эй, ИМЯ, а фоточку?
                        </div>
                        <div className={s.text} id="confirmAvatarText">
                            Скажем по секрету, профили с фотками лайкают на 146% чаще.
                        </div>
                        <div className={s.confirmBtn} onClick={() => {
                            navigate("/maiPage")
                            dispatch(setIsOpen())
                        }}>
                            <input id="confirmImg" className={s.avaratImg} type="file" accept="image/*"/>
                            <label htmlFor="confirmImg" className={s.confirmImg}>
                                <div id="confirmAvatarBtn"
                                     className={s.submitBtn}>
                                    Выбрать фото
                                </div>
                            </label>
                        </div>
                        <div onClick={() => {navigate("/maiPage")
                            dispatch(setIsOpen())}} className={s.secontContenta}>
                            Что ж, обойдусь без лайков
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPhoto;