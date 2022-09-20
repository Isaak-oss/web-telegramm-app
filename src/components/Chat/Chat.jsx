import React, {useEffect, useState} from 'react';
import s from "../../pages/ChatPage/ChatPage.module.scss"
import defaultPhoto from "../../pages/Header/defaulMaleAvatar.png"
import UserInfoModal from "../../modules/UserInfoModal/UserInfoModal";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setChatCount, setUserChatNew, setUsersChatList} from "../../store/slices/ChatSlice";
import ChatItem from "./ChatItem";
import {useNavigate} from "react-router-dom";

const Chat = () => {
    let [isModal, setIsModal] = useState(false)
    let [currentIndex, setCurrentIndex] = useState(null)
    let [stat, setStat] = useState(false)

    //hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //useSelector
    let accessToken = useSelector((state) => state.auth.accessToken)
    let usersChatList = useSelector((state) => state.chat.usersChatList)
    let chatCount = useSelector((state) => state.chat.chatCount)
    let userName = useSelector((state) => state.profile.userName)

    //useEffect
    useEffect(() => {
        axios.get(`https://99fa-217-29-24-186.ngrok.io/api-bot/userbot/list_contacts_me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(res => {
            dispatch(setUsersChatList(res.data.results))
            dispatch(setChatCount(res.data.count))
        })
    }, [stat])

    //modal options
    const setClickedIndex = (index) => {
        setIsModal(true)
        setCurrentIndex(index)
    }

    //usersChatList filtration
    let usersChatListNew = usersChatList.filter(e => e.status === "new")
    let usersChatListOld = usersChatList.filter(e => e.status === "old")

    //setOld all userChatList
    const setOld = () => {
        axios.put(`https://99fa-217-29-24-186.ngrok.io/api-bot/userbot/put_contact_me`, {status: "old"}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }).then(res => {
            setStat(true)
            dispatch(setUserChatNew(res.data.results.filter(e => e.status === "new")))
        })
    }

    //setOld current userChatList
    const setCurrentOld = (userId) => {
        axios.put(`https://99fa-217-29-24-186.ngrok.io/api-bot/userbot/${userId}/put_contact_me`, {status: "old"}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }).then(res => {
            setStat(true)
            dispatch(setUserChatNew(res.data.results.filter(e => e.status === "new")))
        })
    }
    const empty = () => {

    }

    return (
        <div className="container">
            <div className="content relNone">
                {usersChatList.length === 0 ?
                    <div className="wrap">
                        <div className={s.notAuthTitle}>
                            {userName}, пока без мэтчей
                        </div>
                        <div className={s.notAuthText}>
                            Лайкайте понравившиеся анкеты, и при
                            взаимных лайках тут появится ваш мэтч!
                        </div>
                        <a className={s.subscribe}>
                            <button className={s.notAuthBtn}
                                    onClick={() => navigate("/mainPage")}>
                                Смотреть анкеты
                            </button>
                        </a>
                    </div>
                    :
                    <div className="wrap">
                        <div className={s.title}>
                            Ваши мэтчи <span>{chatCount}</span>
                        </div>
                        {usersChatListNew.map((e, index) =>
                            <ChatItem id={e.user_to.id} image={e.user_to.image}
                                      userIdChat={e.id} defaultPhoto={defaultPhoto}
                                      first_name={e.user_to.first_name} index={index}
                                      last_name={e.user_to.last_name} key={e.id}
                                      profession={e.user_to.profession}
                                      setClickedIndex={setClickedIndex}
                                      setCurrentOld={setCurrentOld}/>
                        )}
                        {usersChatListNew.length !== 0 &&
                            <div className={s.setOld} onClick={setOld}>
                                Отметить просмотренным
                            </div>}
                        {usersChatListOld.map((e, index) =>
                            <ChatItem id={e.user_to.id} image={e.user_to.image}
                                      userIdChat={e.id} defaultPhoto={defaultPhoto}
                                      first_name={e.user_to.first_name} index={index}
                                      last_name={e.user_to.last_name} key={e.id}
                                      profession={e.user_to.profession}
                                      setCurrentOld={empty} defaultPhoto={defaultPhoto}
                                      setClickedIndex={setClickedIndex}/>
                        )}
                        {isModal &&
                            <UserInfoModal usersChatArr={usersChatList[currentIndex].user_to}
                                           setIsModal={setIsModal} defaultPhoto={defaultPhoto}/>
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default Chat;