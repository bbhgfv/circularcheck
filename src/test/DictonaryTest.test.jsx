import {describe, expect, it} from "vitest";
import {create2DDimensionToWeightDiffDict, getValue, sortDictDesc, createActionFieldToWeightDiffDict, getMeasurementActionFieldPair, createActionElementToChoiceDict} from "../Dictionary";
import model from '../resources/model.json'
import maturity_elements from './resources/maturity_elements.json'

describe("create2DDimensionToWeightDiffDict  test", () =>{
    it("Test 1", ()=>{
        const current = [[3, 1, 2],[1,3,1,3],[3,3,3],[3,3.66],[2,4,4],[0,0,0,0],[3,3,3],[2,3,3],[2,2,3],[5,3,4,5],[3,3.66,4,2.33,3],[5,3],[2,2,5],[4,1,5,3,2],[2,2,4],[1,3,2.33,5],[5,3],[3,1],[5,5,1]];
        const target = [[5,5,5],[5,5,5,3],[5,5,3],[3,5],[5,2,5],[0,0,0,0],[5,5,5],[5,5,5],[5,5,5],[5,5,5,5],[5,5,5,5,5],[1,5],[5,5,5],[5,5,5,5,5],[5,5,5],[1,5,5,3],[3,3],[5,5],[5,5,5  ]];
        const actual = create2DDimensionToWeightDiffDict(current,target);
        const expected = [
            { "Kundensegment": [2.2, 5, 0.161045752] },
            { "Kanäle": [2.322580645, 4.503225806, 0.176732026] },
            { "Kundenbeziehungen": [3.264, 3.8, 0.024873203] },
            { "Werteversprechen": [3.5, 3.5, 0] },
            { "Schlüsselressourcen": [3.189088643, 4.707479224, 0.358260784] },
            { "Schlüsselaktivitäten": [2.952521008, 5, 0.318496732] },
            { "Schlüsselpartner": [2.728061497, 4.173796791, 0.17670098] },
            { "Einkommensstrom": [3.030414747, 4.023041475, 0.140784314] },
            { "Kostenstruktur": [3.88, 5, 0.063686275] }
        ];
        expect(actual.length).toEqual(expected.length);
        for(let i=0; i<actual.length;i++){
            expect(Object.entries(actual[i])[0][0]).toEqual(Object.entries(expected[i])[0][0]);
            expect(Object.entries(actual[i])[0][1][0]).toBeCloseTo(Object.entries(expected[i])[0][1][0])
            expect(Object.entries(actual[i])[0][1][1]).toBeCloseTo(Object.entries(expected[i])[0][1][1])
            expect(Object.entries(actual[i])[0][1][2]).toBeCloseTo(Object.entries(expected[i])[0][1][2])
        }
    })
})

