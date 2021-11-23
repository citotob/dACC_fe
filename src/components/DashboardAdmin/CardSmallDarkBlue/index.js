import React from "react";

// import style
import style from "./style.module.css";

function CardSmall(props) {
  return (
    <div className={style.cardSmallContainer}>
      <span className={style.cardTitle}>{props.title}</span>
      <div className={style.cardSmallInfo}>
        <div>{props.amount}</div>
        <div className={style.iconContainer}>
          <img
            alt="icon"
            src={`${props.icon}`}
            className={`${style.icon}`}
          ></img>
        </div>
      </div>
    </div>
  );
}

export default CardSmall;
