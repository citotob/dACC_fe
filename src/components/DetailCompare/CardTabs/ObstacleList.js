import React from "react";

//import API
import { url } from "../../../services/Config";

function ImageList({ label, value }) {
  const imageStyle = {
    width: "300px",
    marginBottom: "8px",
  };

  return (
    <>
      {value?.map((item, i) => {
        return (
          <div key={i}>
            <p>Obstacle {i + 1}</p>
            <div className='d-flex flex-row mb-2'>
              <span className='col-4'>Derajat</span>
              <span className='col-8'>: {`${item.data.derajat}`}</span>
            </div>
            <div className='d-flex flex-row mb-2'>
              <span className='col-4'>Jarak</span>
              <span className='col-8'>: {`${item.data.jarak}`}</span>
            </div>
            <div className='d-flex flex-row mb-2'>
              <span className='col-4'>Deskripsi</span>
              <span className='col-8'>: {`${item.data.deskripsi}`}</span>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ImageList;
