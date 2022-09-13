import React from 'react';
import logo from "./logo.jpg"
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import defaultMaleAvatar from "./defaulMaleAvatar.png"
import defaultFemaleAvatar from "./defaulFemaleAvatar.png"

const Header = () => {
    let gender = useSelector((state) => state.auth.gender)
    let userPhoto = useSelector((state) => state.profile.userPhoto)
    return (
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="row_item">
                        <div className="chatLink">
                            <NavLink to="./chat">
                                <i className='bx bx-message-rounded'></i>
                            </NavLink>
                        </div>
                    </div>
                    <div className="row_item">
                        <NavLink to={"mainPage"}>
                            <div className="logo">
                                <img src={logo} alt="logo"/>
                            </div>
                        </NavLink>
                    </div>
                    <div className="row_item">
                        <div className="profileLink">
                            <NavLink to="/profile">
                                <img src={userPhoto ? userPhoto : gender === "male" ? defaultMaleAvatar : defaultFemaleAvatar } alt=""/>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;