// Action(액션)
export const increase = (mem_name) => ({ type: "INCREASE", payload: mem_name });
export const decrease = (empVO) => ({ type: "DECREASE", payload: empVO });
export const reset = () => ({ type: "RESET" });
export const deptlist = (depts) => ({ type: "DEPTLIST", payload: depts });
export const initAuth = (firebaseAuth, googleProvider) => ({ 
      type: "INIT_AUTH", firebaseAuth: firebaseAuth, googleProvider: googleProvider })

// 초기 상태 만들기 - 무엇을 관리하지?
const initstate = {
  number: 0,
  mem_name: "최경진",
  empVO: {empno:1000, ename: "홍항항"},
  depts: [
    {DEPTNO: 10, DNAME: "총무부", LOC: "서울"},
    {DEPTNO: 20, DNAME: "댄스부", LOC: "제주"},
    {DEPTNO: 30, DNAME: "체스부", LOC: "판교"},
  ],
  firebaseAuth: "",
  googleProvider: "",
};

// Reducer(액션의 타입에 따라 원하는 처리를 한다.)
const reducer = (state = initstate, action) => {
  switch(action.type) {
    case "INCREASE" :
      return { number: state.number + 1, mem_name: action.payload };
    case "DECREASE" :
      return { ...state, number: state.number - 1, empVO: action.playload };
    case "RESET" : 
      return { number: 0, mem_name: "최경진 초기화" };
    case "DEPTLIST" : 
      return { depts: action.payload };
    case "INIT_AUTH" : 
      return { ...state, firebaseAuth: action.firebaseAuth, googleProvider: action.googleProvider };
    default :
      return { ...state }; // 특정한 타입이 존재하지 않으면 초기 상태 정보를 얕은 복사로 내보낸다.
  }
};

export default reducer;


/* 
store 안에 있어야하는 것들 - One way architecture 단방향!
1. Action
2. Dispatch - 리덕스에스 훅으로 지원
3. store
4. view

https://hanamon.kr/redux%EB%9E%80-%EB%A6%AC%EB%8D%95%EC%8A%A4-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC/

*/