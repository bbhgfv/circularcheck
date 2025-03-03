import React from 'react';
import {getWeightOf2DDimension, getWeightOfActionField} from './Calculation'
import { sortDictDesc } from './Dictionary'
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
const ResultsTable = (props) => {
    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({contentRef });
    return (
        <div className='wide'>
            <button className='flex print center gap-10' onClick={() => reactToPrintFn()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="tooltip-icon" viewBox="0 0 512 512">
                    <path d="M64 464l48 0 0 48-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 304l-48 0 0-144-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z"/>
                </svg>
                <p>Export as PDF</p>
            </button>
            <div ref={contentRef} className="flex wide column" >   
                <h2>Handlungsfelder</h2>
                <div className="table flex column">
                    <div className="flex bold table-row ">
                        <div className="result-table-entry center-text">Priorität</div>
                        <div className="result-table-entry center-text">Name</div>
                        <div className="result-table-entry center-text">Ist-Reifegrad</div>
                        <div className="result-table-entry center-text">Soll-Reifegrad</div>
                        <div className="result-table-entry center-text">Gewicht</div>
                        <div className="result-table-entry center-text">Gewichtete Lücke</div>
                    </div>
                    {sortDictDesc(props.resultsAF).map((element, index) =>  {
                        new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3})
                        return (
                            <div className="flex table-row" key={"row-" + index}>
                                <div className="result-table-entry center-text">{index+1}</div>
                                <div className="result-table-entry center-text">{Object.entries(element)[0][0]}</div>
                                <div className="result-table-entry center-text">{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2}).format(Object.entries(element)[0][1][0])}</div>
                                <div className="result-table-entry center-text">{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2}).format(Object.entries(element)[0][1][1])}</div>
                                <div className="result-table-entry center-text">{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2}).format(getWeightOfActionField([Object.entries(element)[0][0]]))}</div>
                                <div className="result-table-entry center-text">{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2}).format(Object.entries(element)[0][1][2])}</div>
                            </div>
                        )
                    }
                        
                    )}
                </div>
                <div className="divider-h"></div>
                <h2>Business Model Canvas Dimensionen</h2>
                <div className="table flex column">
                    <div className="flex bold table-row ">
                        <div className="result-table-entry center-text">Priorität</div>
                        <div className="result-table-entry center-text">Name</div>
                        <div className="result-table-entry center-text">Ist-Reifegrad</div>
                        <div className="result-table-entry center-text">Soll-Reifegrad</div>
                        <div className="result-table-entry center-text">Gewicht</div>
                        <div className="result-table-entry center-text">Gewichtete Lücke</div>
                    </div>
                    {sortDictDesc(props.resultsLD).map((element, index) =>  {
                        new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3})
                        return (
                            <div className="flex table-row" key={"row-" + index}>
                                <div className="result-table-entry center-text">{index+1}</div>
                                <div className="result-table-entry center-text">{Object.entries(element)[0][0]}</div>
                                <div className="result-table-entry center-text">{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2}).format(Object.entries(element)[0][1][0])}</div>
                                <div className="result-table-entry center-text">{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2}).format(Object.entries(element)[0][1][1])}</div>
                                <div className="result-table-entry center-text">{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2}).format(getWeightOf2DDimension(Object.entries(element)[0][0]))}</div>
                                <div className="result-table-entry center-text">{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2}).format(Object.entries(element)[0][1][2])}</div>
                            </div>
                        )
                    }
                        
                    )}
                </div>
            </div>
        </div>
    )

}

export default ResultsTable;