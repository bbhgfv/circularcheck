  /* Main app component. New components should be added here. */

import React, { useState } from 'react';
import morphology from './resources/morphology.json'
import maturity_elements from './resources/maturity_elements.json'

import Welcome from './Welcome';
import Login from './login_components/Login';
import Register from './login_components/Register'; 
import QuestionPopUp from './QuestionPopUp';
import AssessmentOverview from './AssessmentOverview';
import MorphologyOverview from './MorphologyOverview';
import Header from './Header';
import Help from './Help';
  
import './App.css';
  

  function App() {

    const [activePage, setActivePage] = useState("Welcome"); 

    const [activeField, setActiveField] = useState(undefined);

  const [amountAnswered, setAmountAnswered] = useState(
    Array(maturity_elements.length).fill(0)
  );

  const [currentLevel, setCurrentLevel] = useState(
    Array.from({length: maturity_elements.length}, (_, index) => {
      return Array(maturity_elements[index].elements.length).fill(-1);
    })
  );

  const [targetLevel, setTargetLevel] = useState(
    Array.from({length: maturity_elements.length}, (_, index) => {
      return Array(maturity_elements[index].elements.length).fill(-1);
    })
  );

  const [activeCharacteristics, setActiveCharacteristics] = useState(
    Array.from(morphology, (dim1) => Array.from(dim1['lower dimensions'], (dim2) =>
        Array.from(dim2['lower dimensions'], (dim3) =>
            Array.from(dim3['lower dimensions'], (dim4) =>
                Array.from(dim4['characteristics'], (ch) => false)))))
  );

  function showHelp() {
    document.getElementById("help").classList.toggle("hide");
  }
  
  console.log(activeCharacteristics)

    return (
      <div className="App">
        <Header className ="taskbar-container" activePage={activePage} setActivePage={setActivePage}/>
        <QuestionPopUp currentLevel={currentLevel} setCurrentLevel={setCurrentLevel}
        targetLevel={targetLevel} setTargetLevel={setTargetLevel}
        amountAnswered={amountAnswered} setAmountAnswered={setAmountAnswered}
        activeField={activeField}/>
        <Help></Help>
        <div className="App-content">
          <div className="App-card" id="main-card">
            {
              activePage === "Register" ? <Register setActivePage={setActivePage}/> :
              activePage === "Login" ? <Login setActivePage={setActivePage}/> :
              activePage === "Welcome" ? <Welcome setActivePage={setActivePage}/> :
              activePage === "Assessment" ? <AssessmentOverview setActivePage={setActivePage} setActiveField={setActiveField} setActiveCharacteristics={setActiveCharacteristics} activeCharacteristics={activeCharacteristics} answered={amountAnswered} currentLevel={currentLevel} targetLevel={targetLevel}/> :
              activePage === "Morphology" ? <MorphologyOverview setActivePage={setActivePage} setActiveCharacteristics={setActiveCharacteristics} activeCharacteristics={activeCharacteristics}/> : null
            }
          </div>
        </div>
        
        <footer className="App-footer">
          <div className='flex gap-10' style={{marginLeft: "auto"}}>
            <p>Grafiken von PTW</p>
            <p>Programmiert von TU Darmstadt</p>
          </div>
          <div className="Register help-btn" onClick={() => {showHelp()}}><button>Hilfe</button></div>
        </footer>
      </div>
    );
  }

  export default App;
