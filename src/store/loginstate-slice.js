import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
    name: 'Auth',
    initialState: {
     username:'',
     accessToken:''
    },
    reducers: {
        setLoginInfo(state,action)
        {
         let userInfo=action.payload;
         console.log(userInfo,"13");
         localStorage.setItem("userInfo",JSON.stringify(userInfo));
         state.username=userInfo.email;
         state.accessToken=userInfo.accessToken;
        //  state.username=userInfo.username;
        //  state.accessToken=userInfo.accessToken;
        },
        logout(state,action)
        {
            state.username='';
            state.accessToken='';
            localStorage.removeItem("userInfo");
        }

    }})

    export const authenticationActions= authenticationSlice.actions;

    export default authenticationSlice;