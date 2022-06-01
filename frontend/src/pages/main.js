import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export default function MainPage() {
  const btnStyle={
    color: "white",
    background: "teal",
    padding: ".375rem .75rem",
    border: "1px solid teal",
    borderRadius: ".25rem",
    fontSize: "1rem",
    lineHeight: 1.5,
    position:'relative',
    margin:'auto',
    margintop:'210px'
    //margin:"0 auto"
    //display:'flex'
  }
  return (
    <div className='container'>
      <h1 style={{textalign:'center',fontSize:'60px', fontFamily : 'NanumSquare' }}>NUMBER BASEBALL</h1>
      <div className='bt'>
         <Link to="/bridge">
     <button type="button" style={btnStyle}>게임시작</button>
   </Link>
      </div>
      
    </div>

    // <div className='bt'
  //   <Link to="/bridge">
  //   <button type="button" style={btnStyle}>게임시작</button>
  // </Link>
  )
}