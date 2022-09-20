import React from 'react';
import s from "../../pages/ChatPage/ChatPage.module.scss";
import {useNavigate} from "react-router-dom";

const ChatItem = (props) => {
    let tg = window.Telegram.WebApp;
    const navigate = useNavigate()
    return (
        <div key={props.id} className={s.row}>
            <div className={s.textContent} onClick={() => {
                props.setClickedIndex(props.index)
                props.setCurrentOld(props.userIdChat)
            }}>
                <img src={props.image} alt="image"/>
                <div className={s.userName}>
                    <div className={s.name}>
                        {props.first_name} {props.last_name}
                    </div>
                    <div className={s.userWho}>
                        {props.profession}
                    </div>
                </div>
            </div>
            <a href={`tg://user?id=${props.id}`} onClick={() => {
                navigate(`tg://user?id=${props.id}`)
                tg.close()
            }} className={s.chatBtn}>
                <i className='bx bx-message-rounded'></i>
            </a>
        </div>
    );
};

export default ChatItem;