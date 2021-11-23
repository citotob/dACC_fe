import React from "react";

function card1(props) {
  return (
    <div className='d-flex flex-row mb-2'>
      <span className='col-4'>{props.label}</span>
      <span className='col-8'>
        : {`${props.value}`} {props.satuan ?? ""}
      </span>
    </div>
  );
}

export default card1;
