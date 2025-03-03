import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import morphology from './resources/morphology.json';
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
const MorphologyOverview = (props) => {
    const contentRef = useRef(null);
    const handlePrint = useReactToPrint({
        contentRef
    });

    function isActive(i1, i2, i3, i4, i5) {
        return props.activeCharacteristics[i1][i2][i3][i4][i5];
    }

    function toggleCharacteristic(i1, i2, i3, i4, i5) {
        const newActiveCharacteristics = [...props.activeCharacteristics];
        newActiveCharacteristics[i1][i2][i3][i4][i5] = !newActiveCharacteristics[i1][i2][i3][i4][i5];
        props.setActiveCharacteristics(newActiveCharacteristics);
    }
    
    return (
        <div>
            <div className = 'switch_result_buttons wide flex center' style={{height: "64px", boxSizing: "border-box"}}>
                <button id="table-btn" className="wide" onClick={() => {props.setActivePage("Assessment")}} style={{width: "50%", height: "100%"}}>
                    Zurück zum Fragebogen
                </button>
                <button className='flex print center gap-10' style={{width: "50%", height: "100%"}} onClick={() => handlePrint()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="tooltip-icon" viewBox="0 0 512 512">
                        <path d="M64 464l48 0 0 48-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 304l-48 0 0-144-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z"/>
                    </svg>
                    <p>Export as PDF</p>
                </button>
            </div>
            <div className="morphology-overview">
                {
                 morphology.map((dim1, i1) => 
                    <Collapsible transitionTime="250" trigger={
                        <div className="flex space-between">
                            <div>{dim1.name}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="tooltip-icon" viewBox="0 0 512 512">
                                <path fill="#ffffff" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                            </svg>
                        </div>
                    }>
                        {   
                            <div className="dim1-content" >
                                {
                                    dim1['lower dimensions'].map((dim2, i2) =>
                                        <div className="dim-container" >
                                            <div className="dim-title title-1">
                                                <div>{dim2.name}</div>
                                            </div>
                                            <div className="dim-content">
                                                {
                                                    dim2['lower dimensions'].map((dim3, i3) => 
                                                        <div className="dim-container">
                                                            <div className="dim-title title-2">
                                                                <div>{dim3.name}</div>
                                                            </div>
                                                            <div className="wide tall">
                                                                {
                                                                    dim3['lower dimensions'].map((dim4, i4) => 
                                                                        <div className="dim-container">
                                                                            <div className="dim-title title-3">
                                                                                <div>{dim4.name}</div>
                                                                            </div>
                                                                            <div className="dim-content flex">
                                                                                {
                                                                                    dim4.characteristics.map((c, i5) => 
                                                                                        <div className={isActive(i1, i2, i3, i4, i5) ? "dim-title characteristic active bold" : "dim-title characteristic inactive"}
                                                                                        style={dim4.characteristics.length < 5 ? {width: 100/dim4.characteristics.length + "%"} : {}}
                                                                                        onClick={() => toggleCharacteristic(i1, i2, i3, i4, i5)}>
                                                                                            <div>{c[1]}</div>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        
                                    )
                                }
                            </div>
                        }
                    </Collapsible>
                 )
                }
            </div>
            <div ref={contentRef} className="morphology-overview-print">
                {
                 morphology.map((dim1, i1) => 
                    <div>
                        {   
                            <div className="dim1-content" >
                                {
                                    dim1['lower dimensions'].map((dim2, i2) =>
                                        <div className="dim-container" >
                                            <div className="dim-content-print">
                                                {
                                                    dim2['lower dimensions'].map((dim3, i3) => 
                                                        <div className="dim-container">
                                                            <div className="wide tall">
                                                                {
                                                                    dim3['lower dimensions'].map((dim4, i4) => 
                                                                        <div className="dim-container">
                                                                            <div className="dim-title title-3">
                                                                                <div>{dim4.name}</div>
                                                                            </div>
                                                                            <div className="dim-content-print flex">
                                                                                {
                                                                                    dim4.characteristics.map((c, i5) => 
                                                                                        <div className={isActive(i1, i2, i3, i4, i5) ? "dim-title characteristic-print active bold" : "dim-title characteristic-print inactive"}
                                                                                        style={dim4.characteristics.length < 5 ? {width: 100/dim4.characteristics.length + "%"} : {}}
                                                                                        onClick={() => toggleCharacteristic(i1, i2, i3, i4, i5)}>
                                                                                            <div>{c}</div>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        
                                    )
                                }
                            </div>
                        }
                    </div>
                 )
                }
            </div>
        </div>
      
    )
}

export default MorphologyOverview;