import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuestion } from './questionSlice';
import { nanoid } from '@reduxjs/toolkit';

export function NewQuestionForm() {

    const dispatch = useDispatch();

    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState(["", "", "", ""]);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1);
    const [idPrefix] = useState(nanoid());

    const isCurrentQuestionFormValid = question !== "" && answers.every(value => value !== "") && correctAnswerIndex !== -1;

    return (
        <div className="new_question">
            <div className = "form-group">
                <label htmlFor = {idPrefix + "__question_input"}>Új Kérdés</label>
                <input id = {idPrefix + "__question_input"} type = "text" className="form-control" placeholder="A kvíz során megjelenített kérdés szövegét írd ide!"
                    value = {question} onChange = {(event) => {setQuestion(event.target.value)}}></input>
            </div>
            <div className = "form-group">
                <div className="new_question__answer-header">
                    <span className="new_question__answer-header-left">Válaszlehetőségek</span><span className="new_question__answer-header-right">Jó válasz</span>
                </div>
                {answers.map((value, index) => (
                    <div key = {index} className="new_question__answer-row">
                        <input className="new_question__answer_input" id = {idPrefix + "__answer_" + index + "_input"} value = {value} onChange = {(event) => {let newArray = answers.filter(() => true); newArray[index] = event.target.value;setAnswers(newArray)}}></input>
                        <div className="form-check inline_radio_container">
                            <input className="form-check-input position-static inline_radio_container__radio" type="radio" value = {index} checked = {correctAnswerIndex === index} onChange = {(event) => {setCorrectAnswerIndex(Number(event.target.value))}}></input>
                        </div>
                    </div>
                ))}
            </div>
            <button className="new_question__submit" onClick={() => {
                    dispatch(addQuestion({questionText: question, answers: answers, correctAnswer: Number(correctAnswerIndex)}))
                    setQuestion("");
                    setAnswers(["", "", "", ""]);
                    setCorrectAnswerIndex(-1);
                }}
                disabled = {!isCurrentQuestionFormValid}> Új kérdés hozzáadása </button>
        </div>
    )
};