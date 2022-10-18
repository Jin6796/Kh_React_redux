const createStore = () => {
  let state; // 상태를 관리하는 변수
  let handlers = []; // 구독발행을 위한 배열 선언
  const send = (action) => {
    state = worker(state, action);
    handlers.forEach(handlers => handlers())
  };
  const subscribe = (handler) => {
    handlers.push(handler)
  };
  const getState = () => {
    return state;
  };
  return {
    send, getState, subscribe
  };
}
/* 
첫번째 인자는 리덕스가 넘겨주는 state가, 두번째 인자는 Action객체가 넘어온다.
  >> 어떤 일을 해줘! 라는 요청정보가 담김
*/
const worker = (state={count:0}, action) => {
  switch(action.type){
    case "increase":
      return { ...state, count: state.count + 1};
    case "decrease":
      return { ...state, count: state.count - 1};
    default: 
      return {...state};
  }
}

const store = createStore(worker);
store.subscribe(() => {
  console.log(store.getState());
})

// 무엇을 바꿔야 하는 지에 대한 정보가 없어서 무조건 1씩만 증가하고 있음
// 그래서 Action을 추가해야 함 - 무엇을 바꿔줘 라는 내용이 담겨야 함
store.send()
console.log(store.getState());

// 증가시켜줘!
store.send({ type: "increase" })
console.log(store.getState());
// 감소시켜줘!
store.send({ type: "decrease" })
console.log(store.getState());