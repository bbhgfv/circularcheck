import React, { useState } from 'react';
import measures from './resources/measures.json';
import {getDescription,getIndexOfCharacteristic} from './Measurement.ts'

const Measurement = (props) => {
    const [selected, setSelected] = useState(Array.from(props.resultsMeasure, (ch) => false));

    function turnOnCharacteristic(a) {
        console.log(a);
        const newActiveCharacteristics = [...props.activeCharacteristics];
        newActiveCharacteristics[a[0]][a[1]][a[2]][a[3]][a[4]] = true;
        props.setActiveCharacteristics(newActiveCharacteristics);
    }

    function toggleMeasure(i1){
        let newSelected = [...selected];
        newSelected[i1] = !newSelected[i1];
        setSelected(newSelected);
    }

    function openMorphology()  {
        const fitMeasureName = props.resultsMeasure.map(element =>Object.entries(element)[0][0]).filter((element, index) => selected[index]);
        const fitMeasure = measures.filter(element => fitMeasureName.includes(element.measure));
        
        const characteristics = fitMeasure.map(element =>element.characteristics);
        
        characteristics.forEach(element => element.forEach(characteristic => turnOnCharacteristic(getIndexOfCharacteristic(characteristic))));
        props.setActivePage("Morphology")
    }
    return (
        <div className="flex wide column" >
            <h2>Empfohlene Handlungen</h2>
            <div className='measure-card-background flex center wrap'>
                {props.resultsMeasure.map((element,index)=>{
                    return (
                        <div className={selected[index] ?'measure-card-element active column flex': 'measure-card-element column flex'} key={index} onClick={() =>toggleMeasure(index)}>
                            <h2>{Object.entries(element)[0][0]}</h2> 
                            <p>{getDescription([Object.entries(element)[0][0]])}</p>   
                            <p><strong>Die Handlung wird wegen der Differenz in diesen Handlungsfeldern empfohlen:</strong></p>
                            <ul>
                                {Object.entries(element)[0][1].map((actionField, i) => (
                                    <li key={i}>{actionField}</li>
                                ))}
                            </ul>
                        </div>
                    )
                })}
            </div>
            <button className="center" onClick={()=>openMorphology()}>Zur Morphologie</button>
        </div>
    )

}


export default Measurement;