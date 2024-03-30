import { createSlice } from "@reduxjs/toolkit";
import { getRideAPI, addRideAPI, updateRideAPI, deleteRideAPI } from "../../api/ride.api";
import { Alert } from "react-native";

const initialState = {
    rides:[] = [] as Ride[],
}
const rideSlice = createSlice({
    name: "ride",
    initialState,
    reducers :{

    },
    extraReducers: (builder) => {
        builder
        .addCase(getRideAPI.fulfilled, (state, action) => {
            state.rides = action.payload;
        })
        .addCase(getRideAPI.rejected, (state, action) => {
            Alert.alert("ride/getRideAPI", action.error.message || "");
        })
        .addCase(addRideAPI.fulfilled, (state, action) => {
            const ride: Ride = (action.meta.arg) as Ride;
            state.rides.push(ride);
        })
        .addCase(addRideAPI.rejected, (state, action) =>{
            Alert.alert("ride/addRideAPI", action.error.message || "");
        })
        .addCase(updateRideAPI.fulfilled, (state, action) =>{
            const index = state.rides.findIndex((ride: Ride) => ride.id === action.meta.arg.rideId);
            state.rides[index] = action.meta.arg.newRide
        })
        .addCase(updateRideAPI.rejected, (state, action) =>{
            Alert.alert("ride/updateRideAPI", action.error.message || "");    
        })
        .addCase(deleteRideAPI.fulfilled, (state, action) =>{
            const index = state.rides.findIndex((Ride: Ride) => Ride.id === (action.meta.arg));
            state.rides.splice(index, 1);
        })
        .addCase(deleteRideAPI.rejected, (state, action) =>{
            Alert.alert("ride/deleteRideAPI", action.error.message || ""); 
        })
        
    }
});

export default rideSlice.reducer;

//https://picsum.photos/700