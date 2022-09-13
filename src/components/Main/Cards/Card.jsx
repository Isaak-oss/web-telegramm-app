import React from 'react';
import s from "../../../pages/MainPage/MainPage.module.scss";
import TinderCard from "react-tinder-card";

const Card = (props) => {
    return (

        <TinderCard className={s.posAbsolute}
                    ref={props.childRefs[props.index]}
                    key={props.name}
                    onSwipe={(dir) => props.swiped(dir, props.name, props.index)}
                    onCardLeftScreen={() => props.outOfFrame(props.name, props.index)}>

            <div className={s.cardInfo}>
                <img src="./img/devaultAvatar.jpg"
                     alt=""
                     id="avatar"/>
                <h2 id="cardTitle">
                    {props.name} {props.surname}
                </h2>
                <p className={s.cardSubTitle}
                   id="cardSubTitle">Программист</p>
                <div className={s.cardInputContent}>
                    <div className={s.p10}>
                        <p className={s.cardSubTitle}>Обо мне</p>
                        <input id="about"
                               readOnly
                               value={props.about}
                               type="text"/>

                        <p className={s.cardSubTitle}>Моя супер сила</p>
                        <input readOnly
                               value={props.superPower}
                               id="superPower"
                               type="text"/>
                    </div>
                </div>
            </div>
        </TinderCard>
    );
};

export default Card;