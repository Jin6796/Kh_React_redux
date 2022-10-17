import React from 'react';
import "../../App.css";
import SubHeader from './SubHeader';

const Header = ({ number }) => {
  return (
    <div className='sub_container'>
      <h2>헤더</h2>
      번호: {number}
      <SubHeader number={number} />
    </div>
  );
}

export default Header;