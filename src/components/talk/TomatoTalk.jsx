import React, { useEffect, useRef, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { Form, InputGroup } from 'react-bootstrap';

const firebaseConfig = {
  apiKey: "AIzaSyAHLI5OD2wSYxiJYlMvJuiW8bK2xj6CaSk",
  authDomain: "kh-terrgym.firebaseapp.com",
  databaseURL: "https://kh-terrgym-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kh-terrgym",
  storageBucket: "kh-terrgym.appspot.com",
  messagingSenderId: "427262482569",
  appId: "1:427262482569:web:f89f88f3c2339ec8bf4e58",
  measurementId: "G-1Y881MTCJ4"
}
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase();

const TomatoTalk= (props) => {
  const formRef = useRef(); // html 노드 접근 시 사용 - getbyElement이런거 대신!
  const msgRef = useRef();
  const userIdRef = useRef();
  // 사용자가 입력한 메세지 담기
  const [message, setMessage] = useState({
    m_no: 0,
    userId: '',
    msg: '',
    surtime: ''
  })
  useEffect(() => {
    console.log(database);
    const starCountRef = ref(database, 'talk');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    })
  }, [])
  const send = (event) => {
    if(event.key === 'Enter'){
      // submit 속성 사용 시 반드시 아래 코드 추가가 필요함 - 버블링 방지 주의!!!
      event.preventDefault();
      formRef.current.reset(); // 사용자가 입력해서 제출하고 나면 form안에 있는 것들 비워주기
      set(ref(database, 'talk/' + message.m_no), message);
    }
  }
  const handleChangeForm = (event) => {
    if(event.currentTarget == null) return;
    console.log('폼 내용 변경 발생, name: ' + event.target.name);
    console.log('폼 내용 변경 발생, value: ' + event.target.value); // 입력받은 값
    setMessage({ 
      ...message, 
      userId: "토마토",
      m_no: Date.now(),
      [event.target.name]: event.target.value
    })
  }
  return (
    <div>
      <h3>TomatoTalk 화면</h3>
      <hr />
      <Form ref={formRef}>
        <InputGroup className="mb-3">
          <input type="hidden" ref={userIdRef} name="userId" onChange={handleChangeForm} /> 
          <Form.Control
            ref={msgRef}
            name="msg"
            placeholder="여기에 말씀하세요"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onKeyDown={send}
            onChange={handleChangeForm}
          />
        </InputGroup>
      </Form>
    </div>
  );
}

export default TomatoTalk;