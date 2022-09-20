import React from 'react';
import s from "./UserInfoModal.module.scss"


const UserInfoModal = ({usersChatArr, setIsModal, defaultPhoto}) => {
    return (
        <div className={s.modal} onClick={() => setIsModal(false)}>
            <div className={s.container}>
                <div className={"content"} onClick={e => e.stopPropagation()}>
                    <div className="wrap">
                        <div className={s.miniInfo}>
                            <div className={s.closeBtn} onClick={() => setIsModal(false)}>
                            <i className='bx bx-x'></i>
                            </div>
                            <img src={!usersChatArr.image ? defaultPhoto : usersChatArr.image} alt=""/>
                            <div className={s.name}>
                                {usersChatArr.first_name} {usersChatArr.last_name}
                            </div>
                            <div className={s.subtitle}>
                                {usersChatArr.profession}
                            </div>
                        </div>

                        <div className={s.aboutInfo}>
                            <div className={s.about}>
                                <div className={s.title}>
                                    Обо мне
                                </div>
                                <div className={s.text}>
                                    {usersChatArr.bio}
                                </div>
                            </div>

                            <div className={s.superPower}>
                                <div className={s.title}>
                                    Моя суперсила
                                </div>
                                <div className={s.text}>
                                    {usersChatArr.strengths.map((e, index) => <div className={s.item} key={e.id}>
                                        {(index ? ', ': '') + e.name}
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfoModal;