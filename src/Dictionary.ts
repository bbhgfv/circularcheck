import {calculateWeightDiffOfAll2DDimension, calculateWeightDiffOfAllActionField,calculateRGOfAll2ndDimension, calculateRGOfAllActionField} from "./Calculation"
import model from './resources/model.json'
import maturity_elements from './resources/maturity_elements.json'
import {getMeasureBaseOnActionFields, getActionField} from './Measurement'

export const create2DDimensionToWeightDiffDict = (currentUserChoice: Array<Array<number>>, targetedUserChoice :Array<Array<number>>) : Array<Record<string,Array<number>>>=>{
    const listOf2DDimension = model.flatMap(element => element["2nd dimensions"]).map(element=>element["dimension"]);
    const listOfWeightDiff = calculateWeightDiffOfAll2DDimension(currentUserChoice,targetedUserChoice);
    const listOfCurrentRG = calculateRGOfAll2ndDimension(currentUserChoice);
    const listOfTargetRG = calculateRGOfAll2ndDimension(targetedUserChoice);
    if(!(listOf2DDimension.length==listOfWeightDiff.length && listOfWeightDiff.length == listOfCurrentRG.length && listOfCurrentRG.length == listOfTargetRG.length)){
        throw new Error("Something wrong");
    }
    let result = new Array<Record<string,Array<number>>>(listOf2DDimension.length);
    for(let i=0;i<listOf2DDimension.length;i++){
        let a = listOf2DDimension[i];
        let b = new Array<number>(3);
        b[0] = listOfCurrentRG[i];
        b[1] = listOfTargetRG[i];
        b[2]=listOfWeightDiff[i];
        result[i] = {[a] :b };
    }
    return result;
}

export const createActionFieldToWeightDiffDict = (currentUserChoice: Array<Array<number>>, targetedUserChoice :Array<Array<number>>) : Array<Record<string,Array<number>>> =>{
    const listOfActionField = maturity_elements.map(element => element["action field"]);
    const listOfWeightDiff = calculateWeightDiffOfAllActionField(currentUserChoice,targetedUserChoice);
    const listOfCurrentRG = calculateRGOfAllActionField(currentUserChoice);
    const listOfTargetRG = calculateRGOfAllActionField(targetedUserChoice);
    if(!(listOfActionField.length==listOfWeightDiff.length && listOfWeightDiff.length == listOfCurrentRG.length && listOfCurrentRG.length == listOfTargetRG.length)){
        throw new Error("Something wrong");
    }
    let result = new Array<Record<string,Array<number>>>(listOfActionField.length);
    for(let i=0;i<listOfActionField.length;i++){
        let a = listOfActionField[i];
        let b = new Array<number>(3);
        b[0] = listOfCurrentRG[i];
        b[1] = listOfTargetRG[i];
        b[2]=listOfWeightDiff[i];
        result[i] = {[a] :b };
    }
    return result;
}

export const sortDictDesc = (before :Array<Record<string,Array<number>>>) =>{
    return before.sort(
        (a,b)=>{
            const valueA = Object.values(a)[0][2];
            const valueB = Object.values(b)[0][2];
            return valueB - valueA;
        }
    )
}

export const getValue = (dict : Array<Record<string,object>> ,name:string) : object =>{
    for(let i=0;i<dict.length;i++){
        if(Object.entries(dict[i])[0][0] == name){
            return Object.entries(dict[i])[0][1];
        }
    }
    throw new Error("No such Key: " + name)
}

export const getMeasurementActionFieldPair = (currentUserChoice: Array<Array<number>>, targetedUserChoice :Array<Array<number>>) : Array<Record<string,Array<string>>> =>{
    let actionFieldList = sortDictDesc( createActionFieldToWeightDiffDict(currentUserChoice,targetedUserChoice) );
    const top3AFList = ([actionFieldList[0],actionFieldList[1],actionFieldList[2]]).map(element => Object.entries(element)[0][0]);
    const measurement = getMeasureBaseOnActionFields(top3AFList);
    let result = new Array<Record<string,Array<string>>>(measurement.length);
    for(let i=0;i<result.length;i++){
        let a = measurement[i];
        let b = getActionField(a,top3AFList);
        result[i] = {[a]: b}
    }
    return result;
}

export const createActionElementToChoiceDict = (currentUserChoice: Array<Array<number>>) : Array<Record<string,Array<number>>> =>{
    const listOfElementChoice : Array<number> = currentUserChoice.flat();
    const listOfElementName : Array<string> = maturity_elements.flatMap(element =>element.elements).map(element=>element.name);
    const listOfElementWeight : Array<number> = maturity_elements.flatMap(element =>element.elements).map(element=>element.weight);
    if(!(listOfElementChoice.length==listOfElementName.length && listOfElementName.length == listOfElementWeight.length)){
        throw new Error("Something wrong");
    }
    let result = new Array<Record<string,Array<number>>>(listOfElementChoice.length);
    for(let i=0;i<result.length;i++){
        let a = listOfElementName[i];
        let b = new Array<number>(2);
        b[0] = listOfElementWeight[i];
        b[1] = listOfElementChoice[i];
        result[i] = {[a]: b}
    }
    return result;
}

