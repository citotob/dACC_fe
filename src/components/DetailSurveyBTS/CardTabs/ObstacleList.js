import React from 'react';

//import API
import { url } from '../../../services/Config';
import ImageStatic from './ImageStatic';
import DisplayImageWithLabel from '../../DisplayImageWithLabel';

function ObstacleList({ label, value }) {
  return (
    <>
      {value?.map((item, i) => {
        return (
          <div key={i}>
            <p>Obstacle {i + 1}</p>
            <DisplayImageWithLabel
              lat={-6.175392}
              long={106.827153}
              label="Foto"
              path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            />
            <div className="d-flex flex-row mb-2">
              <span className="col-5">Degree</span>
              <span className="col-7">
                {/* : {`${item?.data ? item?.data?.derajat : item?.derajat}`} ° */}
                : {`sampleData`} °
              </span>
            </div>
            <div className="d-flex flex-row mb-2">
              <span className="col-5">Distance</span>
              <span className="col-7">
                {/* : {`${item?.data ? item?.data?.jarak : item?.jarak}`} meter */}
                : {`sampleData`} meter
              </span>
            </div>
            <div className="d-flex flex-row mb-2">
              <span className="col-5">Description</span>
              <span className="col-7">
                {/* : {`${item?.data ? item?.data?.deskripsi : item?.deskripsi}`} */}
                : {`sampleData`}
              </span>
            </div>
            <div className="d-flex flex-row mb-2">
              <span className="col-5">Obstacle Type</span>
              <span className="col-7">: {`sampleData`}</span>
            </div>
            <div className="d-flex flex-row mb-2">
              <span className="col-5">Obstacle Height</span>
              <span className="col-7">: {`sampleData`}</span>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ObstacleList;
