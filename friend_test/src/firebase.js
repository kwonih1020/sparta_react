//firebase.js
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    // firebase 설정과 관련된 개인 정보
    apiKey: "AIzaSyBHrzSpTAdkGQdjAqixOBGQ9WTRsDaT6Lk",
    authDomain: "sparta-react-friendtest.firebaseapp.com",
    projectId: "sparta-react-friendtest",
    storageBucket: "sparta-react-friendtest.appspot.com",
    messagingSenderId: "484392006352",
    appId: "1:484392006352:web:ad4e9bfc0256c72da624d5",
    measurementId: "G-3ZV306DJ4L"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };
