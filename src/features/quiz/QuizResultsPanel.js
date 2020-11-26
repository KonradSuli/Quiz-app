import React from 'react';
import { selectUsername } from '../quiz/quizSlice';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export function QuizResultsPanel ({correctAnswers, incorrectAnswers, resetGame}) {
    const ratio = correctAnswers / (correctAnswers + incorrectAnswers);
    const username = useSelector(selectUsername);
    let history = useHistory();
    return (
        <div className="results">
            <span className="results__text--big_font">{ratio > 0.5 ? "Gratulálok " + username + "!" : "Játék vége!"}</span><br/>
            <span>Az elért pontszám</span><br/>
            <div>
                <span className="results__text--big_font results__text--correct">{correctAnswers}</span>
                <span className="results__text--big_font">/</span><span className=" results__text--big_font results__text--incorrect">{(correctAnswers + incorrectAnswers)}</span><span className="results__text--big_font">({ratio.toFixed(2) * 100}%)</span><br/><br/>
            </div>

            <div className="results__button-row">
                <button onClick={() => {resetGame()}}>Újrapróbálkozás</button>
                <button onClick={() => history.push("questions")}>Vissza</button>
            </div>
        </div>
    )
}