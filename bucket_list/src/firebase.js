//firebase.js
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    // firebase 설정과 관련된 개인 정보
    apiKey: "AIzaSyAAHH7HRqx5dZJ_nNp-gRByS0mB273GQW4",
    authDomain: "sparta-react-ick.firebaseapp.com",
    projectId: "sparta-react-ick",
    storageBucket: "sparta-react-ick.appspot.com",
    messagingSenderId: "136818208084",
    appId: "1:136818208084:web:5adc31108144a9b069ecc1",
    measurementId: "G-T9WLSXC198"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };
