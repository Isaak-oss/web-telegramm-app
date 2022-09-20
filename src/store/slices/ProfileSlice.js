import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    id: "",
    userName: "",
    userSurname: "",
    userPhoto: "",
    userWhoAreYou: "",
    userTag: "",
    userAbout: "",
    myStrengths: "",
    strengthsList: [],
    isFetchingProfile: false,

}

export const profileSlice = createSlice({

    name: 'profile',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.id = action.payload.id
            state.userSurname = action.payload.last_name
            state.userName = action.payload.first_name
            state.userAbout = action.payload.bio
            state.myStrengths = action.payload.strengths
            state.userWhoAreYou = action.payload.profession
            state.userPhoto = action.payload.image
        },
        fetchingProfile: (state, action) => {
            state.isFetchingProfile = action.payload
        },
        setStrengthsList: (state, action) => {
            state.strengthsList = action.payload
        }
    }
});
export const {setUserData, fetchingProfile, setStrengthsList} = profileSlice.actions


export default profileSlice.reducer