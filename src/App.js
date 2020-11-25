import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import logo from './logo.svg';
import { QuestionEditor } from './features/question/QuestionEditor';
import { selectGameProgress } from './features/quiz/quizSlice';
import './App.css';
import { useSelector } from 'react-redux';
import { QuizGame } from './features/quiz/QuizGame';

function App() {
  const gameProgress = useSelector(selectGameProgress);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {gameProgress === "not started" && <QuestionEditor />}
        {gameProgress === "playing" && <QuizGame />}
      </header>
    </div>
  );
}

export default App;
