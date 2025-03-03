/* This is the overview of all maturity elements in the maturity assessment. */

import React, { useState } from 'react';
import DimensionCard from './DimensionCard'
import model from './resources/model.json'
import maturity_elements from './resources/maturity_elements.json'
import ResultsOverview from './ResultsOverview'
import {createActionElementToChoiceDict ,createActionFieldToWeightDiffDict, create2DDimensionToWeightDiffDict,getMeasurementActionFieldPair } from './Dictionary'

const AssessmentOverview = (props) => {

    // Set this String to the page you want to display (i.e. "Survey" for the survey, "Measure" for the recommended measures, etc.)
    const [displayResult, setDisplayResult] = useState("Survey");
    // Results for each action field and each lower dimension
    const [resultsAF, setResultsAF] = useState(undefined);
    const [resultsLD, setResultsLD] = useState(undefined);
    // The resulting recommended measures 
    const [resultsMeasure, setResultsMeasure] = useState(undefined);
    // Unsure what this is, request for comment
    const [resultsChoice, setResultsChoice] = useState(undefined);


    function calculate() {
        var sumOfQuestions = 0;
        var sumOfAnswered = 0;
        maturity_elements.forEach((obj, _) => {
            sumOfQuestions += obj.elements.length;
        });
        props.answered.forEach((n, _) => sumOfAnswered += n);
        if (sumOfAnswered < sumOfQuestions)
            window.alert("Please answer all questions before proceeding.")
        else {
            setResultsAF(createActionFieldToWeightDiffDict(props.currentLevel, props.targetLevel));
            setResultsLD(create2DDimensionToWeightDiffDict(props.currentLevel, props.targetLevel));
            setResultsMeasure(getMeasurementActionFieldPair(props.currentLevel, props.targetLevel));
            setResultsChoice(createActionElementToChoiceDict(props.currentLevel));
            setDisplayResult("Table");
        }
            
    }

    return(
        <div className="flex column space-evenly">
            {displayResult !== "Survey" ?   <ResultsOverview
                                                resultsAF={resultsAF}
                                                resultsLD={resultsLD}  
                                                resultsMeasure={resultsMeasure} 
                                                resultsChoice={resultsChoice}
                                                displayResult={displayResult} 
                                                setDisplayResult={setDisplayResult}
                                                setActivePage={props.setActivePage} 
                                                setActiveCharacteristics={props.setActiveCharacteristics} 
                                                activeCharacteristics={props.activeCharacteristics}
                                            />
            : <div className="center-text wide">
                {model.map((obj1, index) => 
                    <div key={"section-" + index}>
                        <h2>{obj1['1st dimension']}</h2>
                        <div className="flex space-evenly wide">
                        {obj1['2nd dimensions'].map((obj2, index) =>
                            <DimensionCard key={"card-" + index} title={obj2["dimension"]} answered={props.answered} actionfields={obj2["action fields"]} setActiveField={props.setActiveField}/>
                        )}
                        </div>
                        <div className="divider-h"/>
                    </div>
                )}
                <button onClick={() => calculate()}>Berechnen</button>
            </div>}
        </div>
    )
}

export default AssessmentOverview