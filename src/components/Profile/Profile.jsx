import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {setAuth} from "../../store/slices/AuthSlice";
import {
    fetchingProfile,
    getProfileData,
    putProfileData,
    setStrengthsList,
    setUserData
} from "../../store/slices/ProfileSlice";
import s from "../../pages/ProfilePage/ProfilePage.module.scss";
import defaulMaleAvatar from "../Auth/RegistrationForm/defaulMaleAvatar.png";
import defaulFemaleAvatar from "../Auth/RegistrationForm/defaulFemaleAvatar.png";
import {setIsOpen} from "../../store/slices/MainSlice";
import axios from "axios";
import Preloader from "../../modules/Preloader/Preloader";


const Profile = () => {
    //react-Hook-Form
    const {register, handleSubmit, formState: {errors}} = useForm();

    //state
    const userName = useSelector((state) => state.profile.userName)
    const userSurname = useSelector((state) => state.profile.userSurname)
    const id = useSelector((state) => state.profile.id)
    const userPhoto = useSelector((state) => state.profile.userPhoto)
    const userWhoAreYou = useSelector((state) => state.profile.userWhoAreYou)
    const userAbout = useSelector((state) => state.profile.userAbout)
    const strengthsList = useSelector((state) => state.profile.strengthsList)
    const myStrengths = useSelector((state) => state.profile.myStrengths)
    const isFetchingProfile = useSelector((state) => state.profile.isFetchingProfile)
    const userGender = useSelector((state) => state.auth.gender)
    let accessToken = useSelector((state) => state.auth.accessToken)

    //useEffect
    useEffect(() => {
        //get profile data
        setAvatar(userPhoto)
    }, [userPhoto])

    //useState


    //hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //onChange user data
    const onSubmit = data => {
        navigate("/mainPage")
        dispatch(setIsOpen())

        //get file from input

        //change name, last_name, bio, profession
        const userId = JSON.parse(localStorage.getItem('id'))
        axios.put(`https://99fa-217-29-24-186.ngrok.io/api-bot/userbot/${userId}`, {
            first_name: data.first_name,
            last_name: data.last_name,
            profession: data.profession,
            bio: data.bio,
            image: image,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => {
            dispatch(setUserData(res.data))
        })
    }
    let TagArr = [...myStrengths]

    //onChange user strengths
    const activeTag = (e, id) => {
        if (e.target.checked) {
            // change strengths
            axios.post(`https://99fa-217-29-24-186.ngrok.io/api-bot/userbot/add_strengths_me`, {id: id}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        } else {
            axios.delete(`https://99fa-217-29-24-186.ngrok.io/api-bot/userbot/add_strengths_me`, {
                data: {id: id},
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }
    }

    let [avatar, setAvatar] = useState(!userPhoto ? defaulMaleAvatar : userPhoto)
    let [image, setImage] = useState()
    //avatarChange
    const AvatarChange = (e) => {
        let fileReader = new FileReader();
        fileReader.onload = function () {
            setAvatar(fileReader.result)
        }
        setImage(e.target.files[0])
        fileReader.readAsDataURL(e.target.files[0]);
    }

    //return
    return (
        <div className="container">
            <div className={s.backArrow} onClick={() => navigate(-1)}>
                <i className='bx bx-left-arrow-alt'></i>
            </div>
            <div className="content">
                <div className="wrap">
                    {isFetchingProfile ?
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={s.dFlex}>
                                <input id="loadImg" onChange={(e) => AvatarChange(e)}
                                       className={s.avaratImg}
                                       type="file" accept="image/*"/>
                                <label className={s.loadImgBtn} htmlFor="loadImg">
                                    <img src={avatar}
                                         alt="devaultAvatar"/>
                                    <div className={"pencil"}>
                                        <i className='bx bx-pencil'></i>
                                    </div>
                                </label>

                                <div className={s.inputInfo}>
                                    <div className={s.info}>
                                        <div className={s.infoTitle}>
                                            Имя
                                        </div>
                                        <input defaultValue={userName} {...register("first_name", {required: true})} />
                                    </div>
                                    <div className={s.info}>
                                        <div className={s.infoTitle}>
                                            Фамилия
                                        </div>
                                        <input
                                            defaultValue={userSurname} {...register("last_name", {required: true})} />
                                    </div>
                                    <div className={s.info}>
                                        <div className={s.infoTitle}>
                                            Кто вы?
                                        </div>
                                        <input
                                            defaultValue={userWhoAreYou} {...register("profession", {required: true})} />
                                    </div>
                                    <div className={s.info}>
                                        <div className={s.infoTitle}>
                                            Хорошее био привлекает лайки
                                        </div>
                                        <textarea
                                            defaultValue={userAbout} {...register("bio")}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className={s.title}>
                                Твоя супер сила, коллега?
                            </div>
                            <div className={s.tegs}>
                                {strengthsList.map(e =>
                                    <div key={e.id} className={s.items}>
                                        <input type="checkbox" id={e.id} hidden={true}
                                               defaultChecked={TagArr.find(item => item.id === e.id)}
                                               onChange={(item) => activeTag(item, e.id)}
                                               value={e.id}/>
                                        <label htmlFor={e.id} className={s.item}>
                                            {e.name}
                                        </label>
                                    </div>
                                )}
                            </div>
                            <button id="submitBtn"
                                    className={s.submitBtn}>
                                Сохранить профиль
                            </button>
                            <div className={s.errorMessage} type="submit" id="errorMessage">
                                Чтоб сохранить профиль сначало нужно его заполнить
                            </div>
                        </form>
                        : <Preloader/>
                    }
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