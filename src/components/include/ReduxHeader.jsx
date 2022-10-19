import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginGoogle, logout } from '../service/authLogic';
// spread 연산자, 얕은 복사, 구조분해 할당 
const ReduxHeader = (props) => {
  const dispatch = useDispatch();
  const number = useSelector((store)=> store.number)
  const mem_name = useSelector((store)=> store.mem_name)
  const empVO = useSelector((store)=> store.empVO)
  const firebaseAuth = useSelector((store)=> store.firebaseAuth)
  const googleProvider = useSelector((store)=> store.googleProvider)
  const [userId, setUserId] = useState();
  useEffect(() => {
    setUserId(window.localStorage.getItem("userId"))
  }, [])
  const handleGoogle = async() => {
    try {
      const result = await loginGoogle(firebaseAuth, googleProvider);
      console.log(result.uid);
      window.localStorage.setItem("userId", result.uid);
      window.location.reload();
    } catch (e) { console.log(e); }
  }
  return (
    <div className="sub_container">
      <h3>헤더</h3>
      {
        userId ? 
        <button variant="primary" onClick={()=>{logout(firebaseAuth); window.location.reload();}}>로그아웃</button>
        :
        <button onClick={handleGoogle}>구글</button>
      }
      번호 : {number}&nbsp;
      이름 : {mem_name}&nbsp;
      사원 정보 : {empVO && `[사원번호: ${empVO.empno}, 사원명: ${empVO.ename}]`}
    </div>
  );
}

export default ReduxHeader;

/* dispatcher와 useSelector hook이 필요하다 */