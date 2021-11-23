import React from "react";

function InfoText(props) {
  return (
    <div className='mb-2'>
      <p className={`font-weight-normal text-info`}>{props.text1}</p>
      {props.text2 && (
        <p className={`font-weight-normal text-info`}>{props.text2}</p>
      )}
      {props.text3 && (
        <p className={`font-weight-normal text-info`}>{props.text3}</p>
      )}
      {props.text4 && (
        <p className={`font-weight-normal text-info`}>{props.text4}</p>
      )}
    </div>
  );
}

export default InfoText;
