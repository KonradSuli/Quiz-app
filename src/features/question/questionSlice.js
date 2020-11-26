import {createSlice, nanoid} from '@reduxjs/toolkit';

export const questionSlice = createSlice ({
    name: "question",
    initialState: {
        questions: [{id: "1", questionText: "Hello?", answers: ["world", "universe", "42", "asd"], correctAnswer: 0}]
    },
    reducers: {
        addQuestion: {
            reducer(state, action) {
                const {questionText, answers, correctAnswer} = action.payload;
                if (typeof(questionText) === "string" &&
                    Array.isArray(answers) && answers.length === 4 &&
                    typeof(correctAnswer) === "number" && correctAnswer > -1 && correctAnswer < 4) {

                    state.questions.push(action.payload);
                }
            },
            prepare({questionText, answers, correctAnswer}) {
                return { payload: {
                    id: nanoid(),
                    questionText: questionText,
                    answers: answers,
                    correctAnswer: correctAnswer
                }}
            }
        },

        removeQuestion: (state, action) => {
            const id = action.payload;
            const questionAtHandIndex = state.questions.findIndex(question => question.id === id);
            if (questionAtHandIndex !== -1) {
                state.questions.splice(questionAtHandIndex, 1);
            }
        },
    }

});

export const selectAllQuestions = state => {return state.question.questions};

export const {addQuestion, removeQuestion} = questionSlice.actions;

export default questionSlice.reducer;