describe("createActionFieldToWeightDiffDict  test", () =>{
    it("Test 1", ()=>{
        const current = [[3, 1, 2],[1,3,1,3],[3,3,3],[3,3.66],[2,4,4],[0,0,0,0],[3,3,3],[2,3,3],[2,2,3],[5,3,4,5],[3,3.66,4,2.33,3],[5,3],[2,2,5],[4,1,5,3,2],[2,2,4],[1,3,2.33,5],[5,3],[3,1],[5,5,1]];
        const target = [[5,5,5],[5,5,5,3],[5,5,3],[3,5],[5,2,5],[0,0,0,0],[5,5,5],[5,5,5],[5,5,5],[5,5,5,5],[5,5,5,5,5],[1,5],[5,5,5],[5,5,5,5,5],[5,5,5],[1,5,5,3],[3,3],[5,5],[5,5,5  ]];
        const actual = createActionFieldToWeightDiffDict(current,target);
        const expected = [
            { "Zielgruppendefinition": [2.2, 5, 0.161045752] },
            { "Distributionskanäle": [1.88, 4.44, 0.125490196] },
            { "Kundenkommunikation": [3, 4.6, 0.05124183] },
            { "Kundenkontakt": [3.264, 3.8, 0.024873203] },
            { "Produktnutzen & Lebenszyklus": [3.5, 3.5, 0] },
            { "Compliance (Recht & Regulatorik)": [0, 0, 0] },
            { "physische Hauptstoffe": [3, 5, 0.139869281] },
            { "physische Hilfsstoffe": [2.6, 5, 0.058039216] },
            { "physische Betriebsstoffe": [2.2, 5, 0.07503268] },
            { "physisches Naturkapital": [4.1, 5, 0.028235294] },
            { "humanistische Ressourcen": [3.1655, 5, 0.074339216] },
            { "finanzielle Ressourcen": [3.8, 3.4, -0.017254902] },
            { "Produktentwicklung": [3, 5, 0.163398693] },
            { "Herstellung/Produktion": [2.9, 5, 0.155098039] },
            { "Materiallieferanten": [2.6, 5, 0.131764706] },
            { "Partnernetzwerk": [2.8325, 3.5, 0.044936275] },
            { "Verkauf von Produkten/Dienstleistungen": [3.9, 3, -0.062352941] },
            { "Verwendung von rückläufigen Strömen": [2.2, 5, 0.203137255] },
            { "Kostenstruktur durch Kreislaufwirtschaft": [3.88, 5, 0.063686275] }
        ];
        expect(actual.length).toEqual(expected.length);
        for(let i=0; i<actual.length;i++){
            expect(Object.entries(actual[i])[0][0]).toEqual(Object.entries(expected[i])[0][0]);
            expect(Object.entries(actual[i])[0][1][0]).toBeCloseTo(Object.entries(expected[i])[0][1][0])
            expect(Object.entries(actual[i])[0][1][1]).toBeCloseTo(Object.entries(expected[i])[0][1][1])
            expect(Object.entries(actual[i])[0][1][2]).toBeCloseTo(Object.entries(expected[i])[0][1][2])
        }
    })
})

describe("getValue  test", () =>{
    it("Test 1", ()=>{
        const current = [[3, 1, 2],[1,3,1,3],[3,3,3],[3,3.66],[2,4,4],[0,0,0,0],[3,3,3],[2,3,3],[2,2,3],[5,3,4,5],[3,3.66,4,2.33,3],[5,3],[2,2,5],[4,1,5,3,2],[2,2,4],[1,3,2.33,5],[5,3],[3,1],[5,5,1]];
        const target = [[5,5,5],[5,5,5,3],[5,5,3],[3,5],[5,2,5],[0,0,0,0],[5,5,5],[5,5,5],[5,5,5],[5,5,5,5],[5,5,5,5,5],[1,5],[5,5,5],[5,5,5,5,5],[5,5,5],[1,5,5,3],[3,3],[5,5],[5,5,5  ]];
        const dict = create2DDimensionToWeightDiffDict(current,target);
        expect(getValue(dict,"Kundensegment")[0]).toBeCloseTo(2.2);
        expect(getValue(dict,"Kundensegment")[1]).toBeCloseTo(5);
        expect(getValue(dict,"Kundensegment")[2]).toBeCloseTo(0.161045752);
    })
    it("Test 2", ()=>{
        const current = [[3, 1, 2],[1,3,1,3],[3,3,3],[3,3.66],[2,4,4],[0,0,0,0],[3,3,3],[2,3,3],[2,2,3],[5,3,4,5],[3,3.66,4,2.33,3],[5,3],[2,2,5],[4,1,5,3,2],[2,2,4],[1,3,2.33,5],[5,3],[3,1],[5,5,1]];
        const target = [[5,5,5],[5,5,5,3],[5,5,3],[3,5],[5,2,5],[0,0,0,0],[5,5,5],[5,5,5],[5,5,5],[5,5,5,5],[5,5,5,5,5],[1,5],[5,5,5],[5,5,5,5,5],[5,5,5],[1,5,5,3],[3,3],[5,5],[5,5,5  ]];
        const dict = create2DDimensionToWeightDiffDict(current,target);
        expect(getValue(dict,"Schlüsselressourcen")[0]).toBeCloseTo(3.189088643);
        expect(getValue(dict,"Schlüsselressourcen")[1]).toBeCloseTo(4.707479224);
        expect(getValue(dict,"Schlüsselressourcen")[2]).toBeCloseTo(0.358260784);
    })
})


