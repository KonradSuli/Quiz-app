import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { QuestionEditor } from './features/question/QuestionEditor';
import './App.css';
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
