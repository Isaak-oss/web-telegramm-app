import React from 'react';
import s from "../MainPage.module.scss";

const NoUsersList = () => {
    return (
        <div className="container">
            <div className="content">
                <div className="wrap">
                    <div className={s.noUsersList}>
                        Извините, но на данный момент анкеты отсуствуют,
                        пожалуйста подождите пока тут не появятся новые пользователи
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoUsersList;