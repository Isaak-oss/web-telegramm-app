import React, {useState} from 'react';
import s from "../../../pages/AuthPage/AuthPage.module.scss";
import defaulFemaleAvatar from "./defaulFemaleAvatar.png"
import defaulMaleAvatar from "./defaulMaleAvatar.png"
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setAuth} from "../../../store/slices/AuthSlice";
import {setUserData} from "../../../store/slices/ProfileSlice";
import {setIsOpen} from "../../../store/slices/MainSlice";
import axios from "axios";


const RegistrationForm = () => {

    const strengthsList = useSelector((state) => state.profile.strengthsList)
    const myStrengths = useSelector((state) => state.profile.myStrengths)
    const userName = useSelector((state) => state.auth.userFirstName)
    const {register, handleSubmit, formState: {errors}} = useForm();
    const userGender = useSelector((state) => state.auth.gender)
    let accessToken = useSelector((state) => state.auth.accessToken)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //onChange user data
    const onSubmit = data => {
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
            dispatch(setAuth())
            dispatch(setIsOpen())
            if (avatar === defaulMaleAvatar){
                navigate("/confirmPhoto")
            } else {
                navigate("mainPage")
            }
        })

    }

    //onChange user strengths
    const activeTag = (e, id) => {
        if (e.target.checked) {
            // change strengths
            axios.post(`https://99fa-217-29-24-186.ngrok.io/userbot/add_strengths_me`, {id: id} , {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        } else {
            axios.delete(`https://99fa-217-29-24-186.ngrok.io/userbot/add_strengths_me`, { data: { id: id },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }
    }

    let [avatar, setAvatar] = useState(defaulMaleAvatar)
    let [image, setImage] = useState()
    const AvatarChange = (e) => {
        let fileReader = new FileReader();
        fileReader.onload = function() {
            setAvatar(fileReader.result)
        }

        setImage(e.target.files[0])
        fileReader.readAsDataURL(e.target.files[0]);
    }


    return (
        <div className="container">
            <div className="content">
                <div className="wrap">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={s.dFlex}>
                            <input id="loadImg" onChange={(e) => AvatarChange(e)}
                                   className={s.avaratImg}
                                   type="file" accept="image/*"/>
                            <label className={s.loadImgBtn} htmlFor="loadImg">
                                <img src={avatar}
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
                                    <input  {...register("first_name", {required: true})} />
                                </div>
                                <div className={s.info}>
                                    <div className={s.infoTitle}>
                                        Фамилия
                                    </div>
                                    <input  {...register("last_name", {required: true})} />
                                </div>
                                <div className={s.info}>
                                    <div className={s.infoTitle}>
                                        Кто вы?
                                    </div>
                                    <input {...register("profession", {required: true})} />
                                </div>
                                <div className={s.info}>
                                    <div className={s.infoTitle}>
                                        Хорошее био привлекает лайки
                                    </div>
                                    <textarea
                                        {...register("bio", {required: true})}>

                                    </textarea>
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

export default RegistrationForm;