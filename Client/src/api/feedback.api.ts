import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import config from "../config";


export const getFeedbackAPI = createAsyncThunk("feedback/getFeedbackAPI", async (): Promise<Feedback[]> =>
    (await axios.get(`${config.api}/feedback`)).data
)

export const addFeedbackAPI = createAsyncThunk("feedback/addFeedbackAPI", async (newFeedback: Feedback) =>
    {
        await axios.post(`${config.api}/feedback`, newFeedback)
    }     
)

// export const updateActTimeAPI = createAsyncThunk("actTime/updateActTimeAPI", async (obj: { actTimeId: number, newActTime: ActTime }) =>{
//     await axios.patch(`${config.api}/act-time/${obj.actTimeId}`, obj.newActTime)
// }
    
// )

// export const deleteActTimeAPI = createAsyncThunk("actTime/deleteActTimeAPi", async (actTimeId: number) =>
//     await axios.delete(`${config.api}/act-time/${actTimeId}`)
// )