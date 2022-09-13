import React, {useState} from 'react';
import s from "../../pages/AuthPage/AuthPage.module.scss"
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import ConfirmPhoto from "./RegistrationForm/ConfirmPhoto";

const Auth = () => {
    return (
        <div className="container ">
            <RegistrationForm />
        </div>
    );
};

export default Auth;