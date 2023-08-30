import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/utils";


const initialState = {
    successAuthorization: getToken() ? true : false,
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAutorization(state, payload) {
            state.successAuthorization = payload;
        }
    }


})



export const {
 setAutorization
} = userSlice.actions;
export default userSlice.reducer;