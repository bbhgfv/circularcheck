import {describe, expect, it} from "vitest";
import { getDescription, getActionField,getMeasureBaseOnActionFields} from "../Measurement";

describe("getDescription test", () =>{
    it("Test 1", ()=>{
        const names = ["Abfallaufkommen reduzieren"];
        const expected = ["Verringern Sie das Abfallaufkommen und die damit verbundenen stofflichen und energetischen Aufwände durch eine optimierte Kaskadennutzung."];
        const actual = getDescription(names);
        expect(actual.length).toEqual(expected.length)
        for(let i=0;i<actual.length;i++){
            expect(actual[i]).toEqual(expected[i]);
        }
    })
    it("Test 2", ()=>{
        const names = ["Abfallaufkommen reduzieren","Abwärmenutzung"];
        const expected = ["Verringern Sie das Abfallaufkommen und die damit verbundenen stofflichen und energetischen Aufwände durch eine optimierte Kaskadennutzung.", "Reduzieren Sie Abstrahlverluste durch bessere Isolierung und nutzen Sie Abwärme effizient in anderen Prozessschritten oder zur Raumwärme."];
        const actual = getDescription(names);
        expect(actual.length).toEqual(expected.length)
        for(let i=0;i<actual.length;i++){
            expect(actual[i]).toEqual(expected[i]);
        }
    })
})

describe("getActionField test", () =>{
    it("Test 1", ()=>{
        const expected = ["Herstellung/Produktion"];
        const actual = getActionField("Abfallaufkommen reduzieren",["Herstellung/Produktion"]);
        expect(actual.length).toEqual(expected.length)
        for(let i=0;i<actual.length;i++){
            expect(actual[i]).toEqual(expected[i]);
        }
    })
    it("Test 2", ()=>{
        const expected = ["physisches Naturkapital"];
        const actual = getActionField("Abwärmenutzung",["physisches Naturkapital"]);
        expect(actual.length).toEqual(expected.length)
        for(let i=0;i<actual.length;i++){
            expect(actual[i]).toEqual(expected[i]);
        }
    })

    it("Test 3", ()=>{
        const expected = [];
        const actual = getActionField("Alternative Kraftstoffe und Technologien",[]);
        expect(actual.length).toEqual(expected.length)
        for(let i=0;i<actual.length;i++){
            expect(actual[i]).toEqual(expected[i]);
        }
    })
})

// describe("getMeasureBaseOnActionFields test", () =>{
//     it("Test 1", ()=>{
//         const expected = ["Abwärmenutzung","Alternativen prüfen"].sort();
//         const actual = getMeasureBaseOnActionFields(["physisches Naturkapital"]);
//         expect(actual.length).toEqual(expected.length)
//         for(let i=0;i<actual.length;i++){
//             expect(actual[i]).toEqual(expected[i]);
//         }
//     })
//     it("Test 2", ()=>{
//         const expected = ["Abfallaufkommen reduzieren","Aufarbeitung und Wiederverkauf"].sort();
//         const actual = getMeasureBaseOnActionFields(["Herstellung/Produktion"]);
//         expect(actual.length).toEqual(expected.length)
//         for(let i=0;i<actual.length;i++){
//             expect(actual[i]).toEqual(expected[i]);
//         }
//     })

//     it("Test 3", ()=>{
//         const expected = ["Anpassungsfähigkeit","Aufbereitung von Betriebsstoffen","Abwärmenutzung","Alternativen prüfen","Abfallaufkommen reduzieren","Aufarbeitung und Wiederverkauf"].sort();
//         const actual = getMeasureBaseOnActionFields(["Produktentwicklung","physisches Naturkapital","Herstellung/Produktion"]);
//         expect(actual.length).toEqual(expected.length)
//         for(let i=0;i<actual.length;i++){
//             expect(actual[i]).toEqual(expected[i]);
//         }
//     })
// })