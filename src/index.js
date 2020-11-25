import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

function saveIntoLocalStorage (key, value) {
  localStorage.setItem(key, value);
}

let lastQuestionReference;
let lastUsername;

store.subscribe(() => {
  const state = store.getState();
  if (lastQuestionReference !== state.question.questions)
    saveIntoLocalStorage("questions", JSON.stringify(state.question.questions));
  if (lastUsername !== state.quiz.username)
    saveIntoLocalStorage("username", state.quiz.username);
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
