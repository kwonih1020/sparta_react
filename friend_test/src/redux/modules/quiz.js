// Actions

// 퀴즈 데이터 가져온다
const GET_QUIZ = "quiz/GET_QUIZ";
// 유저의 응답(퀴즈 답)을 추가한다
const ADD_ANSWER = "quiz/ADD_ANSWER";
// 응답을 초기화 해준다
const RESET_ANSWER = "quiz/RESET_ANSWER";

const initialState = {
  name: "르탄이",
  score_texts: {
    60: "우린 친구! 앞으로도 더 친하게 지내요! :)",
    80: "우와! 우리는 엄청 가까운 사이!",
    100: "둘도 없는 단짝이에요! :)",
  },
  answers: [],
  quiz: [
    { question: "르탄이는 1살이다.", answer: "O" },
    { question: "르탄이는 2살이다.", answer: "O" },
    { question: "르탄이는 3살이다.", answer: "O" },
    { question: "르탄이는 4살이다.", answer: "O" },
    { question: "르탄이는 5살이다.", answer: "O" },
    // { question: "르탄이는 6살이다.", answer: "O" },
    // { question: "르탄이는 7살이다.", answer: "O" },
    // { question: "르탄이는 8살이다.", answer: "O" },
    // { question: "르탄이는 9살이다.", answer: "O" },
    // { question: "르탄이는 10살이다.", answer: "O" },
    // { question: "르탄이는 11살이다.", answer: "O" },
  ],
};

// Action Creators
export const getQuiz = (quiz_list) => {
  return { type: GET_QUIZ, quiz_list };
};

export const addAnswer = (answer) => {
  return { type: ADD_ANSWER, answer };
};

export const resetAnswer = () => {
  return { type: RESET_ANSWER };
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "quiz/GET_QUIZ": {
      return { ...state, quiz: action.quiz_list };
    }

    case "quiz/ADD_ANSWER": {
      return { ...state, answers: [...state.answers, action.answer] };
    }

    case "quiz/RESET_ANSWER": {
      return {...state, answers: []};
    }

    default:
      return state;
  }
}
