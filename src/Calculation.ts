import model from './resources/model.json'
import maturity_elements from './resources/maturity_elements.json'

export const calculateWeightDiff = (currentRG: number, targetRG:number, weight:number ) :number=> {
    return (targetRG-currentRG)*weight;
};
export const calculateRGFirstDimentionBaseOnActionField = (actionFieldRG : Array<number>, actionFIeldWeight: Array<number>) : number =>{
    if(actionFieldRG.length != actionFIeldWeight.length){
        throw new Error('invalid input');

    }
    let sumOfWeight: number = 0;
    let sopOfElement: number =0;
    for (let i = 0; i < actionFIeldWeight.length; i++) {
        sumOfWeight += actionFIeldWeight[i];
        let productOfWeightAndRG = actionFieldRG[i]*actionFIeldWeight[i];
        sopOfElement += productOfWeightAndRG;
    }
    return sopOfElement/sumOfWeight;
}

export const calculateRG = (elementRG : Array<number>, elementWeight: Array<number>) : number =>{
    if(elementRG.length != elementWeight.length){
        throw new Error('invalid input');

    }
    let sum: number = 0;
    for (let i = 0; i < elementWeight.length; i++) {
        sum = elementRG[i]*elementWeight[i];
    }
    return sum;
}

export const getLevel = (stringLevel : string) : number =>{
    return parseInt(stringLevel.replace("Level ", ""), 10);
}

export const calculateRGOfActionField = (actionField : string, userChoiceOfLevel : Array<number>) : number =>{
    for(const actionFieldInfo of maturity_elements){
        if(actionFieldInfo["action field"]!=actionField){
            continue;
        }
        else{
            let result : number =0;
            if(actionFieldInfo["elements"].length != userChoiceOfLevel.length){
                throw new Error('invalid input');
        
            }
            for(let i=0;i<actionFieldInfo["elements"].length;i++){
                result += userChoiceOfLevel[i]*actionFieldInfo["elements"][i]["weight"];
            }
            return result;
        }
    }
    throw new Error('No such action field');
}

export const calculateRGOfAllActionField = (userChoiceOfLevel : Array<Array<number>>) : Array<number> =>{
    let result: number[] = Array(maturity_elements.length).fill(0);
    if(maturity_elements.length != userChoiceOfLevel.length){
        throw new Error('invalid input');

    }
    for(let i=0;i<userChoiceOfLevel.length;i++){
        result[i]= calculateRGOfActionField(maturity_elements[i]["action field"],userChoiceOfLevel[i]);
    }
    return result;
}

export const getAll2ndDimensionName = (): Array<string> =>{
    return model.flatMap(element => element["2nd dimensions"]).flatMap(element => element["dimension"]);
    
}

export const getActionFieldOfA2ndDimension = (name: string) : Array<string> =>{
    return model.flatMap(element => element["2nd dimensions"]).filter(element => element["dimension"] == name).flatMap(element => element["action fields"]);
} 

export const getIndexOfActionField = (name : string):number =>{
    for(let i=0;i<maturity_elements.length;i++){
        if(maturity_elements[i]["action field"]==name){
            return i;
        }
    }
    throw new Error('No such action field');
}

export const getSumOfWeightOfActionField = () : number => {
    return maturity_elements.map(element =>element["weight"]).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

export const getWeightOfActionField = (actionFields : Array<string>) : Array<number> =>{
    return maturity_elements.filter(element => actionFields.includes(element['action field'])).map(element =>element["weight"]/(getSumOfWeightOfActionField()));
}

export const calculateRGOfAll2ndDimension = (userChoiceOfLevel : Array<Array<number>>): Array<number> => {
    let all2DDimension = model.flatMap(element => element["2nd dimensions"]).map(element => element["dimension"]);
    let result :number[] = Array(all2DDimension.length).fill(0);
    for(let i=0;i<all2DDimension.length;i++){
        const actionField = getActionFieldOfA2ndDimension(all2DDimension[i]);
        let actionFieldRG : number[] = Array(actionField.length).fill(0);
        for(let j =0;j<actionField.length;j++){
            actionFieldRG[j] = calculateRGOfActionField(actionField[j],userChoiceOfLevel[getIndexOfActionField(actionField[j])]);
        }
        const weightOfActionField =  getWeightOfActionField(actionField);
        result[i] = calculateRGFirstDimentionBaseOnActionField(actionFieldRG,weightOfActionField);
    }
    return result;
}

export const calculateWeightDiffOfAllActionField = (currentUserChoice: Array<Array<number>>, targetedUserChoice :Array<Array<number>>) : Array<number> =>{
    let currentActionFieldRG = calculateRGOfAllActionField(currentUserChoice);
    let targetedActionFieldRG = calculateRGOfAllActionField(targetedUserChoice);
    let weightOfActionField = maturity_elements.map(element =>element["weight"]/(getSumOfWeightOfActionField()));
    if(!(currentActionFieldRG.length == targetedActionFieldRG.length && currentActionFieldRG.length == weightOfActionField.length)){
        throw new Error('Dimension error');
    }
    let result : number[] = Array(weightOfActionField.length).fill(0)
    for(let i=0;i<result.length;i++){
        result[i] = calculateWeightDiff(currentActionFieldRG[i],targetedActionFieldRG[i],weightOfActionField[i]);
    }
    return result;
}


export const getWeightOf2DDimension = (name : string) : number =>{
    let actionFIeldWeight = getWeightOfActionField(getActionFieldOfA2ndDimension(name));
    return actionFIeldWeight.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}
export const calculateWeightDiffOfAll2DDimension = (currentUserChoice: Array<Array<number>>, targetedUserChoice :Array<Array<number>>) : Array<number> =>{
    let current2DDimensionRG = calculateRGOfAll2ndDimension(currentUserChoice);
    let targeted2DDimensionRG = calculateRGOfAll2ndDimension(targetedUserChoice);
    let weightOf2DDimension : number[]= Array(current2DDimensionRG.length).fill(0);
    if(!(current2DDimensionRG.length == targeted2DDimensionRG.length && current2DDimensionRG.length == weightOf2DDimension.length)){
        throw new Error('Dimension error');
    }
    const listOf2DDimension = model.flatMap(element => element["2nd dimensions"]).map(element=>element["dimension"])
    for(let i=0;i<weightOf2DDimension.length;i++){
        weightOf2DDimension[i] = getWeightOf2DDimension(listOf2DDimension[i])
    }
    let result : number[] = Array(weightOf2DDimension.length).fill(0)
    for(let i=0;i<result.length;i++){
        result[i] = calculateWeightDiff(current2DDimensionRG[i],targeted2DDimensionRG[i],weightOf2DDimension[i]);
    }
    return result;
}
