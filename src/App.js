import './Global.scss';
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import AccVerificationPage from "./pages/AccVerificationPage/AccVerificationPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import MainPage from "./pages/MainPage/MainPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Header from "./pages/Header/Header";
import ConfirmPhoto from "./components/Auth/RegistrationForm/ConfirmPhoto";
import Footer from "./pages/Footer/Footer";
import ChatPage from "./pages/ChatPage/ChatPage";
import {useEffect, useState} from "react";
import {
    getAccessToken,
    getMainUsersList,
    refreshToken,
    setAccess, setAuth,
    setFirstName, setIsAuthFetching,
    setUserName
} from "./store/slices/AuthSlice";
import {
    fetchingProfile,
    getProfileData,
    getStrengthsList,
    setStrengthsList,
    setUserData
} from "./store/slices/ProfileSlice";
import axios from "axios";

function App() {
    let isAuth = useSelector((state) => state.auth.isAuth)
    let isSubscribed = useSelector((state) => state.auth.isSubscribed)
    let userName = useSelector((state) => state.auth.userName)
    let accessToken = useSelector((state) => state.auth.accessToken)

    let [refresh, setRefresh] = useState(false)
    // let tg = window.Telegram.WebApp;
    // let userId = tg.initDataUnsafe.user.id
    // const userTgName = tg.initDataUnsafe.user.username
    // const userTgFirstName = tg.initDataUnsafe.user.first_name

    const dispatch = useDispatch()
    useEffect(() => {
        // tg.expand();
        // tg.ready()
        // dispatch(setUserName(userTgName))
        // dispatch(setFirstName(userTgFirstName))
        //refresh token
        axios.post(`https://99fa-217-29-24-186.ngrok.io/api-bot/userbot/auth`, {id: 54321})
            .then(res => {
                    dispatch(setAccess(res.data))
                    setRefresh(true)
                    localStorage.setItem('id', JSON.parse(54321))

                }
            )
        // get strengths list
        axios.get(`https://99fa-217-29-24-186.ngrok.io/api-bot/userbot/list_strengths`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(res => {
            dispatch(setStrengthsList(res.data))
        })

        // get profile data
        axios.get(`https://99fa-217-29-24-186.ngrok.io/api-bot/userbot/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(res => {
            dispatch(setUserData(res.data))
            if (res.data.last_name){
                dispatch(setAuth())
            }
            dispatch(fetchingProfile(true))
            dispatch(setIsAuthFetching(true))
        })
    }, [refresh])
    return (
        <>
            {
                !userName ? (
                    <Routes>
                        <Route path="*" element={<AccVerificationPage/>}/>
                    </Routes>
                ) : (
                    !isSubscribed ? (
                            <Routes>
                                <Route path="*" element={<AccVerificationPage/>}/>
                            </Routes>

                        ) :
                        !isAuth ? (
                                <Routes>
                                    <Route path="*" element={<AuthPage/>}/>

                                </Routes>
                            ) :
                            <>

                                <Routes>
                                    <Route path="*" element={<MainPage/>}/>
                                    <Route path="/profile" element={<ProfilePage/>}/>
                                    <Route path="/confirmPhoto" element={<ConfirmPhoto/>}/>
                                    <Route path="/chat" element={<ChatPage/>}/>
                                </Routes>

                            </>
                )
            }
        </>
    );
}

export default App;
