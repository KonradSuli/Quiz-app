import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllQuestions, removeQuestion } from './questionSlice';
import { nanoid } from '@reduxjs/toolkit';

export function QuestionEditor() {

    const questions = useSelector(selectAllQuestions);
    const dispatch = useDispatch();

    // New question form data
    const [question, setQuestion] = useState([""]);
    const [answers, setAnswers] = useState(["", "", "", ""]);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1);
    const [idPrefix] = useState(nanoid());

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
    const newQuestionForm = (
        <div>
            <div className = "form-group">
                <label htmlFor = {idPrefix + "__question_input"}>Kérdés</label>
                <input id = {idPrefix + "__question_input"} type = "text" className="form-control" placeholder="A kvíz során megjelenített kérdés szövegét írd ide!"></input>
            </div>
            <div className = "form-group">
                placeholder for answers
            </div>
        </div>
    );
    const startQuizButton = newQuestionForm;
    return (
        <div className = "questions">
            {notification}
            {questionsTable}
            {newQuestionForm}
            {startQuizButton}
        </div>
    );
}