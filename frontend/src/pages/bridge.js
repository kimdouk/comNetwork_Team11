import React, {useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'

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
      <article >
        <input style={{ width : '200px', height : '50px',  fontSize : '20px', marginLeft:'700px',marginTop:'300px'}} placeholder='닉네임입력'name="nickname" value={nickname} onChange={changeUserInfo} />
        <input style={{ width : '200px', height : '50px',  fontSize : '20px'}}
          placeholder='숫자입력'
          name="number"
          value={number}
          onChange={changeUserInfo}
        />
        <button onClick={enterGame} style={{padding: ".375rem .75rem",fontSize: "25px",}}>게임입장</button>
        {/* <input className="form-control mr-sm-2 mx-3" type="search" placeholder="키워드 속성 입력" aria-label="Search" 
                 style={{ width : '200px', height : '50px',  fontSize : '20px'}}
                 value={state.name} //입력되는 값.
                 onChange={handleKeyword}/> */}
      </article>
    </div>
  )
}