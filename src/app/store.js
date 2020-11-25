import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import questionReducer from '../features/question/questionSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    question: questionReducer
  },
});
