import { useState } from "react";
import style from "../styles/Explanation.module.scss";
const Explanation = (props: { lines: string[] }) => {

  return (
    <div className={style.explanation}>
      <div className={style.classContainer}>
        {props.lines.map((line, i) => {
          return (
            <pre
              className={`${style.explanationText} ${style.noExplanation}`} key={i}>
              {line}
            </pre>
          );
        })}
      </div>
    </div>
    
  
  
  );
};

export default Explanation;
