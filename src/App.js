import './Global.scss';
import {useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import AccVerificationPage from "./pages/AccVerificationPage/AccVerificationPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import MainPage from "./pages/MainPage/MainPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Header from "./pages/Header/Header";
import ConfirmPhoto from "./components/Auth/RegistrationForm/ConfirmPhoto";
import Footer from "./pages/Footer/Footer";
import ChatPage from "./pages/ChatPage/ChatPage";

function App() {
    let isAuth = useSelector((state) => state.auth.isAuth)
    let isSubscribed = useSelector((state) => state.auth.isSubscribed)
    let isName = useSelector((state) => state.auth.isName)
    return (
        <>
            {
                !isAuth ? (
                    !isSubscribed ? (
                        <Routes>
                            <Route path="*" element={<AccVerificationPage/>}/>
                        </Routes>
                    ) : !isName ? (
                        <Routes>
                            <Route path="*" element={<AccVerificationPage/>}/>
                        </Routes>
                    ) : (
                        <Routes>
                            <Route path="*" element={<AuthPage/>}/>

                        </Routes>
                    )
                ) : (
                    <>

                        <Routes>
                            <Route path="*" element={<MainPage/>}/>
                            <Route path="/profile" element={<ProfilePage/>}/>
                            <Route path="/confirmPhoto" element={<ConfirmPhoto/> }/>
                            <Route path="/chat" element={<ChatPage/>}/>
                        </Routes>

                    </>
                )
            }
        </>
    );
}

export default App;
