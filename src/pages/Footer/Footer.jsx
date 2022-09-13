import React from 'react';
import footerImg from "./footerImg.jpg"
const Footer = () => {
    return (
        <footer className={"footer"}>
            <div className={"container"}>
                <div className="altc">
                    <img src={footerImg} alt=""/>
                </div>
            </div>
        </footer>
    );
};

export default Footer;