import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    isOpen: false,
    usersList: [],
    isFetchingUsersList: false,
    likeCount: ""
}

export const mainSlice = createSlice({

    name: 'main',
    initialState,
    reducers: {
        setIsOpen: (state) => {
            state.isOpen = !state.isOpen
        },
        setUsersList: (state, action) => {
            state.usersList = action.payload
        },
        fetchingUsersList: (state, action) => {
            state.isFetchingUsersList = action.payload
        },
        setLikeCount: (state, action) => {
            state.likeCount = action.payload
        }
    }
});
export const {setIsOpen, setUsersList, fetchingUsersList, setLikeCount} = mainSlice.actions


export default mainSlice.reducer
