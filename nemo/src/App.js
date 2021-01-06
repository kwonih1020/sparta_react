import React from "react";
import Nemo from "./Nemo";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 3, // 숫자넣기!
    };

    // div에 ref를 먼저 잡아줍시다.
    this.div = React.createRef();
  }

  hoverEvent = (e) => {
    // 콘솔로 이 이벤트가 누구에게서 일어났는 지 확인할 수 있습니다.
    console.log(e.target);

    if(e.target.className === 'app'){
      // 이벤트의 장본인의 배경 색을 바꿔볼까요?
      e.target.style.background = "#eee";
    }
  }

  componentDidMount() {
    // 리액트 요소가 잘 잡혔나 확인해봅시다!
    console.log(this.div);

    // 마우스를 올렸을 때, 이벤트가 일어나는 지 확인해봅시다.
    this.div.current.addEventListener("mouseover", this.hoverEvent);
  };

  componentWillUnmount() {
    // 컴포넌트가 사라질 때 이벤트를 지워줍니다.
    this.div.removeEventListener("mouseover", this.hoverEvent);
  }

  addNemo = () => {
    // this.setState로 count를 하나 더해줍니다!
    this.setState({ count: this.state.count + 1 });
  };

  removeNemo = () => {
    // 네모 갯수가 0보다 작을 순 없겠죠! if문으로 조건을 걸어줍시다.
    if (this.state.count > 0) {
      // this.setState로 count를 하나 빼줍니다!
      this.setState({ count: this.state.count - 1 });
    }else{
      window.alert('네모가 없어요!');
    }
  };

  render() {
    // 배열을 만듭니다.
    // Array.from()은 배열을 만들고 초기화까지 해주는 내장 함수입니다.
    // Array.from()의 첫번째 파라미터로 {length: 원하는 길이} 객체를,
    // 두번째 파라미터로 원하는 값을 반환하는 콜백함수를 넘겨주면 끝!
    // array의 내장함수 대부분은 콜백 함수에서 (현재값, index넘버)를 인자로 씁니다.
    const nemo_count = Array.from({ length: this.state.count }, (v, i) => i);

    // 콘솔로 만들어진 배열을 확인해봅니다. 숫자가 0부터 순서대로 잘 들어갔나요?
    console.log(nemo_count);

    return (
      <div className="App" ref={this.div}>
        <Nemo />
      </div>
    );
  }
}

export default App;
