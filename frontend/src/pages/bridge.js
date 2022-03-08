import React, {useState} from 'react';

export default function BridgePage() {
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    number: ''
  });
  const {nickname, number} = userInfo
  const changeUserInfo = (e) => {
    const {name, value} = e.target
    
    setUserInfo(userInfo => {
      return {...userInfo, [name]: value}
    })
  }
  const enterGame = () => {
    const isFourNumber = /^[0-9]{4}$/
    const isValidNumber = isFourNumber.test(number)
    const isOverlap = new Set(number.split('')).size === number.length
    if (nickname && isValidNumber && isOverlap) {
      window.history.pushState(userInfo, null, '/game')
      window.history.go()
    } else {
      alert('4자리 숫자를 겹치지 않게 입력해주세요')
    }
  }
  return (
    <div>
      <article>
        <input name="nickname" value={nickname} onChange={changeUserInfo} />
        <input
          name="number"
          value={number}
          onChange={changeUserInfo}
        />
        <button onClick={enterGame}>입장</button>
      </article>
    </div>
  )
}