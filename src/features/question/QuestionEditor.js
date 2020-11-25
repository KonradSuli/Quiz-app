import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NewQuestionForm } from './NewQuestionForm';
import { selectAllQuestions, removeQuestion } from './questionSlice';

export function QuestionEditor() {

    const questions = useSelector(selectAllQuestions);
    const dispatch = useDispatch();

    // New question form data

    const notification = null;
    const questionsTable = (
        <ul>
            {questions.map(question => (
                <li key={question.id} className="list-unstyled">
                    <span>{question.questionText}</span>
                    <button onClick={() => {dispatch(removeQuestion(question.id))}}> &#x1F5D1; </button>
                </li>
            ))}
        </ul>
    );

    const newQuestionForm = <NewQuestionForm></NewQuestionForm>

    const startQuizButton = (
        <button disabled = {questions.length === 0} onClick = {() => console.log("TODO")}>
            Kezdődjék a játék!
        </button>
    );
    return (
        <div className = "questions">
            {notification}
            {questionsTable}
            {newQuestionForm}
            {startQuizButton}
        </div>
    );
}