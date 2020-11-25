import React, { useState } from 'react'; 
import { useSelector } from 'react-redux';
import { selectAllQuestions } from '../question/questionSlice';
import { startQuiz, selectUsername } from './quizSlice';

export function QuizGame() {

    const selectNextQuestionIndex = (lengthOfArray) => Math.floor(Math.random() * lengthOfArray);

    const playerName = useSelector(selectUsername);

    const [remaningQuestions, setRemaningQuestions] = useState(useSelector(selectAllQuestions));
    const [correctQuestions, setCorrectQuestions] = useState([]);
    const [incorrectQuestions, setIncorrectQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(selectNextQuestionIndex(remaningQuestions.length));
    // Per question data
    const [currentSelectedAnswerIndex, setCurrentSelectedAnswerIndex] = useState(-1);
    const [currentQuestionState, setCurrentQuestionState] = useState("not answered"); // | "not revealed" | "revealed"

    const headerRow = (
        <div>
            <span>{playerName}</span>
            <span>{correctQuestions.length}</span><span className="scoreboard__expanded_text"> Helyes válasz, </span><span className="scoreboard__collapsed_text">/</span>
            <span>{incorrectQuestions.length}</span><span className="scoreboard__expanded_text"> Helytelen válasz, </span><span className="scoreboard__collapsed_text">/</span>
            <span>{remaningQuestions.length}</span><span className="scoreboard__expanded_text"> Hátralévő kérdés </span><span className="scoreboard__collapsed_text">/</span>
        </div>
    );

    const currentQuestion = remaningQuestions[currentQuestionIndex];
    const lockAnswer = () => {
        setCurrentQuestionState("not revealed");
        setTimeout(() => {setCurrentQuestionState("revealed");}, 2500);
    }

    const selectNextQuestion = () => {

        // Save the results of the previous question
        let newRemaningQuestions = remaningQuestions.filter(() => true);
        const oldQuestion = newRemaningQuestions.splice(currentQuestionIndex, 1);
        setRemaningQuestions(newRemaningQuestions);

        if (currentSelectedAnswerIndex === oldQuestion.correctAnswer) {
            let newCorrectQuestions = correctQuestions.filter(() => true);
            newCorrectQuestions.push(oldQuestion);
            setCorrectQuestions(newCorrectQuestions);
        } else {
            let newIncorrectQuestions = incorrectQuestions.filter(() => true);
            newIncorrectQuestions.push(oldQuestion);
            setIncorrectQuestions(newIncorrectQuestions);
        }

        if (newRemaningQuestions.length !== 0)
            setCurrentQuestionIndex(selectNextQuestionIndex(newRemaningQuestions.length));
        else
            setCurrentQuestionIndex(-1);

        setCurrentSelectedAnswerIndex(-1);
        setCurrentQuestionState("not answered");
    };

    const questionView = (
        currentQuestionIndex !== -1 &&
        <React.Fragment>
            <div className="quiz_question__question_container">
                <span>{currentQuestion.questionText}</span>
            </div>
            <div className="quiz_question__answers_container">
                {currentQuestion.answers.map((answer, index) => (
                    <span className={currentSelectedAnswerIndex === index ? "quiz_question__selected_answer" : ""} key={index} onClick={() => {currentQuestionState === "not answered" && setCurrentSelectedAnswerIndex(index)}}>{answer}</span>
                ))}
            </div>
            <div>
                {currentQuestionState !== "revealed" && <button disabled={currentSelectedAnswerIndex === -1} onClick={lockAnswer}> Válasz megjelölése </button>}
                {currentQuestionState === "revealed" && <button onClick={() => {selectNextQuestion()}}> Tovább </button>}
            </div>
        </React.Fragment>
    );

    return (
        <div>
            {headerRow}
            {questionView}
        </div>
    );
}