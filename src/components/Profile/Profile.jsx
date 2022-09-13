import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {setAuth} from "../../store/slices/AuthSlice";
import {setUserData} from "../../store/slices/ProfileSlice";
import s from "../../pages/ProfilePage/ProfilePage.module.scss";
import defaulMaleAvatar from "../Auth/RegistrationForm/defaulMaleAvatar.png";
import defaulFemaleAvatar from "../Auth/RegistrationForm/defaulFemaleAvatar.png";
import {setIsOpen} from "../../store/slices/MainSlice";

const Profile = () => {
    const userName = useSelector((state) => state.profile.userName)
    const userSurname = useSelector((state) => state.profile.userSurname)
    const userPhoto = useSelector((state) => state.profile.userPhoto)
    const userWhoAreYou = useSelector((state) => state.profile.userWhoAreYou)
    const userTags = useSelector((state) => state.profile.userTag)
    const userAbout = useSelector((state) => state.profile.userAbout)
    const {register, handleSubmit, formState: {errors}} = useForm();
    const userGender = useSelector((state) => state.auth.gender)
    const dispatch = useDispatch()
    let [userTag, setUserTag] = useState("")
    const tagsArr = [
        {title: "шарю за финансы", id: 1},
        {title: "лидирую проекты", id: 2},
        {title: "ращу продукты", id: 3},
        {title: "пишу тексты", id: 4},
        {title: "делаю сайты как надо", id: 5},
        {title: "делаю ивенты", id: 6},
    ]
    const navigate = useNavigate()
    const onSubmit = data => {
        navigate("/mainPage")
        dispatch(setIsOpen())
    }
    return (
        <div className="container">
            <div className={s.backArrow} onClick={() => navigate(-1)}>
                <i className='bx bx-left-arrow-alt'></i>
            </div>
            <div className="content">
                <div className="wrap">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={s.dFlex}>
                            <input id="loadImg"
                                   className={s.avaratImg}
                                   type="file" accept="image/*"
                                   {...register("userPhoto")}/>
                            <label className={s.loadImgBtn} htmlFor="loadImg">
                                <img src={userGender === "male" ? defaulMaleAvatar : defaulFemaleAvatar} id="avatar"
                                     alt="devaultAvatar"/>
                                <div className={s.pencil}>
                                    <i className='bx bx-pencil'></i>
                                </div>
                            </label>

                            <div className={s.inputInfo}>
                                <div className={s.info}>
                                    <div className={s.infoTitle}>
                                        Имя
                                    </div>
                                    <input defaultValue={userName} {...register("userName", {required: true})} />
                                </div>
                                <div className={s.info}>
                                    <div className={s.infoTitle}>
                                        Фамилия
                                    </div>
                                    <input defaultValue={userSurname} {...register("userSurname", {required: true})} />
                                </div>
                                <div className={s.info}>
                                    <div className={s.infoTitle}>
                                        Кто вы?
                                    </div>
                                    <input defaultValue={userWhoAreYou} {...register("userWhoAreYou", {required: true})} />
                                </div>
                                <div className={s.info}>
                                    <div className={s.infoTitle}>
                                        Хорошее био привлекает лайки
                                    </div>
                                    <textarea defaultValue={userAbout} {...register("userAbout", {required: true})}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className={s.title}>
                            Твоя супер сила, коллега?
                        </div>
                        <div className={s.tegs}>
                            {tagsArr.map(e =>
                                <div className={s.item}
                                     onClick={() => setUserTag(e.title)}
                                     key={e.id}>
                                    {e.title}
                                </div>)}
                            <input type="text"
                                   value={userTag}
                                   {...register("userTag")}/>
                        </div>
                        <button id="submitBtn"
                                className={s.submitBtn}>
                            Сохранить профиль
                        </button>
                        <div className={s.errorMessage} type="submit" id="errorMessage">
                            Чтоб сохранить профиль сначало нужно его заполнить
                        </div>
                    </form>
                </div>
            </div>

            <div className={s.privacyPolicy}>
                <a href="https://docs.google.com/document/d/1E9ZH2JzquD8o7a-cic-UBljYVT-ix--15CP6z4llUZw/view">
                    Политика конфиденцеальности
                </a>
            </div>
        </div>
    );
};


export default Profile;