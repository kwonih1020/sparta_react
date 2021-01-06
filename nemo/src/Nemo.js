import React from 'react';

const Nemo = (props) => {
    const [count, setCount] = React.useState(3);
    console.log(count);

    const addNemo = () => {
         // this.setState로 count를 하나 더해줍니다!
        setCount(count+1);
    };

    const removeNemo = () => {
        setCount(count > 0? count-1 : 0 );
    }
    
    const nemo_count = Array.from({ length: count }, (v, i) => (i));
    return (
        <div className="App">
        <Nemo />
        {nemo_count.map((num, idx) => {
          return (
            <div key={idx}
              style={{
                width: "150px",
                height: "150px",
                backgroundColor: "#ddd",
                margin: "10px",
              }}
            >
              nemo
            </div>
          );
        })}
        <div>
          {/* 함수를 호출합니다. 이 클래스 안의 addNemo 함수를 불러오기 때문에 this.addNemo로 표기해요. */}
          <button onClick={addNemo}>하나 추가</button>
          <button onClick={removeNemo}>하나 빼기</button>
        </div>
      </div>
    );
}

export default Nemo;
