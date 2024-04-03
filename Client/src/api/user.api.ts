import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import config from "../config";


export const getUserAPI = createAsyncThunk("user/getUserAPI", async (userId:number): Promise<any> =>
    {
        const users=[
            (await axios.get(`${config.api}/user/${userId}`)).data,
            ...(await axios.get(`${config.api}/user/getByParentId/${userId}`)).data,
        ]
        return users;
    }
)

export const addUserAPI = createAsyncThunk("user/addUserAPI", async (newUser: User) =>
    {
        const paretId = newUser.parent?.id;
        const {actTimes, parent, ...user} = newUser;
        await axios.post(`${config.api}/user`, {...user, parent:{id:paretId}});
    }
)

export const updateUserAPI = createAsyncThunk("user/updateUserAPI", async (obj: { userId: number, newUser: User }) => 
    {
        const {actTimes, parent, ...user} =obj.newUser;
        await axios.patch(`${config.api}/user/${obj.userId}`, user) 
    }
)

export const deleteUserAPI = createAsyncThunk("user/deleteUserAPi", async (userId: number) =>
    await axios.delete(`${config.api}/user/${userId}`)
)

export const addActTimeAPI = createAsyncThunk("user/addActTimeAPI", async (obj: { userId: number, registeredUsers: User[], actTime:ActTime}) =>
    {
        const {image, ...ride} = obj.actTime.ride;
        const actTime = {...obj.actTime, ride:ride};
        const registeredUsers = obj.registeredUsers.map((user)=> {return {id: user.id}});
        console.log(registeredUsers);
        await axios.post(`${config.api}/user/addActTime/${obj.userId}`, { actTime: actTime, users:registeredUsers})
    }
) 

export const deleteActTimeAPI = createAsyncThunk("user/deleteActTimeAPI", async (obj: { userId: number, actTime:ActTime}) =>
    {
        const {ride, ...actTime } =obj.actTime;
        await axios.delete(`${config.api}/user/deleteActTime/${obj.userId}`, {data: actTime})
    }
)
