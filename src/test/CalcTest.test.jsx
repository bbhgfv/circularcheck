import {describe, expect, it} from "vitest";
import { calculateRG,calculateRGFirstDimentionBaseOnActionField,calculateWeightDiff,getLevel, getAll2ndDimensionName, getActionFieldOfA2ndDimension, getWeightOfActionField, getSumOfWeightOfActionField, getWeightOf2DDimension, calculateWeightDiffOfAll2DDimension, calculateWeightDiffOfAllActionField, calculateRGOfAllActionField, getIndexOfActionField, calculateRGOfAll2ndDimension} from "../Calculation";

describe("CalculateWeightDiff test", () =>{
    it("Test 1", ()=>{
        expect(calculateWeightDiff(2.2,5,88/1530)).toBeCloseTo(0.161045752)
    })
    it("Test 2", ()=>{
        expect(calculateWeightDiff(2.322580645,4.503225806,124/1530)).toBeCloseTo(0.176732026)
    })
})

describe("calculateRGFirstDimentionBaseOnActionField test", () =>{
    it("Test 1", ()=>{
        const istElement = [3,2.6,2.2,4.1,3.1655,3.8];
        const weightElement = [107/1530,37/1530,41/1530,48/1530,62/1530,66/1530];
        const ist = 3.189088643;
        expect(calculateRGFirstDimentionBaseOnActionField(istElement,weightElement)).toBeCloseTo(ist)
    })
    it("Test 2", ()=>{
        const istElement = [1.88,3];
        const weightElement = [75/1530,49/1530];
        const ist = 2.322580645;
        expect(calculateRGFirstDimentionBaseOnActionField(istElement,weightElement)).toBeCloseTo(ist)
    })
})

describe("Parse test", () =>{
    it("Test 1", ()=>{
        expect(getLevel("Level 1")).toEqual(1);
    })
    it("Test 2", ()=>{
        expect(getLevel("afdag")).toThrowError
    })
})

describe("getAll2ndDimensionName test", () =>{
    it("Test 1", ()=>{
        const expected = ["Kundensegment", "Kanäle", "Kundenbeziehungen", "Werteversprechen", "Schlüsselressourcen", "Schlüsselaktivitäten", "Schlüsselpartner", "Einkommensstrom", "Kostenstruktur"];
        expect(getAll2ndDimensionName()).toEqual(expected)
    })
})

describe("getActionFieldOfA2ndDimension test", () =>{
    it("Test 1", ()=>{
        const expected = ["Distributionskanäle", "Kundenkommunikation"] ;
        expect(getActionFieldOfA2ndDimension("Kanäle")).toEqual(expected);
    })
    it("Test 2", ()=>{
        const expected = ["Materiallieferanten", "Partnernetzwerk"]; 
        expect(getActionFieldOfA2ndDimension("Schlüsselpartner")).toEqual(expected);
    })
})

describe("getWeightOfActionField test", () =>{
    it("Test 1", ()=>{
        const expected = [88/1530, 75/1530]
        const actionFields = ["Zielgruppendefinition", "Distributionskanäle"] ;
        expect(getWeightOfActionField(actionFields)).toEqual(expected);
    })
    it("Test 2", ()=>{
        const expected = [0/1530, 37/1530]
        const actionFields = ["Compliance (Recht & Regulatorik)", "physische Hilfsstoffe"] ;
        expect(getWeightOfActionField(actionFields)).toEqual(expected);
    })
})

describe("getSumOfWeightOfActionField test", () =>{
    it("Test 1", ()=>{
        const expected = 1530
        expect(getSumOfWeightOfActionField()).toEqual(expected);
    })
})

describe("getWeightOf2DDimension  test", () =>{
    it("Test 1", ()=>{
        const expected = 8.1/100
        expect(getWeightOf2DDimension ("Kanäle")).toBeCloseTo(expected);
    })
    it("Test 1", ()=>{
        const expected = 8.1/100
        expect(getWeightOf2DDimension ("Kanäle")).toBeCloseTo(expected);
    })
})

describe("calculateWeightDiffOfAllActionField  test", () =>{
    it("Test 1", ()=>{
        const current = [[3, 1, 2],[1,3,1,3],[3,3,3],[3,3.66],[2,4,4],[0,0,0,0],[3,3,3],[2,3,3],[2,2,3],[5,3,4,5],[3,3.66,4,2.33,3],[5,3],[2,2,5],[4,1,5,3,2],[2,2,4],[1,3,2.33,5],[5,3],[3,1],[5,5,1]];
        const target = [[5,5,5],[5,5,5,3],[5,5,3],[3,5],[5,2,5],[0,0,0,0],[5,5,5],[5,5,5],[5,5,5],[5,5,5,5],[5,5,5,5,5],[1,5],[5,5,5],[5,5,5,5,5],[5,5,5],[1,5,5,3],[3,3],[5,5],[5,5,5  ]];
        const actual = calculateWeightDiffOfAllActionField(current,target);
        const expected = [0.161045752,0.125490196,0.05124183,0.024873203,0,0,0.139869281,0.058039216,0.07503268,0.028235294,0.074339216,-0.017254902,0.163398693,0.155098039,0.131764706,0.044936275,-0.062352941,0.203137255,0.063686275]
        expect(actual.length).toEqual(expected.length);
        
        for(let i=0; i<actual.length;i++){
            expect(actual[i]).toBeCloseTo(expected[i])
        }
    })
})

