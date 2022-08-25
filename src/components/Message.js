import React, { useEffect, useState } from 'react'

export default function Message({end, turn, answer}) {
  const [display,setDisplay] = useState("none");
  const [position, setPosition] = useState("-100%");
  const [translate, setTranslate] = useState("0");
  useEffect(()=>{
    if(end){
      setDisplay("flex");
      setPosition("50%");
      setTranslate("0 -50%");
    }
  },[end])

  function handleCloseClick(){
    setTimeout(()=>{
      setPosition("-100%");
      setDisplay("none");
    },200)
  }

  return (
    <div className="message" style={{display: display,top:position,translate:translate}}>
      <button className='close' onClick={handleCloseClick}>X</button>
      {turn===6?<h3>Beter luck next time{" :("}<hr></hr>The word was <span>{answer}</span></h3>
      :<h2>Congrats!!!<hr></hr>You win in {turn} tries</h2>}
    </div>
  )
}
