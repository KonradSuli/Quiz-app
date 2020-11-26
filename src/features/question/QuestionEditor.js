import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NewQuestionForm } from './NewQuestionForm';
import { selectAllQuestions, removeQuestion } from './questionSlice';
import { nanoid } from '@reduxjs/toolkit';
import { setUsername as setStoreUsername } from '../quiz/quizSlice';

export function QuestionEditor() {

    const questions = useSelector(selectAllQuestions);
    const dispatch = useDispatch();
    let history = useHistory();

    const [idPrefix] = useState(nanoid());
    const [username, setUsername] = useState("");
    // New question form data

    const notification = null;

    const usernameField = (
        <div className = "form-group question__user">
            <label htmlFor = {idPrefix + "__username_input"}>A játékos neve</label>
            <input id = {idPrefix + "__username_input"} type = "text" className="form-control" placeholder="Mutatkozzon be!"
                value = {username} onChange = {(event) => {setUsername(event.target.value)}}></input>
        </div>
    );

    const questionsTable = (
        <ul className="list-unstyled questions__list">
            {questions.map(question => (
                <li key={question.id} className="list-unstyled questions__item">
                    <span className="questions__item-question">{question.questionText}</span>
                    <button className="questions__item-icon" onClick={() => {dispatch(removeQuestion(question.id))}}> &#x1F5D1; </button>
                </li>
            ))}
        </ul>
    );

    const newQuestionForm = <NewQuestionForm />;

    const startQuizButton = (
        <button disabled = {questions.length === 0 || username === ""} onClick = {() => {dispatch(setStoreUsername(username)); history.push("/quiz")}}>
            Kezdődjék a játék!
        </button>
    );
    return (
        <div className="questions">
            <div className="questions__spacer_div"></div>
            <div className = "questions__container">
                {usernameField}
                {startQuizButton}
                {notification}
                {questionsTable}
                {newQuestionForm}
            </div>
            <div className="questions__spacer_div"></div>
        </div>
    );
}