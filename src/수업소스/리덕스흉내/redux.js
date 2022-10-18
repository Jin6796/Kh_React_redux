export const actionCreator = (type) => (payload) => ({
  type,
  payload,
});
// 클로저 사용
export const createStore = () => {
  let state;
  let handlers = [];
  const send = (action) => {
    state = worker(state, action);
    handlers.forEach((handlers) => handlers());
  };
  const subscribe = (handler) => {
    handlers.push(handler);
  };
  const getState = () => {
    return state;
  };
  return {
    send,
    getState,
    subscribe,
  };
};
// 상태를 사용자가 바꾸는 함수를 redux에서는 reducer
// 즉 감속기라는 이름을 사용함