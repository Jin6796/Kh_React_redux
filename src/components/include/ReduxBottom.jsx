import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { increase, decrease, reset, deptlist } from '../../store';

const ReduxBottom = () => {
  const dispatch = useDispatch();
  const handleReset = () => {
    // 화면이 렌더링 된 후에 내용물이 변경될 때는 상태를 바꿔주자 - 리덕스 컨벤션
    // 파라미터에 담아야 하는 것은? >>>> action
    // store.js에 action을 선언할 것!!
    dispatch(reset())
  }
  const [depts, setDepts] = useState([
    { DEPTNO: 40, DNAME: "재정부", LOC: "인천" },
    { DEPTNO: 50, DNAME: "기획부", LOC: "대구" },
    { DEPTNO: 60, DNAME: "인사부", LOC: "전주" }
  ])
  return (
    <div className="sub_container">
      <h4>바닥글</h4>
      <button onClick={() => dispatch(increase("변!신!"))}>증가</button>
      <button onClick={() => dispatch(decrease({ empno: 2000, ename: "세일러문" }))}>감소</button>
      <button onClick={handleReset}>초기화</button>
      <button onClick={() => dispatch(deptlist(depts))}>부서목록</button>
    </div>
  );
}

export default ReduxBottom;