import React, {useEffect, useState} from "react";
import '../App.css';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:727");

export default function GamePage() {
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState({
    nickname: '',
    role: '',
    message: '',
  });
  const [turn, setTurn] = useState('');

  useEffect(() => {
    let myRole = ''
    const {nickname, number} = window.history.state

    setChat(chat => {
      return {...chat, nickname}
    })

    socket.emit('init', {
      nickname,
      number
    })

    socket.on('receive message', (message) => {
      setChatList(chatList => chatList.concat(message))
      
      const chatBox = document.querySelector(".chat-box")
      chatBox.scrollTop = chatBox.scrollHeight
    })

    socket.on('set role', (role) => {
      console.log('test')
      myRole = role
      setChat(chat => {
        return {...chat, role}
      })
    })

    socket.on('set turn', (turn) => {
      setTurn(turn)
    })

    return () => {
      socket.emit('leave', myRole)
      socket.close()
    }
  }, [])
  return (
    <div className="App">
      <p>{turn}</p>
      <ChatList role = {chat.role} chatList={chatList} />
      <ChatInput chat={chat} setChat={setChat} turn={turn} />
    </div>
  );
}

function ChatList({role, chatList}) {
  return (
    <div className="chat-list-wrapper">
      <section className="chat-box">
        {chatList && chatList.map((chat, index) => (
          <div key={index} className="chat-wrapper" style={{
            justifyContent: `${chat.role === role ? 'end' : 'start'}`
          }}>
            <p className="chat">{chat.nickname}: {chat.message}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

function ChatInput({chat, setChat, turn}) {
  const changeInput = (e) => {
    const {name, value} = e.target
    setChat(chat => {
      return {...chat, [name]: value}
    })
  }
  const postChat = () => {
    if (turn === chat.role) {
      socket.emit('send message', {...chat})
      setChat(chat => {
        return {...chat, message: ''}
      })
    }
  }

  return (
    <div className="chat-input-wrapper">
      <input name="message" value={chat.message} onChange={changeInput} />
      <button onClick={postChat}>전송</button>
    </div>
  )
}