describe("sortDictDesc  test", () =>{
    it("Test 1", ()=>{
        const current = [[3, 1, 2],[1,3,1,3],[3,3,3],[3,3.66],[2,4,4],[0,0,0,0],[3,3,3],[2,3,3],[2,2,3],[5,3,4,5],[3,3.66,4,2.33,3],[5,3],[2,2,5],[4,1,5,3,2],[2,2,4],[1,3,2.33,5],[5,3],[3,1],[5,5,1]];
        const target = [[5,5,5],[5,5,5,3],[5,5,3],[3,5],[5,2,5],[0,0,0,0],[5,5,5],[5,5,5],[5,5,5],[5,5,5,5],[5,5,5,5,5],[1,5],[5,5,5],[5,5,5,5,5],[5,5,5],[1,5,5,3],[3,3],[5,5],[5,5,5  ]];
        const actual = sortDictDesc(create2DDimensionToWeightDiffDict(current,target));
        const expected = 
        [
            { "Schlüsselressourcen": [3.189088643, 4.707479224, 0.358260784] },
            { "Schlüsselaktivitäten": [2.952521008, 5, 0.318496732] },
            { "Kanäle": [2.322580645, 4.503225806, 0.176732026] },
            { "Schlüsselpartner": [2.728061497, 4.173796791, 0.17670098] },
            { "Kundensegment": [2.2, 5, 0.161045752] },
            { "Einkommensstrom": [3.030414747, 4.023041475, 0.140784314] },
            { "Kostenstruktur": [3.88, 5, 0.063686275] },
            { "Kundenbeziehungen": [3.264, 3.8, 0.024873203] },
            { "Werteversprechen": [3.5, 3.5, 0] },
        ];
        expect(actual.length).toEqual(expected.length);
        for(let i=0; i<actual.length;i++){
            expect(Object.entries(actual[i])[0][0]).toEqual(Object.entries(expected[i])[0][0]);
            expect(Object.entries(actual[i])[0][1][0]).toBeCloseTo(Object.entries(expected[i])[0][1][0])
            expect(Object.entries(actual[i])[0][1][1]).toBeCloseTo(Object.entries(expected[i])[0][1][1])
            expect(Object.entries(actual[i])[0][1][2]).toBeCloseTo(Object.entries(expected[i])[0][1][2])
        }
    })

    it("Test 2", ()=>{
        const current = [[3, 1, 2],[1,3,1,3],[3,3,3],[3,3.66],[2,4,4],[0,0,0,0],[3,3,3],[2,3,3],[2,2,3],[5,3,4,5],[3,3.66,4,2.33,3],[5,3],[2,2,5],[4,1,5,3,2],[2,2,4],[1,3,2.33,5],[5,3],[3,1],[5,5,1]];
        const target = [[5,5,5],[5,5,5,3],[5,5,3],[3,5],[5,2,5],[0,0,0,0],[5,5,5],[5,5,5],[5,5,5],[5,5,5,5],[5,5,5,5,5],[1,5],[5,5,5],[5,5,5,5,5],[5,5,5],[1,5,5,3],[3,3],[5,5],[5,5,5  ]];
        const actual = sortDictDesc(createActionFieldToWeightDiffDict(current,target));
        const expected = [
            { "Verwendung von rückläufigen Strömen": [2.2, 5, 0.203137255] },
            { "Produktentwicklung": [3, 5, 0.163398693] },
            { "Zielgruppendefinition": [2.2, 5, 0.161045752] },
            { "Herstellung/Produktion": [2.9, 5, 0.155098039] },
            { "physische Hauptstoffe": [3, 5, 0.139869281] },
            { "Materiallieferanten": [2.6, 5, 0.131764706] },
            { "Distributionskanäle": [1.88, 4.44, 0.125490196] },
            { "physische Betriebsstoffe": [2.2, 5, 0.07503268] },
            { "humanistische Ressourcen": [3.1655, 5, 0.074339216] },
            { "Kostenstruktur durch Kreislaufwirtschaft": [3.88, 5, 0.063686275]},
            { "physische Hilfsstoffe": [2.6, 5, 0.058039216] },
            { "Kundenkommunikation": [3, 4.6, 0.05124183] },
            { "Partnernetzwerk": [2.8325, 3.5, 0.044936275] },
            { "physisches Naturkapital": [4.1, 5, 0.028235294] },
            { "Kundenkontakt": [3.264, 3.8, 0.024873203] },

            { "Produktnutzen & Lebenszyklus": [3.5, 3.5, 0] },
            { "Compliance (Recht & Regulatorik)": [0, 0, 0] },
            { "finanzielle Ressourcen": [3.8, 3.4, -0.017254902] },
            { "Verkauf von Produkten/Dienstleistungen": [3.9, 3, -0.062352941] },
            
           
        ];
        expect(actual.length).toEqual(expected.length);
        for(let i=0; i<actual.length;i++){
            expect(Object.entries(actual[i])[0][0]).toEqual(Object.entries(expected[i])[0][0]);
            expect(Object.entries(actual[i])[0][1][0]).toBeCloseTo(Object.entries(expected[i])[0][1][0])
            expect(Object.entries(actual[i])[0][1][1]).toBeCloseTo(Object.entries(expected[i])[0][1][1])
            expect(Object.entries(actual[i])[0][1][2]).toBeCloseTo(Object.entries(expected[i])[0][1][2])
        }
    })
})

