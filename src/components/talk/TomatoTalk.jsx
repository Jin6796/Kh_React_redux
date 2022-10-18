import React, { useEffect, useRef, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { Button, Form, InputGroup } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { Message_li } from "../style/TalkStyle";

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
  // 클라우드 리얼타임 데이터 서버 정보 동기화 처리
  // ** 주의할 것 ** - 메세지 전송 시 객체로 넘겼으니 초기화가 []가 아니라 {}로 이루어져야함
  const [messages, setMessages] = useState({});
  // 사용자가 입력한 메세지 담기
  const [message, setMessage] = useState({
    m_no: 0,
    userId: '',
    msg: '',
    curtime: ''
  })
  const setClock = () => {
    const dataInfo = new Date();
    const hour = modifyNumber(dataInfo.getHours());
    const min = modifyNumber(dataInfo.getMinutes());
    const sec = modifyNumber(dataInfo.getSeconds());
    const curtime = hour + ":" + min + ":" + sec;
    return curtime;
  }
  const modifyNumber = (time) => {
    if(parseInt(time) < 10) return "0" + time;
    else return time;
  };

  useEffect(() => {
    console.log(database);
    setMessage({ ...message, curtime: setClock() });
    const starCountRef = ref(database, 'talk');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setMessages(data);
      console.log(data);
    })
  }, []) // message를 넣으면 매 초마다 새로고침이 되긴 하지만.... 무한반복쓰 ㅠ
  // setTimeout(
  // , 1000)

  const send = (event) => {
    if(event.key === 'Enter' || event.key === 'Click'){
      // submit 속성 사용 시 반드시 아래 코드 추가가 필요함 - 버블링 방지 주의!!!
      event.preventDefault();
      formRef.current.reset(); // 사용자가 입력해서 제출하고 나면 form안에 있는 것들 비워주기
      set(ref(database, 'talk/' + message.m_no), message);
    }
  }
  const handleSend = (event) => {
    // submit 속성 사용 시 반드시 아래 코드 추가가 필요함 - 버블링 방지 주의!!!
    event.preventDefault();
    formRef.current.reset(); // 사용자가 입력해서 제출하고 나면 form안에 있는 것들 비워주기
    set(ref(database, 'talk/' + message.m_no), message);
  }
  const handleChangeForm = (event) => {
    if(event.currentTarget == null) return;
    // console.log('폼 내용 변경 발생, name: ' + event.target.name);
    // console.log('폼 내용 변경 발생, value: ' + event.target.value); // 입력받은 값
    setMessage({ 
      ...message, 
      userId: "토마토",
      m_no: Date.now(),
      [event.target.name]: event.target.value
    })
  }
  return (
    <>
      <div className="container">
        <div className="page-header">
          <h2>TomatoTalk <i className="fa-solid fa-angles-right"></i><small> 토마토님 예약 상담</small></h2>
          <hr />
        </div>
        <div>
          <ul>
            {messages && Object.keys(messages).map(key => (
              <Message_li key={key}>
                <Button className="btn btn-primary">{messages[key].msg}</Button>&nbsp;
                ({messages[key].curtime})
              </Message_li>
            ))}
          </ul>
        </div>
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
            <Button variant="warning" onClick={handleSend}>전송</Button>
          </InputGroup>
        </Form>
      </div>
    </>
  );
}

export default TomatoTalk;