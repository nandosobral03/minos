import { useState } from "react";
import style from "../styles/Explanation.module.scss";
const Explanation = (props: { explanation: string; lines: string[], active: boolean, onClicked: () => void }) => {

  return (
    <div className={style.explanation}>
      <div className={style.classContainer}>
        {props.lines.map((line, i) => {
          return (
            <pre
              onClick={() => props.onClicked()}
              className={`${style.explanationText} ${
                props.active
                  ? style.explanationActive
                  : style.explanationInactive
              }`}
              key={i}
            >
              {line}
            </pre>
          );
        })}
        <div className={style.explanationPopup}
            style={props.active ? {} : {opacity: 0, pointerEvents: "none"}} >
            <div className={style.popUpText}>
            {props.explanation}
            </div>
        
        </div>
      </div>
    </div>
    
  
  
  );
};

export default Explanation;
