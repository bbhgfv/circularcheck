import React from 'react'
import maturity_elements from './resources/maturity_elements.json'

const QuestionPopUp = (props) => {

    var maturity_elements_of_action_field;
    var action_field_index;

    function hidePopUp(target) {
        if (target === document.getElementById("questionnaire")) {
            target.scroll(0, 0);
            target.classList.toggle("hide");
        }
    }

    function changeCurrentLevel(i1, i2, value) {
        const newLevel = [...props.currentLevel]
        newLevel[i1][i2] = Number(value);
        props.setCurrentLevel(newLevel);
        updateAmountAnswered(i1)
    }

    function changeTargetLevel(i1, i2, value) {
        const newLevel = [...props.targetLevel]
        newLevel[i1][i2] = Number(value);
        props.setTargetLevel(newLevel);
        updateAmountAnswered(i1)
    }

    function updateAmountAnswered(i1) {
        var sum = 0;
        for (var i2 = 0; i2 < props.currentLevel[i1].length; i2++)
            if (props.currentLevel[i1][i2] !== -1 && props.targetLevel[i1][i2] !== -1)
                sum++;
        const newAmountAnswered = [...props.amountAnswered];
        newAmountAnswered[i1] = sum;
        props.setAmountAnswered(newAmountAnswered);
    }

    for (let obj of maturity_elements) {
        if (obj['action field'] === props.activeField) {
            maturity_elements_of_action_field = obj['elements'];
            action_field_index = maturity_elements.indexOf(obj);
        }
    }

    return (
        <div id="questionnaire" className="pop-up flex hide" onClick={(e) => hidePopUp(e.target)}>
            <div className="question-card flex center column">
                <div className="flex center wrap">
                    {
                        props.activeField ?
                        maturity_elements_of_action_field.map((obj, index1) =>
                            <div className="flex question-wrapper">
                                <div key={"element-" + index1} className="question-container flex column gap-10">
                                    <h4 className="margin-auto">{obj.name}</h4>
                                    <p className="margin-auto">{obj.description}</p>
                                    <div className="grid gap-10 center space-evenly margin-auto">
                                        <div className="level-container grid">
                                            <div className="level-header">Reifegrad</div>
                                            <div className="radio-header">Ist</div>
                                            <div className="radio-header">Ziel</div>
                                        </div>
                                        {
                                            obj.levels.map((level, index2) => 
                                                <div className="level-container grid gap-10">
                                                    <div className="level-description">{level}</div>
                                                    <input
                                                        className="radio-button" type="radio" id={"q1-l" + index2} name={"current-" + index1}
                                                        value={index2/(obj.levels.length-1)}
                                                        onChange={(e) => changeCurrentLevel(action_field_index, index1, e.target.value)}
                                                        checked={props.currentLevel[action_field_index][index1] === index2/(obj.levels.length-1)}
                                                    />
                                                    <input
                                                        className="radio-button" type="radio" id={"q1-l" + index2} name={"target-" + index1}
                                                        value={index2/(obj.levels.length-1)}
                                                        onChange={(e) => changeTargetLevel(action_field_index, index1, e.target.value)}
                                                        checked={props.targetLevel[action_field_index][index1] === index2/(obj.levels.length-1)}
                                                    />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                {index1 % 3 !== 2 ? <div className="divider-v"/> : null}
                            </div>
                        )
                        : <div/>
                    }
                </div>
                
            </div>
        </div>
    )
}

export default QuestionPopUp;