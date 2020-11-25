import { configureStore } from '@reduxjs/toolkit';
import quizReducer from '../features/quiz/quizSlice';
import questionReducer from '../features/question/questionSlice';

let savedState;
const savedQuestions = localStorage.getItem('questions');
const savedUsername = localStorage.getItem('username');

if (savedQuestions || savedUsername) {
  console.log(savedQuestions);
  
  try {
    savedState = {
      question: {questions: savedQuestions ? JSON.parse(savedQuestions) : []},
      quiz: {username: savedUsername || ""}
    }
  }
  catch (e) {
    console.log(e);
  }
}

console.log(savedState)

export default configureStore({
  reducer: {
    quiz: quizReducer,
    question: questionReducer
  },
  preloadedState: savedState
});