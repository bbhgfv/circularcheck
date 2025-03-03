/* The component displaying each action field in the maturity assessment. */

import React from 'react';
import maturity_elements from './resources/maturity_elements.json';

const ActionField = (props) => {

    var totalQuestions;
    var answeredQuestions = 0;
    var description;

    function showQuestions() {
        props.setActiveField(props.title);
        document.getElementById("questionnaire").classList.toggle("hide");
    }

    for (let obj of maturity_elements) {
        if (obj['action field'] === props.title) {
            totalQuestions = obj['elements'].length;
            description = obj.description;
            if (props.answered)
                answeredQuestions = props.answered[maturity_elements.indexOf(obj)];
        }
    }

    return(
        <div className="field-wrapper flex column">
            <div className="flex center gap-10">
                <p className="big">{props.title}</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="tooltip-icon" data-tooltip-id={"info-"+props.title} viewBox="0 0 512 512">
                    <path fill="#089caa" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                </svg>
            </div>
            <div className="progress-bar flex">
                <div className="answered" style={{width: (100 * answeredQuestions/totalQuestions) + "%"}}></div>
                <div className="unanswered" style={{width: (100 * (1 - answeredQuestions/totalQuestions)) + "%"}}></div>
            </div>
            <div className="flex wide space-evenly">
                <button onClick={() => showQuestions()}>Start</button>
                <p className="small">{answeredQuestions}/{totalQuestions} Fragen beantwortet</p>
            </div>
        </div>
    )
    
}

export default ActionField;