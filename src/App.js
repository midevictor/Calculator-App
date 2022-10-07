import React from "react";
//Imported useState and useEffect from react
import { useState, useEffect } from "react";
//Imported NumericFormat from react-number-format
import  {NumericFormat} from "react-number-format";
import { FiDelete } from "react-icons/fi";

import "./App.css";

const App = () => {
  // Creaated a sate called previous and set it to an empty string, the setPrestate updates the sate
  const [preState, setPreState] = useState("");
  // Creaated a sate called current and set it to a value of 0, the setCurrent updates the sate
  const [curState, setCurState] = useState("0");
  // Created a state called input and set it to an initial value of 0, the setInput updates the sate
  const [input, setInput] = useState("0");
  // Created a state called operator and set it to an initial value of null, the setOperator updates the sate
  const [operator, setOperator] = useState(null);
  // Created a state called result and set it to an initial bvoolean value of false, the setResult updates the sate
  const [result, setResult] = useState(false);


  // An inputNumber function that takes in a number as a parameter
  const inputNum = (e) => {
    // if the current state (ie whatever the user is about to input) is equal to .( a decimal point) and the previous input is also equal to .( a decimal point) then return which invalidates the input number.
    if (curState.includes(".") && e.target.innerText === ".") return;
    // when the result has been set to true, then set the previous state to an empty string.
    if (result) {
      setPreState("");
    }
    // else set the current state to the current state plus the input number or set the current State to the input number
    else{
    curState
      ? setCurState((pre) => pre + e.target.innerText)
      : setCurState(e.target.innerText);
    setResult(false);
    }
  };
// a useEffect that updates the setinput to the currentState
  useEffect(() => {
    setInput(curState);
  }, [curState]);
// a useEffect that sets the input t0 zero just once reason why i did not pass a dependency
  useEffect(() => {
    setInput("0");
  }, []);
 // A reset function that resets the state to its initial value
  const reset = () => {
    setCurState("0");
    setPreState("");
    setInput("0");
    setOperator(null);
    setResult(false);
  };


// A delete function that deletes the last inputNumber from the input field and updates the state
  const deleteLastNum = () =>{
    setInput(input.slice(0, -1));
    setCurState(curState.slice(0, -1));


  }
  const operatorType = (e) => {
    
    setResult(false);
    setOperator(e.target.innerText);
    if (curState === "") return;
    if (preState !== "") {
      equals();
    }
    else{
      setPreState(curState);
      setCurState("");
    }
    
  };
  
  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setResult(true);
    }

    let cal;
    switch (operator) {
      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState));
        break;
      case "X":
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "/":
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;
      default:
        return;
    }
    setInput("");
    setPreState(cal);
    setCurState("");
  };
  const minusPlus = () => {
    if (curState === "") return;
    if (curState.includes("-")) {
      setCurState(curState.replace("-", ""));
    } else {
      setCurState("-" + curState);
    }
  }
  const percent = () => {
    // if (curState === "") return;
    // setCurState(String(parseFloat(curState) / 100));

preState ? setCurState(String((parseFloat(curState) / 100) * preState)) : setCurState(String(parseFloat(curState) / 100));
  }

  return (
    

    
    <div className="app">
      <h1>Calculator</h1>
      
      
      <div className="container">
      
      <div className="screen">
        
        {input !== "" || input === "0" ? (
          <NumericFormat
            value={input}
            
            displayType={"text"}
            thousandSeparator={true}
          />
        ) : (
          <NumericFormat
            value={preState}
            displayType={"text"}
            thousandSeparator={true}
          />
        )}
      </div>
        
         <div className="keypads"> 
        <div className="btn blue" onClick={reset}>
          AC
        </div>
        <div className="btn red" onClick={deleteLastNum}>
          <FiDelete/>
        </div>
        <div className="btn gray" onClick={percent}>
          %
        </div>
        
        <div className="btn gray" onClick={operatorType}>
          /
        </div>
        <div className="btn" onClick={inputNum}>
          7
        </div>
        <div className="btn" onClick={inputNum}>
          8
        </div>
        <div className="btn" onClick={inputNum}>
          9
        </div>
        <div className="btn gray" onClick={operatorType}>
          x
        </div>
        <div className="btn" onClick={inputNum}>
          4
        </div>
        <div className="btn" onClick={inputNum}>
          5
        </div>
        <div className="btn" onClick={inputNum}>
          6
        </div>
        <div className="btn gray" onClick={operatorType}>
          +
        </div>
        <div className="btn" onClick={inputNum}>
          1
        </div>
        <div className="btn" onClick={inputNum}>
          2
        </div>
        <div className="btn" onClick={inputNum}>
          3
        </div>
        <div className="btn gray" onClick={operatorType}>
          -
        </div>
        <div className="btn zero" onClick={inputNum}>
          0
        </div>
        <div className="btn" onClick={inputNum}>
          .
        </div>
        
        <div className="btn " onClick={minusPlus}>
          +/-
        </div>
       
        <div className="btn" onClick={equals}>
          =
        </div>
        
       </div> 
      </div>
    </div>
    
  );

};

export default App;
