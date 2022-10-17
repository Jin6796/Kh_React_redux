import React from 'react';
import "../../App.css";

const Bottom = ({ increase, decrease }) => {
  return (
    <div className='sub_container'>
      <h3>바닥글</h3>
      <button onClick={increase}>증가</button>
      <button onClick={decrease}>감소</button>
    </div>
  );
}

export default Bottom;