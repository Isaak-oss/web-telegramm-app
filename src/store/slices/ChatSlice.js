import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isMessage: false,
    usersChatList: [],
    chatCount: "",
    userChatNew: []
}

export const chatSlice = createSlice({

    name: 'chat',
    initialState,
    reducers : {
        setUsersChatList : (state, action) => {
            state.usersChatList = action.payload
        },
        setChatCount : (state, action) => {
            state.chatCount = action.payload
        },
        setUserChatNew : (state, action) => {
            state.userChatNew = action.payload
        },
    }
});
export const { setUsersChatList, setChatCount, setUserChatNew } = chatSlice.actions

export default chatSlice.reducer