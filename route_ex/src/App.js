import React from "react";
import { render } from 'react-dom';
import { withRouter } from "react-router";
import {Route, Link} from 'react-router-dom';
import Home from "./Home";
import Cat from './Cat';
import Dog from "./Dog";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    console.log(this.props);
  }

  render() {
    return (
      <div className="App">
        <div>
          <Link to='/'>되돌아가기</Link>
          <Link to='/cat/nabi'>고양이</Link>
          <Link to='/dog'>강아지</Link>
        </div>
        <Route exact path='/' component={Home} />
        <Route path='/cat/:cat_name' component={Cat} />
        <Route path='/dog' component={Dog} />

        <button onClick={() => {
          // props에 있는 history를 사용합니다.
          // push([이동할 주소])는 페이지를 이동시켜 줍니다.
          this.props.history.push('/cat');
        }}>
          /cat으로 가기
        </button>
        <button onClick={()=>{
          // goBack()은 뒤로가기 예요.
          this.props.history.goBack();
        }}>뒤로가기
        </button>
      </div>
    )
  }
}

export default withRouter(App);
