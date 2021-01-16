import React from "react";

import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";

// import [컴포넌트 명] from [컴포넌트가 있는 파일경로];
import BucketList from "./BucketList";
import styled from "styled-components";
import Detail from "./Detail";
import NotFound from "./NotFound";

// 리덕스 스토어와 연결하기 위해 connect라는 친구를 호출할게요!
import {connect} from 'react-redux';
// 리덕스 모듈에서 (bucket 모듈에서) 액션 생성 함수 두개를 가져올게요!
import {loadBucket, createBucket, loadBucketFB, addBucketFB} from './redux/modules/bucket';
import Progress from "./Progress";
import Spinner from "./Spinner";

// firestore 가져오기
import { firestore } from "./firebase";

// 이 함수는 스토어가 가진 상태값을 props로 받아오기 위한 함수예요.
const mapStateTopProps = (state) => ({
  bucket_list: state.bucket.list,
  is_loaded: state.bucket.is_loaded,
});

// 이 함수는 값을 변화시키기 위한 액션 생성 함수를 props로 받아오기 위한 함수예요.
const mapDispatchToProps = (dispatch) => ({
  load: () => {
    dispatch(loadBucketFB());
  },
  create: (new_item) => {
    console.log(new_item);
    dispatch(addBucketFB(new_item));
  }
});

// 클래스형 컴포넌트는 이렇게 생겼습니다!
class App extends React.Component {
  constructor(props) {
    super(props);
    // App 컴포넌트의 state를 정의해줍니다.
    this.state = {
     
    };
    // ref는 이렇게 선언합니다!
    this.text = React.createRef();
  }

  componentDidMount() {

    this.props.load();
    // bucket에서 buckets로 이름 바꾸기! 그리고 대시보드를 확인해보세요!
    // const bucket = firestore.collection("bucket2");
    // bucket.doc("bucket_item").set({ text: "수영 배우기", compeleted: false });
    
    

    // console.log(firestore);
    // const bucket = firestore.collection('bucket');
    // // 하나만 확인하기
    // bucket
    //   .doc("bucket_item1")
    //   .get()
    //   .then((doc) => {
    //     // .exists를 써서 데이터가 있는 지 없는 지 확인!
    //     if(doc.exists){
    //       // 데이터를 콘솔에 찍어보자!
    //       console.log(doc.data());
    //     }
    //   });
    // //전체 확인하기
		// bucket
    //   .get()
    //   .then((docs) => {
    //     let bucket_data = [];
    //     docs.forEach((doc) => {
    //       // 도큐먼트 객체를 확인해보자!
    //       console.log(doc);
    //       // 도큐먼트 데이터 가져오기
    //       console.log(doc.data());
    //       // 도큐먼트 id 가져오기
    //       console.log(doc.id);

    //       if (doc.exists) {
    //         bucket_data = [...bucket_data, { id: doc.id, ...doc.data() }];
    //       }
    //     });

    //     console.log(bucket_data);
    //   });

    // 데이터 추가하기
    // bucket.add({text: "찬양 배우기", compeleted: false}).then((docRef) => {
    //   console.log(docRef);
    //   console.log(docRef.id);
    // });

    // 데이터 수정하기
    // bucket.doc("bucket_item1").update({text: "수영 배우기2"});

    // 데이터 삭제하기
    // bucket.doc("bucket_item2").delete().then(docRef => {
    //   console.log("Deleted")
    // });
}

  addBucketList = () => {
    // const new_item = { text: this.text.current.value, compeleted: false};
    const new_item = this.text.current.value;
    this.props.create(new_item);
  };

  // 랜더 함수 안에 리액트 엘리먼트를 넣어줍니다!
  render() {
    console.log(this.props.is_loaded);
    return (
      <div className="App">
        <Container>
          <Title>내 버킷리스트</Title>
          {!this.props.is_loaded ? (
            <Spinner />
          ) : (
            <React.Fragment>
              <Progress/>
              <Line />
              <Switch>
                <Route path="/" exact component={BucketList} />
                <Route path="/detail/:index" component={Detail} />
                <Route component={NotFound} />
              </Switch>
            </React.Fragment>
          )}
          
          {/* 컴포넌트를 넣어줍니다. */}
          {/* <컴포넌트 명 [props 명]={넘겨줄 것(리스트, 문자열, 숫자, ...)}/> */}
          {/* Route 쓰는 법 2가지를 모두 써봅시다! */}
          
        </Container>
        {/* 인풋박스와 추가하기 버튼을 넣어줬어요. */}
        <Input>
          <input type="text" ref={this.text} />
          <button onClick={this.addBucketList}>추가하기</button>
        </Input>

        <button 
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
           }}
          >
            위로가기
        </button>
      </div>
    );
  }
}

const Input = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > * {
    padding: 5px;
  }

  & input {
    border-radius: 5px;
    margin-right: 10px;
    border: 1px solid #888;
    width: 70%;
    &:focus {
      border: 1px solid #a673ff;
    }
  }

  & button {
    width: 25%;
    color: #fff;
    border: 1px solid #a673ff;
    background-color: #a673ff;
  }
`;


const Container = styled.div`
  max-width: 350px;
  min-height: 60vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: #673ab7;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;
// withRouter 적용
// connect로 묶어줬습니다!
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(App));
