import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import config from "../config";

export const getRideAPI = createAsyncThunk("ride/getRideAPI", async (): Promise<Ride[]> =>{
    return (await axios.get(`${config.api}/ride`)).data
}
)

export const addRideAPI = createAsyncThunk("ride/addRideAPI", async (newRide: Ride) =>
    await axios.post(`${config.api}/ride`, newRide)
)

export const updateRideAPI = createAsyncThunk("ride/updateRideAPI", async (obj: { rideId: number, newRide: Ride }) =>{
    await axios.patch(`${config.api}/ride/${obj.rideId}`, obj.newRide)
}
    
)

export const deleteRideAPI = createAsyncThunk("ride/deleteRideAPi", async (rideId: number) =>
    await axios.delete(`${config.api}/ride/${rideId}`)
)