// describe("getMeasurementActionFieldPair  test", () =>{
    
//     it("Test 1", ()=>{
//         const current = [[3, 1, 2],[1,3,1,3],[3,3,3],[3,3.66],[2,4,4],[0,0,0,0],[3,3,3],[2,3,3],[2,2,3],[5,3,4,5],[3,3.66,4,2.33,3],[5,3],[2,2,5],[4,1,5,3,2],[2,2,4],[1,3,2.33,5],[5,3],[3,1],[5,5,1]];
//         const target = [[5,5,5],[5,5,5,3],[5,5,3],[3,5],[5,2,5],[0,0,0,0],[5,5,5],[5,5,5],[5,5,5],[5,5,5,5],[5,5,5,5,5],[1,5],[5,5,5],[5,5,5,5,5],[5,5,5],[1,5,5,3],[3,3],[5,5],[5,5,5  ]];
//         const actual = getMeasurementActionFieldPair(current,target);
//         const expected = [
//             {"Anpassungsfähigkeit" : ["Produktentwicklung"]},
//             {"Aufbereitung von Betriebsstoffen":["Produktentwicklung"]},
//         ];
//         expect(actual.length).toEqual(expected.length);
//         for(let i=0; i<actual.length;i++){
//             expect(Object.entries(actual[i])[0][0]).toEqual(Object.entries(expected[i])[0][0]);
//             expect(Object.entries(actual[i])[0].length).toEqual(Object.entries(expected[i])[0].length)
//             for(let j=0;j<Object.entries(actual[i])[0].length;j++){
//                 expect(Object.entries(actual[i])[0][1][j]).toEqual(Object.entries(expected[i])[0][1][j])
//             }
//         }
//     })
// })

describe("createActionElementToChoiceDict  test", () =>{
    it("Test 1", ()=>{
        const current = [[3, 1, 2],[1,3,1,3],[3,3,3],[3,3.66],[2,4,4],[0,0,0,0],[3,3,3],[2,3,3],[2,2,3],[5,3,4,5],[3,3.66,4,2.33,3],[5,3],[2,2,5],[4,1,5,3,2],[2,2,4],[1,3,2.33,5],[5,3],[3,1],[5,5,1]];
        const actual = createActionElementToChoiceDict(current);
        const expectedcName = maturity_elements.flatMap(element =>element.elements).map(element=>element.name);
        const expectedWeight = maturity_elements.flatMap(element =>element.elements).map(element=>element.weight);
        const expectedChoice = [3, 1, 2,1,3,1,3,3,3,3,3,3.66,2,4,4,0,0,0,0,3,3,3,2,3,3,2,2,3,5,3,4,5,3,3.66,4,2.33,3,5,3,2,2,5,4,1,5,3,2,2,2,4,1,3,2.33,5,5,3,3,1,5,5,1];
        expect(actual.length).toEqual(expectedcName.length);
        expect(actual.length).toEqual(expectedChoice.length);
        expect(actual.length).toEqual(expectedWeight.length);
        for(let i=0; i<actual.length;i++){
            expect(Object.entries(actual[i])[0][0]).toEqual(expectedcName[i]);
            expect(Object.entries(actual[i])[0][1][0]).toEqual(expectedWeight[i]);
            expect(Object.entries(actual[i])[0][1][1]).toEqual(expectedChoice[i])
        }
    })
})
