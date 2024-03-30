import { createSlice } from "@reduxjs/toolkit"
import { addFeedbackAPI, getFeedbackAPI } from "../../api/feedback.api";
import { Alert } from "react-native";

const initialState = {
    feedbacks:[] as Feedback[],
}

const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers :{

    },
    extraReducers: (builder) => {
        builder
        .addCase(getFeedbackAPI.fulfilled, (state, action) => {
            state.feedbacks = action.payload;
        })
        .addCase(getFeedbackAPI.rejected, (state, action) => {
            Alert.alert("feedback/getFeedbackAPI", action.error.message || "");
        })
        .addCase(addFeedbackAPI.fulfilled, (state, action) => {
            state.feedbacks.push(action.meta.arg);
        })
        .addCase(addFeedbackAPI.rejected, (state, action) => {
            Alert.alert("feedback/addFeedbackAPI", action.error.message || "");
        })
    }
});

export default feedbackSlice.reducer;