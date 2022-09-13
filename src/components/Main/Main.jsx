import React, {useMemo, useRef, useState} from 'react';
import s from "../../pages/MainPage/MainPage.module.scss";
import TinderCard from "react-tinder-card";
import Card from "./Cards/Card";
import {useSelector} from "react-redux";
import SuccessModal from "../../modules/SuccessModal/SuccessModal";

const Main = () => {

    let usersArr = [
        {
            name: "yusuf", surname: "hasanov",
            about: "Я такой крутой",
            superPower: "А тут я вообще имба"
        },
        {
            name: "sabona", surname: "hasanov",
            about: "Я as крутой",
            superPower: "А asd я вообще имба"
        }
    ]

    let isOpen = useSelector((state) => state.main.isOpen)
    const [swipeTry, setSwipeTry] = useState(10)
    const [currentIndex, setCurrentIndex] = useState(usersArr.length - 1)
    const [lastDirection, setLastDirection] = useState()
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)

    const childRefs = useMemo(
        () =>
            Array(usersArr.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < usersArr.length - 1

    const canSwipe = currentIndex >= 0

    // set last direction and decrease current index
    const swiped = (direction, nameToDelete, index) => {
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
        console.log(direction, nameToDelete)
    }

    const outOfFrame = (name, idx) => {
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()

    }

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < usersArr.length) {
            await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    }

    // increase current index and show card
    const goBack = async () => {
        if (!canGoBack) return
        const newIndex = currentIndex + 1
        updateCurrentIndex(newIndex)
        await childRefs[newIndex].current.restoreCard()
    }

    return (
        <>
            {isOpen && <SuccessModal />}
            {swipeTry ?
                <div className="container">
                    <div className="wrap">
                        <div className={s.swiper}>
                            <div className={s.swiperCards}>
                                {usersArr.map((e, index) => <Card swiped={swiped}
                                                         key={e.name} childRefs={childRefs}
                                                         name={e.name} index={index}
                                                         surname={e.surname}
                                                         about={e.about} superPower={e.superPower}
                                                         outOfFrame={outOfFrame}/>)}
                                <div className={s.swiperButtons} >
                                    <div className={s.falseBtn} onClick={() => swipe('left')}>
                                        <i className='bx bx-x'></i>
                                    </div>
                                    <div className={s.trueBtn} onClick={() => {
                                        setSwipeTry(swipeTry - 1)
                                        swipe('right')
                                    }}>
                                        <i className='bx bx-heart'>
                                        </i>
                                        <div className={s.coutOfTry}>
                                            {swipeTry}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <div className="container">
                    <div className="content">
                        <div className="wrap">
                            <img src="" alt=""/>
                            <div className={s.title}>
                                На сегодня хватит!
                            </div>
                            <div className={s.text}>
                                В день можно поставить только 10 лайков тем
                                они и ценны. Завтра будет новый день, будут новые лайки!
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>)
};

export default Main;