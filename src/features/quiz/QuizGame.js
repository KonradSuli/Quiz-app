import React, { useState } from 'react'; 
import { useSelector } from 'react-redux';
import { selectAllQuestions } from '../question/questionSlice';
import { selectUsername } from './quizSlice';
import { QuizQuestionPanel } from './QuizQuestionPanel';
import { QuizResultsPanel } from './QuizResultsPanel';
import { current } from '@reduxjs/toolkit';

export function QuizGame() {

    const selectNextQuestionIndex = (lengthOfArray) => Math.floor(Math.random() * lengthOfArray);

    const playerName = useSelector(selectUsername);
    const questionsInStore = useSelector(selectAllQuestions);

    const [remaningQuestions, setRemaningQuestions] = useState(useSelector(selectAllQuestions));
    const [correctQuestions, setCorrectQuestions] = useState([]);
    const [incorrectQuestions, setIncorrectQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(selectNextQuestionIndex(remaningQuestions.length));
    const [currentQuestion, setCurrentQuestion] = useState(remaningQuestions[currentQuestionIndex]);


    const headerRow = currentQuestionIndex !== -1 && (
        <div className="quiz-header">
            <div className="quiz-header__right-side">
                <span>{playerName}</span>
            </div>
            <div className="quiz-header__left-side">
                <span className="scoreboard__text--green">{correctQuestions.length}</span><span className="scoreboard__text--expanded scoreboard__text--green"> Helyes válasz, </span><span className="scoreboard__text--collapsed">/</span>
                <span className="scoreboard__text--red">{incorrectQuestions.length}</span><span className="scoreboard__text--expanded scoreboard__text--red"> Helytelen válasz, </span><span className="scoreboard__text--collapsed">/</span>
                <span>{remaningQuestions.length}</span><span className="scoreboard__text--expanded"> Hátralévő kérdés </span><span className="scoreboard__text--collapsed">/</span>
            </div>
        </div>
    );

    const updateScore = (selectedAnswerIndex) => {
        console.log("hi1")
        // Save the results of the previous question
        let newRemaningQuestions = remaningQuestions.filter(() => true);
        const oldQuestion = newRemaningQuestions.splice(currentQuestionIndex, 1)[0];
        setRemaningQuestions(newRemaningQuestions);

        if (selectedAnswerIndex === oldQuestion.correctAnswer) {
            let newCorrectQuestions = correctQuestions.filter(() => true);
            newCorrectQuestions.push(oldQuestion);
            setCorrectQuestions(newCorrectQuestions);
        } else {
            let newIncorrectQuestions = incorrectQuestions.filter(() => true);
            newIncorrectQuestions.push(oldQuestion);
            setIncorrectQuestions(newIncorrectQuestions);
        }
    }

    const selectNextQuestion = () => {
        console.log("hi2")
        if (remaningQuestions.length !== 0) {
            const newQuestionIndex = selectNextQuestionIndex(remaningQuestions.length)
            setCurrentQuestionIndex(newQuestionIndex);
            setCurrentQuestion(remaningQuestions[newQuestionIndex])
        }
        else
            setCurrentQuestionIndex(-1);
    };

    const resetGame = () => {
        setRemaningQuestions(questionsInStore);
        setCorrectQuestions([]);
        setIncorrectQuestions([]);
        const newIndex = selectNextQuestionIndex(questionsInStore.length);
        setCurrentQuestion(questionsInStore[newIndex]);
        setCurrentQuestionIndex(newIndex);
        console.log(currentQuestion);
        console.log(questionsInStore);
        console.log(currentQuestionIndex)
    }

    console.log(currentQuestion)
    return (
        <div className={"quiz" + (currentQuestionIndex === -1 ? " quiz--results" : "")}>
            {headerRow}
            {currentQuestionIndex !== -1 && currentQuestion && <QuizQuestionPanel key={currentQuestion.id} question={currentQuestion} onQuestionFinished={selectNextQuestion} onAnswerReveal={updateScore}/>}
            {currentQuestionIndex === -1 && <QuizResultsPanel correctAnswers = {correctQuestions.length} incorrectAnswers = {incorrectQuestions.length} resetGame = {resetGame}/>}
        </div>
    );
}