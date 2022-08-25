import React, { useEffect, useState } from 'react'

export default function Keyboard({currentWord, setCurrentWord, answer, guesses, setGuesses, turn, setTurn, end, setEnd, findWord}) {
  const keyboard = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Enter","Z","X","C","V","B","N","M","Back"];
  const [keypad,setKeypad] = useState([]);

  useEffect(()=>{
    setKeypad(() => {
      let newKeys = [...keyboard].map((letter)=>{
        return {key:letter,color:null}
      })
      return newKeys;
    })// eslint-disable-next-line
  },[])

  useEffect(()=>{
    if(turn===6){
      setEnd(true);
    }
  },[turn,setEnd])

  useEffect(()=>{
    if(end)
      window.removeEventListener("keyup",handleKeyPress); //tbd
  },[end, handleKeyPress])

  useEffect(()=>{
    window.addEventListener("keyup",handleKeyPress);
    return ()=> window.removeEventListener("keyup",handleKeyPress);
  },[handleKeyPress,end])
  
  function renderButton(item,index){
    if(item==="Enter")
      return <button className='letter enter' key={index} onClick={handleClick}>{item}</button>
    else if(item==="Back")
      return <button className='letter backspace' key={index} onClick={handleClick}>{item}</button>
  }
  // eslint-disable-next-line
  function handleKeyPress(e){
    if(!end){
      if(e.key==="Enter"){
        if(currentWord.length===5 && findWord()){ // it should check in the database....
          const formatedWord = submitWord ();
          addNewGuesses(formatedWord);
        }
      }
      else if(e.key==="Backspace")
        setCurrentWord(currentWord.slice(0,-1));
      else{
        if(/^[A-Za-z]$/.test(e.key) && currentWord.length!==5){
          setCurrentWord(currentWord+(e.key).toUpperCase());
        }
      }
    }
  }

  function handleClick(e){
    if(!end){
      if(e.target.textContent === "Back")
        setCurrentWord(currentWord.slice(0,-1));
      else if(e.target.textContent === "Enter"){
        if(currentWord.length===5 && findWord()){ // it should check in the database....
          // let temp = submitWord();
          const formatedWord = submitWord();
          // console.log(formatedWord)
          addNewGuesses(formatedWord);
        }
      }
      else{
        if(currentWord.length!==5)
          setCurrentWord(currentWord+e.target.textContent); 
      }
    }
  }

  function submitWord(){
    if(turn>6){
      return;
    }
    let answerArray = [...answer];
    let formatedWord = [...currentWord].map((letter)=>{
      return {key: letter, color:'wrong'}
    });

    formatedWord.forEach((item,i)=>{ //check if the place is correct
      if(item.key===answerArray[i]){
        item.color='correct';
        answerArray[i]=null; //later for yellow checking, if its green, it cant be yellow also
        setKeypad((prevKeypad)=>{
          let newKeypad = [...prevKeypad];
          newKeypad[keyboard.indexOf(item.key)].color="correctLetter";
          return newKeypad;
        })
      }
    })
    
    formatedWord.forEach((item,i)=>{
      if(answerArray.includes(item.key) && item.color!=='correct'){
        item.color='wrongPlace'; 
        answerArray[answerArray.indexOf(item.key)]=null; //if it yellow once, cant be more times i think
        setKeypad((prevKeypad)=>{
          let newKeypad = [...prevKeypad];
          if(newKeypad[keyboard.indexOf(item.key)].color!=="correctLetter")
            newKeypad[keyboard.indexOf(item.key)].color="wrongPlaceLetter";
          return newKeypad;
        })
      }
    })

    formatedWord.forEach((item,i)=>{
      if(item.color==='wrong'){
        setKeypad((prevKeypad)=>{
          let newKeypad = [...prevKeypad];
          if(newKeypad[keyboard.indexOf(item.key)].color!=="correctLetter" && newKeypad[keyboard.indexOf(item.key)].color!=="wrongPlaceLetter")
            newKeypad[keyboard.indexOf(item.key)].color="wrongLetter";
          return newKeypad;
        })
      }
    })
    
    return formatedWord;
  }

  function addNewGuesses(formatedWord){
    if(currentWord===answer)
      setEnd(true); //tbd  //*********** */
    setGuesses(prevGuesses => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn]=formatedWord;
      return newGuesses;
    })
    setTurn(prevTurn => prevTurn+1);
    setCurrentWord("");
  }

 return (
    <div className='keyboard'>
      {keypad.map((item,index)=>{
        return item.key==="Enter" || item.key==="Back"? renderButton(item.key,index):<button onClick={handleClick} className={`letter ${item.color || ""}`} key={index}>{item.key}</button>
      })}
    </div>
  )
}