describe("calculateRGOfAllActionField  test", () =>{
    it("Test 1", ()=>{
        const current = [[3, 1, 2],[1,3,1,3],[3,3,3],[3,3.66],[2,4,4],[0,0,0,0],[3,3,3],[2,3,3],[2,2,3],[5,3,4,5],[3,3.66,4,2.33,3],[5,3],[2,2,5],[4,1,5,3,2],[2,2,4],[1,3,2.33,5],[5,3],[3,1],[5,5,1]];
        const actual = calculateRGOfAllActionField(current);
        const expected = [2.2,1.88,3,3.264,3.5,0,3,2.6,2.2,4.1,3.1655,3.8,3,2.9,2.6,2.8325,3.9,2.2,3.88]
        expect(actual.length).toEqual(expected.length);
        
        for(let i=0; i<actual.length;i++){
            expect(actual[i]).toBeCloseTo(expected[i]);
        }
    })
    it("Test 2", ()=>{
        const target = [[5,5,5],[5,5,5,3],[5,5,3],[3,5],[5,2,5],[0,0,0,0],[5,5,5],[5,5,5],[5,5,5],[5,5,5,5],[5,5,5,5,5],[1,5],[5,5,5],[5,5,5,5,5],[5,5,5],[1,5,5,3],[3,3],[5,5],[5,5,5  ]];
        const actual = calculateRGOfAllActionField(target);
        const expected = [5,4.44,4.6,3.8,3.5,0,5,5,5,5,5,3.4,5,5,5,3.5,3,5,5]
        expect(actual.length).toEqual(expected.length);
        
        for(let i=0; i<actual.length;i++){
            expect(actual[i]).toBeCloseTo(expected[i]);
        }
    })
})


describe("getIndexOfActionField  test", () =>{
    it("Test 1", ()=>{
        expect(getIndexOfActionField("Produktnutzen & Lebenszyklus")).toEqual(4)
    })
    it("Test 2", ()=>{
        expect(getIndexOfActionField("physische Hauptstoffe")).toEqual(6)
    })
    it("Test 3", ()=>{
        expect(getIndexOfActionField("physische Betriebsstoffe")).toEqual(8)
    })
    it("Test 4", ()=>{
        expect(getIndexOfActionField("Kostenstruktur durch Kreislaufwirtschaft")).toEqual(18)
    })
})

describe("calculateRGOfAll2ndDimension  test", () =>{
    it("Test 1", ()=>{
        const current = [[3, 1, 2],[1,3,1,3],[3,3,3],[3,3.66],[2,4,4],[0,0,0,0],[3,3,3],[2,3,3],[2,2,3],[5,3,4,5],[3,3.66,4,2.33,3],[5,3],[2,2,5],[4,1,5,3,2],[2,2,4],[1,3,2.33,5],[5,3],[3,1],[5,5,1]];
        const target = [[5,5,5],[5,5,5,3],[5,5,3],[3,5],[5,2,5],[0,0,0,0],[5,5,5],[5,5,5],[5,5,5],[5,5,5,5],[5,5,5,5,5],[1,5],[5,5,5],[5,5,5,5,5],[5,5,5],[1,5,5,3],[3,3],[5,5],[5,5,5  ]];
        const actual = calculateRGOfAll2ndDimension(current);
        const expected = [2.2,2.322580645,3.264,3.5,3.189088643,2.952521008,2.728061497,3.030414747,3.88]
        expect(actual.length).toEqual(expected.length);
        for(let i=0; i<actual.length;i++){
            expect(actual[i]).toBeCloseTo(expected[i])
        }
    })

    it("Test 1", ()=>{
        const target = [[5,5,5],[5,5,5,3],[5,5,3],[3,5],[5,2,5],[0,0,0,0],[5,5,5],[5,5,5],[5,5,5],[5,5,5,5],[5,5,5,5,5],[1,5],[5,5,5],[5,5,5,5,5],[5,5,5],[1,5,5,3],[3,3],[5,5],[5,5,5  ]];
        const actual = calculateRGOfAll2ndDimension(target);
        const expected = [5,4.503225806,3.8,3.5,4.707479224,5,4.173796791,4.023041475,5]
        expect(actual.length).toEqual(expected.length);
        for(let i=0; i<actual.length;i++){
            expect(actual[i]).toBeCloseTo(expected[i])
        }
    })
})

describe("calculateWeightDiffOfAll2DDimension  test", () =>{
    it("Test 1", ()=>{
        const current = [[3, 1, 2],[1,3,1,3],[3,3,3],[3,3.66],[2,4,4],[0,0,0,0],[3,3,3],[2,3,3],[2,2,3],[5,3,4,5],[3,3.66,4,2.33,3],[5,3],[2,2,5],[4,1,5,3,2],[2,2,4],[1,3,2.33,5],[5,3],[3,1],[5,5,1]];
        const target = [[5,5,5],[5,5,5,3],[5,5,3],[3,5],[5,2,5],[0,0,0,0],[5,5,5],[5,5,5],[5,5,5],[5,5,5,5],[5,5,5,5,5],[1,5],[5,5,5],[5,5,5,5,5],[5,5,5],[1,5,5,3],[3,3],[5,5],[5,5,5  ]];
        const actual = calculateWeightDiffOfAll2DDimension(current,target);
        const expected = [0.161045752,0.176732026,0.024873203,0,0.358260784,0.318496732,0.17670098,0.140784314,0.063686275]
        expect(actual.length).toEqual(expected.length);
        for(let i=0; i<actual.length;i++){
            expect(actual[i]).toBeCloseTo(expected[i])
        }
    })
})