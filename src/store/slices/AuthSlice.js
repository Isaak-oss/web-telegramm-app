import { createSlice } from '@reduxjs/toolkit'
const accessToken = JSON.parse (localStorage.getItem('access_token'))

const initialState = {
    isAuth:  false,
    isSubscribed: true,
    isName: true,
    accessToken : accessToken ? accessToken : "",
    userName: "asd",
    userFirstName: "",
    gender: "male",
    isAuthFetching: false,
}

export const authSlice = createSlice({

    name: 'auth',
    initialState,
    reducers : {
        setAuth : (state) => {
            state.isAuth = true
        },
        setAccess : (state,action) => {
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh
            localStorage.setItem('access_token', JSON.stringify(action.payload.access))
            localStorage.setItem('refresh_Token', JSON.stringify(action.payload.refresh))
        },

        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        setFirstName: (state, action) => {
            state.userFirstName = action.payload;
        },
        setIsAuthFetching: (state, action) => {
            state.isAuthFetching = action.payload
        }
    }
});
export const { setAuth, setAccess, setUserName, setFirstName, setIsAuthFetching } = authSlice.actions


export default authSlice.reducer