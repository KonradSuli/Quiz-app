import {createSlice} from '@reduxjs/toolkit';

export const quizSlice = createSlice ({
    name: "quiz",
    initialState: {
        username: "",
        progress: "not started" // | "playing" | "finished"
    },
    reducers: {
        startQuiz: (state, action) => {
            const username = action.payload;
            if (typeof(username) === "string" && username !== "") {
                state.progress = "playing";
                state.username = username;
            }
        }
    }

});

export const selectUsername = state => state.quiz.username;

export const selectGameProgress = state => state.quiz.progress;

export const { startQuiz } = quizSlice.actions;

export default quizSlice.reducer;