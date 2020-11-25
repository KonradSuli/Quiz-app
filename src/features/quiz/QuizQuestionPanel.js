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
                <span>{question.questionText}</span>
            </div>
            <div className="quiz_question__answers_container">
                {question.answers.map((answer, index) => (
                    <span className={currentSelectedAnswerIndex === index ? "quiz_question__selected_answer" : ""} key={index} onClick={() => {currentQuestionState === "not answered" && setCurrentSelectedAnswerIndex(index)}}>{answer}</span>
                ))}
            </div>
            <div>
                {currentQuestionState !== "revealed" && <button disabled={currentSelectedAnswerIndex === -1} onClick={lockAnswer}> Válasz megjelölése </button>}
                {currentQuestionState === "revealed" && <button onClick={() => {onQuestionFinished()}}> Tovább </button>}
            </div>
        </React.Fragment>
        
    );
}