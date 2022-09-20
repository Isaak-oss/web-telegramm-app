import React from 'react';
import Main from "../../components/Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchingUsersList, setUsersList} from "../../store/slices/MainSlice";
import Preloader from "../../modules/Preloader/Preloader";
import axios from "axios";

const MainPage = () => {
    const isFetching = useSelector((state) => state.main.isFetchingUsersList)
    const dispatch = useDispatch()
    let accessToken = useSelector((state) => state.auth.accessToken)
    useEffect(() => {
        dispatch(fetchingUsersList(false))
        axios.get(`https://99fa-217-29-24-186.ngrok.io/api-bot/userbot`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(res => {
            dispatch(setUsersList(res.data.results))
            dispatch(fetchingUsersList(true))
        })
    }, [])

    return (
        <>
            <Header/>
            {!isFetching ? <Preloader /> :
                <Main/>
            }
            <Footer/>
        </>
    );
};

export default MainPage;