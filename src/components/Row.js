import React from 'react'

export default function Row({guess, currentWord}) {
    if(guess){
        return(
            <>
                {guess.map((item,i)=>{
                    return <div key={i} className={item.color}>{item.key}</div>
                })}
            </>
        )
    }
    if(currentWord){
        let letter=currentWord.split("");
        return(
            <>
                {letter.map((letter,i)=>{
                    return <div key={i} className="filled">{letter}</div>
                })}
                {[...Array(5-currentWord.length)].map((v,i)=>(
                    <div key={i}></div>
                ))}
            </>
        )
    }
  return (
    <>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </>
  )
}
