import React from 'react';
import {useSelector} from "react-redux";
import s from "../../pages/AccVerificationPage/AccVerificationPage.module.scss"

const AccVerification = () => {
    let isSubscribed = useSelector((state) => state.auth.isSubscribed)
    let userName = useSelector((state) => state.auth.setUserName)
    return (
        <div className="container">
            <div className="content">
                <div className="wrap">
                    <div className={s.notAuthTitle}>
                        {!isSubscribed ? "Упс, так не пойдет" : `Упс, ${userName}, так не получится`}
                    </div>
                    <div className={s.notAuthText} >
                        {!isSubscribed ?
                            "С вас подписка на канал, с нас доступ к анкетам других участников и неизвестному нетворкингу. Deal?"
                            : "У вас не заполнено имя пользователя в Telegram. В случае мэтча с вами не получится связаться. Заполните его в настройках и возвращайтесь"
                        }
                    </div>
                    {!isSubscribed &&
                        <a href="https://t.me/setters" className={s.subscribe}>
                            <button className={s.notAuthBtn}>Сейчас подпишусь</button>
                        </a>
                    }
                </div>
            </div>
        </div>
    );
};

export default AccVerification;