import { createSlice } from '@reduxjs/toolkit'
const templateState = JSON.parse (localStorage.getItem('isAuthTgWebApp'))
const accessToken = JSON.parse (localStorage.getItem('access_token'))
const initialState = {
    isAuth: templateState ? templateState : false,
    isSubscribed: true,
    isName: true,
    accessToken : accessToken ? accessToken : null,
    userName: "name",
    gender: "male"
}

export const authSlice = createSlice({

    name: 'auth',
    initialState,
    reducers : {
        setAuth : (state) => {
            state.isAuth = true
            localStorage.setItem('isAuthTgWebApp' , JSON.parse(true))
        },
        setAccess : (state,action) => {
            state.accessToken = action.payload;
            localStorage.setItem('access_token', JSON.stringify(action.payload))
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        }
    }
});
export const { setAuth, setAccess, setUserName } = authSlice.actions

export default authSlice.reducer