import React from 'react';
import "../App.css";

const Bottom = ({ increase }) => {
  return (
    <div className='sub_container'>
      <h3>바닥글</h3>
      <button onClick={increase}>증가</button>
    </div>
  );
}

export default Bottom;