import {createSlice} from '@reduxjs/toolkit';

export const quizSlice = createSlice ({
    name: "quiz",
    initialState: {
        username: ""
    },
    reducers: {
        setUsername: (state, action) => {
            const username = action.payload;
            if (typeof(username) === "string" && username !== "") {
                state.username = username;
            }
        }
    }

});

export const selectUsername = state => state.quiz.username;

export const { setUsername } = quizSlice.actions;

export default quizSlice.reducer;