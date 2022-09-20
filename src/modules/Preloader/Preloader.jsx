import React from 'react';
import s from "./Preloader.module.scss"
const Preloader = () => {
    return (
        <div className={s.preloader}>
            <i className='bx bx-loader-alt bx-spin bx-rotate-90'></i>
        </div>
    );
};

export default Preloader;