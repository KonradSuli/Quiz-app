import React, { useState } from 'react'; 
import { useSelector } from 'react-redux';
import { selectAllQuestions } from '../question/questionSlice';
import { selectUsername } from './quizSlice';
import { QuizQuestionPanel } from './QuizQuestionPanel';

export function QuizGame() {

    const selectNextQuestionIndex = (lengthOfArray) => Math.floor(Math.random() * lengthOfArray);

    const playerName = useSelector(selectUsername);

    const [remaningQuestions, setRemaningQuestions] = useState(useSelector(selectAllQuestions));
    const [correctQuestions, setCorrectQuestions] = useState([]);
    const [incorrectQuestions, setIncorrectQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(selectNextQuestionIndex(remaningQuestions.length));
    const [currentQuestion, setCurrentQuestion] = useState(remaningQuestions[currentQuestionIndex]);


    const headerRow = (
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

        if (remaningQuestions.length !== 0) {
            const newQuestionIndex = selectNextQuestionIndex(remaningQuestions.length)
            setCurrentQuestionIndex(newQuestionIndex);
            setCurrentQuestion(remaningQuestions[newQuestionIndex])
        }
        else
            setCurrentQuestionIndex(-1);
    };

    console.log(currentQuestionIndex);
    console.log(currentQuestion)
    return (
        <div className="quiz">
            {headerRow}
            {currentQuestionIndex !== -1 && <QuizQuestionPanel key={currentQuestion.id} question={currentQuestion} onQuestionFinished={selectNextQuestion} onAnswerReveal={updateScore}/>}
        </div>
    );
}