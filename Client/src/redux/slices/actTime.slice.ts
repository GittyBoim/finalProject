import { createSlice } from "@reduxjs/toolkit";
import { getActTimeAPI, addActTimeAPI, updateActTimeAPI, deleteActTimeAPI } from "../../api/actTime.api";
import { Alert } from "react-native";

const initialState = {
    actTimes:[] as ActTime[],
}
const actTimeSlice = createSlice({
    name: "actTime",
    initialState,
    reducers :{

    },
    extraReducers: (builder) => {
        builder
        .addCase(getActTimeAPI.fulfilled, (state, action) => {
            state.actTimes = action.payload;
        })
        .addCase(getActTimeAPI.rejected, (state, action) => {
            Alert.alert("actTime/getActTimeAPI", action.error.message || "");
        })
        .addCase(addActTimeAPI.fulfilled, (state, action) => {
            const actTime: ActTime = (action.meta.arg) as ActTime;
            state.actTimes.push(actTime);
        })
        .addCase(addActTimeAPI.rejected, (state, action) => {
            Alert.alert("actTime/addActTimeAPI", action.error.message || "");
        })
        .addCase(updateActTimeAPI.fulfilled, (state, action) => {
            const index = state.actTimes.findIndex((ActTime: ActTime) => ActTime.id === action.meta.arg.actTimeId);
            state.actTimes[index] = action.meta.arg.newActTime
        })
        .addCase(updateActTimeAPI.rejected, (state, action) => {
            Alert.alert("actTime/updateActTimeAPI", action.error.message || "");    
        })
        .addCase(deleteActTimeAPI.fulfilled, (state, action) => {
            const index = state.actTimes.findIndex((actTime: ActTime) => actTime.id === (action.meta.arg));
            state.actTimes.splice(index, 1);
        })
        .addCase(deleteActTimeAPI.rejected, (state, action) => {
            Alert.alert("actTime/deleteActTimeAPI", action.error.message || ""); 
        })
        
    }
});

export default actTimeSlice.reducer;
