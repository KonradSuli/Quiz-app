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
        <div>
            <span>{playerName}</span>
            <span>{correctQuestions.length}</span><span className="scoreboard__expanded_text"> Helyes válasz, </span><span className="scoreboard__collapsed_text">/</span>
            <span>{incorrectQuestions.length}</span><span className="scoreboard__expanded_text"> Helytelen válasz, </span><span className="scoreboard__collapsed_text">/</span>
            <span>{remaningQuestions.length}</span><span className="scoreboard__expanded_text"> Hátralévő kérdés </span><span className="scoreboard__collapsed_text">/</span>
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
            setCurrentQuestionIndex(selectNextQuestionIndex(remaningQuestions.length));
            setCurrentQuestion(remaningQuestions[currentQuestionIndex])
        }
        else
            setCurrentQuestionIndex(-1);
    };

    return (
        <div>
            {headerRow}
            {currentQuestionIndex !== -1 && <QuizQuestionPanel question={currentQuestion} onQuestionFinished={selectNextQuestion} onAnswerReveal={updateScore}/>}
        </div>
    );
}