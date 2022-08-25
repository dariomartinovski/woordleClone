import React,{useState, useEffect} from 'react';
import './App.css';
import Board from './components/Board';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import Message from './components/Message';
import answers from './data/wordsdb.json';

function App() {
  const [turn, setTurn] = useState(0);
  const [answer,setAnswer] = useState("");
  const [currentWord,setCurrentWord] = useState("");
  const [guesses,setGuesses] = useState([...Array(6)]);
  const [end,setEnd] = useState(false);

  useEffect(()=>{
    let data=Object.entries(answers)[0][1];
    const solution = (data[Math.floor(Math.random()*data.length)].word).toUpperCase();
    setAnswer(solution);
  },[setAnswer])

  function findWord(){
    let data=Object.entries(answers)[0][1];
    let exists = false;
    for(let i=0;i<data.length;i++){
      if((data[i].word).toUpperCase()===currentWord){
        exists=true;
        break;
      }
    }
    if(exists)
      return true;
    alert("There is no such word in the database");
    return false;
  }

  /*
    was good sup
  useEffect(() => {
    fetch('http://localhost:3001/answers')   // json-server ./pathToFile --port xxxx
      .then(response => response.json())  // return podatoci
      .then(json => { 
        const solution = (json[Math.floor(Math.random()*json.length)].word).toUpperCase(); 
        setAnswer(solution);
      })
  },[setAnswer])*/

  return (
    <>
    <Header/>
    <Message end={end} turn={turn} answer={answer}/>
    <Board currentWord={currentWord} guesses={guesses} turn={turn}/>
    <Keyboard currentWord={currentWord} setCurrentWord={setCurrentWord} answer={answer} guesses={guesses} setGuesses={setGuesses} turn={turn} setTurn={setTurn} end={end} setEnd={setEnd} findWord={findWord}/>
    </>
  );
}

export default App;
