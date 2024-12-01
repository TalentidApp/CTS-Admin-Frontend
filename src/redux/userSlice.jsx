

import { createSlice } from '@reduxjs/toolkit';

const initialValues = {

    data:null,
    loading:false,
    error:null,
    isLoggedIn:false,

}

const userSlice = createSlice({

    name:"user",
    initialState:initialValues,
    reducers:{

        setData: (state, action) => {

            state.data = action.payload;

            state.isLoggedIn = true;

        },
        logout: (state) => {
            // Reset state to initial values
            state.isLoggedIn = false;
            state.data = null;
        },
    }
})


export const { setData, logout } = userSlice.actions;

export default userSlice.reducer;

