import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export default function MainPage() {
  return (
    <div>
      <p>main</p>
      <Link to="/game">게임</Link>
    </div>
  )
}