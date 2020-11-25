import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import logo from './logo.svg';
import { QuestionEditor } from './features/question/QuestionEditor';
import { selectGameProgress } from './features/quiz/quizSlice';
import './App.css';
import { useSelector } from 'react-redux';
import { QuizGame } from './features/quiz/QuizGame';
import { BrowserRouter, Redirect , Route, Switch } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route exact path="/questions" render={() => <QuestionEditor />}/>
            <Route exact path="/quiz" render={() => <QuizGame />}/>
            <Redirect to="/questions"/>
          </Switch>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
