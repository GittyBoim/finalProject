import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import config from "../config";


export const getActTimeAPI = createAsyncThunk("actTime/getActTimeAPI", async (): Promise<ActTime[]> =>
    (await axios.get(`${config.api}/act-time`)).data
)

export const addActTimeAPI = createAsyncThunk("actTime/addActTimeAPI", async (newActTime: ActTime) =>
    await axios.post(`${config.api}/act-time`, newActTime)
)

export const updateActTimeAPI = createAsyncThunk("actTime/updateActTimeAPI", async (obj: { actTimeId: number, newActTime: ActTime }) =>{
    await axios.patch(`${config.api}/act-time/${obj.actTimeId}`, obj.newActTime)
}
    
)

export const deleteActTimeAPI = createAsyncThunk("actTime/deleteActTimeAPi", async (actTimeId: number) =>
    await axios.delete(`${config.api}/act-time/${actTimeId}`)
)
