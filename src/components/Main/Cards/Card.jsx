import React, {useState} from 'react';
import s from "../../../pages/MainPage/MainPage.module.scss";
import TinderCard from "react-tinder-card";

const Card = (props) => {

    const [slideStyle, setSlideStyle] = useState("")
    const style = {
        background : `${slideStyle === "right" ? "#00DD1590" 
            : slideStyle === "left" ? "#DD001590" : slideStyle === "up" ? "#00DD1590" 
                : slideStyle === "down" && "#DD001590"}`,
        transition : `all 0.1s`,

    }
    return (
        <>
            <TinderCard className={"posAbsolute"}
                        ref={props.childRefs[props.index]}
                        key={props.id}
                        onSwipe={(dir) => {
                            setSlideStyle(dir)
                            props.swiped(dir, props.id, props.index)
                        }}
                        onCardLeftScreen={() => props.outOfFrame(props.id, props.index)}>
                <div className={s.fakeBlock} style={style}>
                    {slideStyle === "right" ? <i className='bx bx-heart'></i> :
                        slideStyle === "left" && <div className={s.falseSwap}>
                            <i className='bx bx-x'></i>
                    </div>}
                </div>
                <div className={"cardInfo"} >

                    <div className={s.wrap}>
                        <img src={props.photo}
                             alt=""
                             id="avatar"/>
                        <h2 className="cardTitle">
                            {props.name} {props.surname}
                        </h2>
                        <p className={s.cardSubTitleAbout}
                           id="cardSubTitle">{props.about}</p>
                        <div className={s.cardInputContent}>
                            <div className={s.p10}>
                                <p className={s.cardSubTitle}>Обо мне</p>
                                <div className={s.bio}>
                                    {props.bio}
                                </div>
                                {props.strengths &&
                                    <>
                                        <p className={s.cardSubTitle}>Моя супер сила</p>
                                        <div className={s.items}>
                                            {props.strengths.map((e, index) =>
                                                <span className={s.item} key={e.id}>
                                                    {(index ? ', ' : '') + e.name}
                                                </span>
                                            )}
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </TinderCard>

        </>
    );
};

export default Card;