import React, {useState} from 'react';
import s from "../../../pages/AuthPage/AuthPage.module.scss";
import defaulFemaleAvatar from "./defaulFemaleAvatar.png"
import defaulMaleAvatar from "./defaulMaleAvatar.png"
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {setAuth} from "../../../store/slices/AuthSlice";
import {setUserData} from "../../../store/slices/ProfileSlice";
import {setIsOpen} from "../../../store/slices/MainSlice";


const RegistrationForm = () => {
    const userName = useSelector((state) => state.auth.userName)
    const {register, handleSubmit,  formState: {errors}} = useForm();
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
        dispatch(setAuth())
        dispatch(setUserData(data))
        if (true) {
            navigate("/mainPage")
            dispatch(setIsOpen())
        } else {
            navigate("/confirmPhoto")
        }
    }
    return (
        <div className="content">
            <div className="wrap">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.dFlex}>
                        <input id="loadImg"
                               className={s.avaratImg}
                               type="file" accept="image/*"
                               />
                        <label className={s.loadImgBtn} htmlFor="loadImg">
                            <img src={userGender === "male" ? defaulMaleAvatar : defaulFemaleAvatar} id="avatar" alt="devaultAvatar"/>
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
                                <input {...register("userSurname", {required: true})} />
                            </div>
                            <div className={s.info}>
                                <div className={s.infoTitle}>
                                    Кто вы?
                                </div>
                                <input {...register("userWhoAreYou", {required: true})} />
                            </div>
                            <div className={s.info}>
                                <div className={s.infoTitle}>
                                    Хорошее био привлекает лайки
                                </div>
                                <textarea {...register("userAbout", {required: true})}></textarea>
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
    );
};

export default RegistrationForm;