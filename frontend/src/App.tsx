import React, { useState } from 'react';
import './App.css';


function App() {

  const  [count,setCounter]=useState(0);

  const getCounter=():void=>{
    setCounter(count +1);
  }
  
  return (
    <div className="App">
     <button onClick={getCounter}>COUNT:{count}</button>
    </div>
  );
}

export default App;
 
