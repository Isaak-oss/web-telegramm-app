import React, {useEffect, useMemo, useRef, useState} from 'react';
import s from "../../pages/MainPage/MainPage.module.scss";
import TinderCard from "react-tinder-card";
import Card from "./Cards/Card";
import {useDispatch, useSelector} from "react-redux";
import SuccessModal from "../../modules/SuccessModal/SuccessModal";
import {fetchingUsersList, getMainUsersList, setLikeCount, setUsersList} from "../../store/slices/MainSlice";
import defautlFemaleAvatar from "../../pages/Header/defaulFemaleAvatar.png"
import defautlMaleAvatar from "../../pages/Header/defaulMaleAvatar.png"
import {getAccessToken, setAccess} from "../../store/slices/AuthSlice";
import {AuthApi} from "../../api/api";
import axios from "axios";
import NoUsersList from "../../pages/MainPage/Errors/noUsersList";

const Main = () => {
    let usersList = useSelector((state) => state.main.usersList)
    const dispatch = useDispatch()
    let isFetching = useSelector((state) => state.main.isFetchingUsersList)
    let isOpen = useSelector((state) => state.main.isOpen)
    const [swipeTry, setSwipeTry] = useState(10)
    const [currentIndex, setCurrentIndex] = useState(usersList.length - 1)
    const [lastDirection, setLastDirection] = useState()
    let accessToken = useSelector((state) => state.auth.accessToken)
    let likeCount = useSelector((state) => state.main.likeCount)
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)

    //useEffect
    useEffect(() => {
        axios.get(`https://99fa-217-29-24-186.ngrok.io/api-bot/userbot/get_count_like_me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(res => {
            dispatch(setLikeCount(res.data))
        })
    }, [])

    const childRefs = useMemo(
        () =>
            Array(usersList.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < usersList.length

    const canSwipe = currentIndex >= 0

    // set last direction and decrease current index
    const [isUsersList, setIsUsersList] = useState(true)
    const swiped = (direction, nameToDelete, index) => {
        setLastDirection(direction)

        updateCurrentIndex(index - 1)
        if (index <= 0) {
            setIsUsersList(false)
        }
        if (direction === "right"){
            direction = "like"
        }
        if (direction === "left"){
            direction = "dislike"
        }
        if (direction === "up"){
            direction = "like"
        }
        if (direction === "down"){
            direction = "dislike"
        }
        // axios.post(`https://99fa-217-29-24-186.ngrok.io/api-bot/userbot/create_action`,
        //     {action: direction, user_to: nameToDelete}, {
        //         headers: {
        //             Authorization: `Bearer ${accessToken}`
        //         }
        //     }).then(res => {
        //     axios.get(`https://99fa-217-29-24-186.ngrok.io/api-bot/userbot/get_count_like_me`, {
        //         headers: {
        //             Authorization: `Bearer ${accessToken}`
        //         }
        //     }).then(res => {
        //         dispatch(setLikeCount(res.data))
        //     })
        // })

    }

    const outOfFrame = (name, idx) => {

        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    }

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < usersList.length) {
            await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    }

    return (
        <>  {isOpen && <SuccessModal/>}
            {!isFetching ? <div>загрузка</div> :
                usersList.length === 0 ?
                    <NoUsersList/> :
                    !isUsersList ? <NoUsersList/> :
                        swipeTry ?
                            <div className="container">
                                <div className={s.swiper}>
                                    <div className={s.swiperCards}>
                                        {usersList.map((e, index) => <Card swiped={swiped} strengths={e.strengths}
                                                                           photo={!e.image ? defautlMaleAvatar : e.image}
                                                                           key={e.id} childRefs={childRefs}
                                                                           name={e.first_name} index={index}
                                                                           surname={e.last_name} id={e.id}
                                                                           about={e.profession} bio={e.bio}
                                                                           outOfFrame={outOfFrame}/>)}
                                        <div className={s.swiperButtons}>
                                            <div className={s.falseBtn} onClick={() => swipe('left')}>
                                                <i className='bx bx-x'></i>
                                            </div>
                                            <div className={s.trueBtn} onClick={() => swipe('right')}>
                                                <i className='bx bx-heart'>
                                                </i>
                                                <div className={s.coutOfTry}>
                                                    {likeCount}
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