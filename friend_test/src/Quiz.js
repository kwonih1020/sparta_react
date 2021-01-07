import React from "react";
import styled from "styled-components";
import Score from "./Score";
import SwipeItem from "./SwipeItem";


import { useSelector, useDispatch } from "react-redux";
import {addAnswer} from "./redux/modules/quiz";

const Quiz = (props) => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.quiz.answers);
  const quiz = useSelector((state) => state.quiz.quiz);
  
  const num = answers.length;

  const onSwipe = (direction) => {
    let _answer = direction === "left"? "O" : "X";

    if(_answer === quiz[num].answer){
      // 정답일 경우,
      dispatch(addAnswer(true));
    }else{
      // 오답일 경우,
      dispatch(addAnswer(false));
    }
  }

  if (num > quiz.length -1) {
    return <Score {...props}/>;
    // return <div>퀴즈 끝!</div>;
  }

  return (
    <QuizContainer>
      <p>
        <span>{num + 1}번 문제</span>
      </p>
      {quiz.map((l, idx) => {
        if (num === idx) {
          return <Question key={idx}>{l.question}</Question>;
        }
      })}

      <AnswerZone>
        <Answer>{"O "}</Answer>
        <Answer>{" X"}</Answer>
      </AnswerZone>

      {quiz.map((l, idx) => {
        if (idx === num) {
          return <SwipeItem key={idx} onSwipe={onSwipe}/>;
        }
      })}
    </QuizContainer>
  );
};

const QuizContainer = styled.div`
  margin-top: 16px;
  width: 100%;
  & > p > span {
    padding: 8px 16px;
    background-color: #fef5d4;
    // border-bottom: 3px solid #ffd6aa;
    border-radius: 30px;
  }
`;

const Question = styled.h1`
  font-size: 1.5em;
`;

const AnswerZone = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  min-height: 70vh;
`;

const Answer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  font-weight: 600;
  color: #dadafc77;
`;

const DragItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  & > div {
    border-radius: 500px;
    background-color: #ffd6aa;
  }
  & img {
    max-width: 150px;
  }
`;
export default Quiz;
