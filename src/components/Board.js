import React from 'react'
import Row from './Row';

export default function BoardSpace({currentWord, guesses, turn}) {
    // let arr = Array.from(Array(30).keys());
    return(
        <div className="board">
            {guesses.map((guess,i) => {
                if(turn===i)
                    return <Row key={i} currentWord={currentWord}/>
                return <Row key={i} guess={guess} />
            })}
        </div>
    );
}
