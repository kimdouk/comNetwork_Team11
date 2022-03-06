import React, {useEffect} from "react";
import './App.css';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:80");
socket.emit('init', {name: 'tester'})

function App() {
  useEffect(() => {
    return () => {
      socket.close()
    }
  }, [])
  return (
    <div className="App">
      <p>test</p>
    </div>
  );
}

export default App;
