import React, { useState } from 'react';
import links from './resources/measures.json';
import morphology from './resources/morphology.json';

export const getActionField = (name : string, actionField : Array<string>) : Array<string>=> {
    const result =  links.filter(element => element.measure==name);
    if(result.length==0){
        throw new Error("no such measure");
    }
    if(result.length != 1){
        throw new Error("Duplicated element in the Morphology file");
    }
    return result.map(element => element['action fields'])[0].filter(item => actionField.includes(item[0]));
};

export const getDescription = (names : Array<string>) : Array<string>=> {
    return links.filter(element => names.includes(element.measure)).map(element => element.description);
};

export const getMeasureBaseOnActionFields = (actionFields : Array<string>) : Array<string> =>{
    if(actionFields.length <= 0){
        throw new Error("Invalid input")
    }
    let result : Array<string> = [];
    for(const actionField of actionFields){
        const measure = links.filter(element => element['action fields'].includes(actionField)).map(element =>element.measure);
        result = [...new Set([...result, ...measure])];
    }
    return result.sort();
}

export const getIndexOfCharacteristic = (id: Number) : Array<Number> =>{
    for(let i1=0;i1 < morphology.length;i1++){
        for(let i2=0;i2<morphology[i1]['lower dimensions'].length;i2++){
            for(let i3=0;i3<morphology[i1]['lower dimensions'][i2]['lower dimensions'].length;i3++){
                for(let i4=0;i4<morphology[i1]['lower dimensions'][i2]['lower dimensions'][i3]['lower dimensions'].length;i4++){
                    for(let i5=0;i5<morphology[i1]['lower dimensions'][i2]['lower dimensions'][i3]['lower dimensions'][i4].characteristics.length;i5++){
                        if(morphology[i1]['lower dimensions'][i2]['lower dimensions'][i3]['lower dimensions'][i4].characteristics[i5][0]==id){
                            return [i1,i2,i3,i4,i5];
                        }
                    }
                }
            }
        }
    }
    throw Error("No such characteristics: " + id);
}