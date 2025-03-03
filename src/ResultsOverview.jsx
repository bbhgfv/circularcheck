import React from 'react'
import ResultsTable from './ResultsTable'
import RadarChart from './RadarChart';
import Measurement from './Measurement.jsx' 

const ResultsOverview = (props) => {
    return (
        <div  className='flex wide column'>
            <button className="center" onClick={() => {props.setDisplayResult("Survey")}}>Zurück zum Fragebogen</button>
            <div className = 'switch_result_buttons wide flex center'>
                <button id="table-btn" className="center" onClick={() => {props.setDisplayResult("Table")}} style={{
                    color: (props.displayResult === "Table") ? "white" : "black",
                    backgroundColor: (props.displayResult === "Table") ? "var(--ptw-blue)" : "transparent"
                }}>Tabelle</button>
                <button id="chart-btn" className="center" onClick={() => {props.setDisplayResult("Chart")}} style={{
                    color: (props.displayResult === "Chart") ? "white" : "black",
                    backgroundColor: (props.displayResult === "Chart") ? "var(--ptw-blue)" : "transparent"
                }}>Diagramm</button>
                <button id="measure-btn" className="center" onClick={() => {props.setDisplayResult("Measure")}} style={{
                    color: (props.displayResult === "Measure") ? "white" : "black",
                    backgroundColor: (props.displayResult === "Measure") ? "var(--ptw-blue)" : "transparent"
                }}>Maßnahmen</button>  
            </div>
            {
                props.displayResult === "Table" ? <ResultsTable resultsAF={props.resultsAF} resultsLD={props.resultsLD}/> :
                props.displayResult === "Chart" ? <RadarChart resultsAF={props.resultsAF} resultsLD={props.resultsLD} resultsChoice={props.resultsChoice}/> :
                props.displayResult === "Measure" ? <Measurement resultsMeasure={props.resultsMeasure} setActivePage={props.setActivePage} setActiveCharacteristics={props.setActiveCharacteristics} activeCharacteristics={props.activeCharacteristics}/>
                : null
            }          
            <div className="divider-h"/>
        </div>
    )
}

export default ResultsOverview;