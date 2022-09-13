import React from 'react';
import s from "./SuccessModal.module.scss"
import {useDispatch} from "react-redux";
import {setIsOpen} from "../../store/slices/MainSlice";

const SuccessModal = () => {
    const dispatch = useDispatch()
    const close = () => {
        dispatch(setIsOpen())
    }
    return (
        <div className={s.successModal}>
            <div className={s.content}>
                <div className={s.wrap}>
                    <div className={s.header}>
                        <div className={s.title}>Бережно сохранили 👌</div>
                        <i className='bx bx-x' onClick={close}></i>
                    </div>
                    <div className={s.text}>
                        Анкета сохранена, теперь можно и анкеты посмотреть!
                    </div>
                    <div className={s.close} >
                        <button onClick={close}>
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;