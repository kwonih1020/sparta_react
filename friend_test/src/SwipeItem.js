import React from "react";
import styled from "styled-components";
import img from "./scc_img01.png";

const SwipeItem = React.memo(({ onSwipe }) => {
  const swipe_div = React.useRef(null);
  let swipe_status = "ready";
  let target_classname = "";
  let coordinate = {
    start_x: 0,
    start_y: 0,
    end_x: 0,
    end_y: 0,
  };

  React.useEffect(() => {
    const reset = () => {
      //   console.log("in reset");
      swipe_status = "ready";

      coordinate = {
        start_x: 0,
        start_y: 0,
        end_x: 0,
        end_y: 0,
      };

      swipe_div.current.className = target_classname;

      swipe_div.current.style.left = 0 + "px";
      swipe_div.current.style.top = 0 + "px";
    };

    const touchStart = (e) => {
      //   console.log("start");

      // 터치 시작 시, swipe_status를 touchstart로 변경해줍니다.
      // 그리고 터치 시작한 좌표를 기록합니다!
      // (중요! 그래야 터치 종료할 때 위치를 보고 왼쪽인지, 오른쪽인지 판별할 수 있겠죠!)
      swipe_status = "touchstart";
      target_classname = swipe_div.current.className;
      // console로 터치 이벤트가 시작될 때 좌표를 확인해볼까요?
      //   console.log(e.touches[0]);
      //   console.log(e.touches[0].clientX);
      //   console.log(e.touches[0].clientY);

      //   좌표도 기록해줍니다 :)
      coordinate = {
        ...coordinate,
        start_x: e.touches[0].clientX,
        start_y: e.touches[0].clientY,
      };
    };

    const touchEnd = (e) => {
      swipe_status = "touchend";
      //  touchEnd이벤트는 touches 대신, changedTouches가 있어요.
      //   console.log(e.changedTouches[0]);
      coordinate = {
        ...coordinate,
        end_x: e.changedTouches[0].clientX,
        end_y: e.changedTouches[0].clientY,
      };

      //   x좌표 이동 거리를 구해줍니다.
      let diff_x = coordinate.end_x - coordinate.start_x;
      //   스와이프 방향 / 기본은 left로 뒀습니다!
      let direct = "left";

      // Match.abs() : 절대값을 구해주는 친구입니다.
      if (Math.abs(diff_x) > 50) {
        swipe_div.current.className = target_classname + " swipe";

        // 움직인 방향에 따라 더 옴직이고 투명도를 0으로 (점점 사라지게) 줘봐요!
        if (diff_x > 0) {
          // console.log('move right');
          direct = "right";
          swipe_div.current.style.left = diff_x + 150 + "px";
          swipe_div.current.style.opacity = 0;
        } else {
          direct = "left";
          // console.log('move left');
          //   console.log(diff_x - 150);
          swipe_div.current.style.left = diff_x - 150 + "px";
          swipe_div.current.style.opacity = 0;
        }

        // 300 ms후 reset 해줍니다!
        // 이 300ms는 props로 받아서 처리해줘도 좋겠네요!
        // props로 받아온, 콜백 함수도 여기서 처리해줄게요!
        window.setTimeout(() => {
          reset();
          onSwipe(direct);
        }, 300);
        return;
      }

      //   reset 해줍니다.
      reset();
    };

    const touchMove = (e) => {
      // 스와이프 중 다른 이벤트가 발생하는 것을 막아줍니다
      e.preventDefault();

      //   console.log("in touch move!");
      // 현재 좌표(이동 중인 좌표)를 기록해줍니다.
      let current_coordinate = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };

      //   콘솔로 이동한 값이 어떻게 나오는 지 한번 확인해볼까요?
      //   console.log(
      //     current_coordinate.x - coordinate.start_x,
      //     current_coordinate.y - coordinate.start_y
      //   );

      //   터치 중일 때 div가 따라 움직이도록 해줍시다!
      swipe_div.current.style.left =
        current_coordinate.x - coordinate.start_x + "px";
      swipe_div.current.style.top =
        current_coordinate.y - coordinate.start_y + "px";
    };

    // 터치 이벤트가 취소될 경우 원래 상태로 돌려줍니다!
    const touchCancel = (e) => {
      swipe_status = "cancel";
      reset();
    };

    swipe_div.current.addEventListener("touchstart", touchStart);
    swipe_div.current.addEventListener("touchend", touchEnd);
    swipe_div.current.addEventListener("touchmove", touchMove);
    swipe_div.current.addEventListener("touchcancel", touchCancel);

    // 이부분은 이벤트 해제 부분이에요!
    return () => {
      // 만약 이벤트 걸었던 엘리먼트가 없으면 해제하지 않습니다!
      if (!swipe_div.current) {
        return;
      }
      swipe_div.current.removeEventListener("touchstart", touchStart);
      swipe_div.current.removeEventListener("touchend", touchEnd);
      swipe_div.current.removeEventListener("touchmove", touchMove);
      swipe_div.current.removeEventListener("touchcancel", touchCancel);
    };
  }, []);

  return (
    <DragItem ref={swipe_div}>
      <img src={img} />
    </DragItem>
  );
});

const DragItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  &.swipe {
    transition: 300ms;
  }

  & > div {
    border-radius: 500px;
    background-color: #ffd6aa;
  }
  & img {
    max-width: 150px;
  }
`;

SwipeItem.defaultProps = {
  onSwipe: (direction) => {},
};

export default SwipeItem;
