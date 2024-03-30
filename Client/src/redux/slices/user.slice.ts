import { createSlice } from "@reduxjs/toolkit";
import { getUserAPI, addUserAPI, updateUserAPI, deleteUserAPI, addActTimeAPI, deleteActTimeAPI } from "../../api/user.api";
import { Alert } from "react-native";


const initialState = {
   users:[] as User[],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers :{

    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserAPI.fulfilled, (state, action) => {
            state.users= action.payload;
        })
        .addCase(getUserAPI.rejected, (state, action) => {
            Alert.alert("user/getUserAPI", action.error.message || "");
        })
        .addCase(addUserAPI.fulfilled, (state, action) => {
            const user: User = (action.meta.arg) as User;
            state.users.push(user);
        })
        .addCase(addUserAPI.rejected, (state, action) =>{
            Alert.alert("user/addUserAPI", action.error.message || "");
        })
        .addCase(updateUserAPI.fulfilled, (state, action) =>{
            const index = state.users.findIndex((user: User) => user.id === action.meta.arg.userId);
            state.users[index] = action.meta.arg.newUser
        })
        .addCase(updateUserAPI.rejected, (state, action) =>{
            Alert.alert("user/updateUserAPI", action.error.message || "");    
        })
        .addCase(deleteUserAPI.fulfilled, (state, action) =>{
            const index = state.users.findIndex((user: User) => user.id === (action.meta.arg));
            state.users.splice(index, 1);
        })
        .addCase(deleteUserAPI.rejected, (state, action) =>{
            Alert.alert("user/deleteUserAPI", action.error.message || ""); 
        })
        .addCase(addActTimeAPI.fulfilled, (state, action) =>{
            action.meta.arg.registeredUsers.map((registeredUser)=> {
                const user = state.users.find((user)=> user.id == registeredUser.id)
                user?.actTimes.push(action.meta.arg.actTime)
            })
        })
        .addCase(addActTimeAPI.rejected, (state, action)=> {
            Alert.alert("user/addActTimeAPI", action.error.message || "");
        })
        .addCase(deleteActTimeAPI.fulfilled, (state, action)=> {
            const user = state.users.find((user)=> user.id == action.meta.arg.userId)
            const index = user?.actTimes.findIndex((actTime)=> actTime.id == action.meta.arg.actTime.id) || 0;
            if(user)
                user.actTimes.splice(index, 1);
        })
        .addCase(deleteActTimeAPI.rejected, (state, action)=> {
            Alert.alert("user/deleteActTimeAPI", action.error.message || "");   
        })
    }
})

export default userSlice.reducer;
