import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
}

export const mainSlice = createSlice({

    name: 'main',
    initialState,
    reducers : {
        setIsOpen : (state) => {
            state.isOpen = !state.isOpen
        }
    }
});
export const { setIsOpen } = mainSlice.actions

export default mainSlice.reducer