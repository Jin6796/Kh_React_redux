import React from 'react';
import "../App.css";

const Header = ({ number }) => {
  return (
    <div className='sub_container'>
      <h2>헤더</h2>
      번호: {number}
    </div>
  );
}

export default Header;