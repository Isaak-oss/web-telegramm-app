import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userName: "",
    userSurname: "",
    userPhoto: "",
    userWhoAreYou: "",
    userTag: "",
    userAbout: "",
}

export const profileSlice = createSlice({

    name: 'profile',
    initialState,
    reducers : {
        setUserData : (state, action) => {
            state.userSurname = action.payload.userSurname
            state.userName = action.payload.userName
            state.userTag = action.payload.userTag
            state.userAbout = action.payload.userAbout
            state.userWhoAreYou = action.payload.userWhoAreYou

            localStorage.setItem('isAuthTgWebApp' , JSON.parse(true))
        }
    }
});
export const { setUserData } = profileSlice.actions

export default profileSlice.reducer