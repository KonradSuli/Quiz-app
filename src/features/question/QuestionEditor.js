import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NewQuestionForm } from './NewQuestionForm';
import { selectAllQuestions, removeQuestion } from './questionSlice';
import { nanoid } from '@reduxjs/toolkit';
import { startQuiz } from '../quiz/quizSlice';

export function QuestionEditor() {

    const questions = useSelector(selectAllQuestions);
    const dispatch = useDispatch();

    const [idPrefix] = useState(nanoid());
    const [username, setUsername] = useState("");
    // New question form data

    const notification = null;

    const usernameField = (
        <div className = "form-group">
            <label htmlFor = {idPrefix + "__username_input"}>A játékos neve</label>
            <input id = {idPrefix + "__username_input"} type = "text" className="form-control" placeholder="Mutatkozzon be!"
                value = {username} onChange = {(event) => {setUsername(event.target.value)}}></input>
        </div>
    );

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

    const newQuestionForm = <NewQuestionForm />;

    const startQuizButton = (
        <button disabled = {questions.length === 0 || username === ""} onClick = {() => dispatch(startQuiz(username))}>
            Kezdődjék a játék!
        </button>
    );
    return (
        <div className = "questions">
            {usernameField}
            {notification}
            {questionsTable}
            {newQuestionForm}
            {startQuizButton}
        </div>
    );
}