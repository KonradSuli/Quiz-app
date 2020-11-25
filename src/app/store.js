import { configureStore } from '@reduxjs/toolkit';
import quizReducer from '../features/quiz/quizSlice';
import questionReducer from '../features/question/questionSlice';

export default configureStore({
  reducer: {
    quiz: quizReducer,
    question: questionReducer
  },
});
