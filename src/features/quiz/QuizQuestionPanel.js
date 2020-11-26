import React, { useState } from 'react';

export function QuizQuestionPanel({question, onQuestionFinished, onAnswerReveal}) {

    const [currentSelectedAnswerIndex, setCurrentSelectedAnswerIndex] = useState(-1);
    const [currentQuestionState, setCurrentQuestionState] = useState("not answered"); // | "not revealed" | "revealed"

    const lockAnswer = () => {
        setCurrentQuestionState("not revealed");
        setTimeout(() => {setCurrentQuestionState("revealed"); onAnswerReveal(currentSelectedAnswerIndex)}, 2500);
    }

    return (
        <React.Fragment>
            <div className="quiz_question__question_container">
                <span className="quiz_question__question">{question.questionText}</span>
            </div>
            <div className="quiz_question__answers_container">
                {question.answers.map((answer, index) => (
                    <span className={currentQuestionState === "not answered" && currentSelectedAnswerIndex === index ? ("quiz_question__answer quiz_question__answer--selected") :
                    currentQuestionState === "not revealed" && currentSelectedAnswerIndex === index ? "quiz_question__answer quiz_question__answer--locked" : 
                    (currentQuestionState === "revealed" && currentSelectedAnswerIndex === index && index === question.correctAnswer) || (currentQuestionState === "revealed" && index === question.correctAnswer) ? "quiz_question__answer quiz_question__answer--correct" :
                    currentQuestionState === "revealed" && currentSelectedAnswerIndex === index && index !== question.correctAnswer ? "quiz_question__answer quiz_question__answer--incorrect" : "quiz_question__answer"} key={index} onClick={() => {currentQuestionState === "not answered" && setCurrentSelectedAnswerIndex(index)}}>{answer}</span>
                ))}
            </div>
            <div className="quiz_footer__container">
                {currentQuestionState !== "revealed" && <button className="quiz_footer__button" disabled={currentSelectedAnswerIndex === -1} onClick={lockAnswer}> Válasz megjelölése </button>}
                {currentQuestionState === "revealed" && <button className="quiz_footer__button quiz_footer__button--active" onClick={() => {onQuestionFinished()}}> Tovább </button>}
            </div>
        </React.Fragment>
        
    );
}