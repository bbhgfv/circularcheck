/* This component is the white square that contains all the action fields of a dimension, in the maturity assessment. */

import React from 'react';
import ActionField from './ActionField';
import maturity_elements from './resources/maturity_elements.json'
import {Tooltip as ReactTooltip} from 'react-tooltip';

const InfoCard = (props) => {

    function getDescription(title) {
      for(var element of maturity_elements) {
        if (element["action field"] === title)
          return element["description"];
      }
    }

    return(
      <div className="Info-card">
        <div className="flex center gap-10">
          <h3>{props.title}</h3>
        </div>
        <div className="action-field-container">
          {props.actionfields.map((field, index) =>
            <ActionField key={'field-' + index} title={field} setActiveField={props.setActiveField} answered={props.answered}/>
          )}
        </div>
        {props.actionfields.map((field, index) =>
            <ReactTooltip
              id={"info-" + field}
              place="bottom"
              variant="info"
              content={getDescription(field)}
              key={"info-" + field}
              className="info-tooltip"
            />
          )}
      </div>
    )
}

export default InfoCard;