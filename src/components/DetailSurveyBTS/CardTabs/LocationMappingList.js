import React from 'react';

function LocationMappingList(props) {
  return (
    <div className="container-fluid d-flex flex-row mb-2 px-0">
      <span className="col-5">{props.label}</span>
      <div className="col-7 px-0">
        <div className="d-flex flex-column px-0">
          <div className="d-flex flex-row px-0">
            <span className="px-0 col-2">Elevasi</span>
            <span className="col-10">
              :{' '}
              {`${
                props?.value?.elevasi !== undefined
                  ? props?.value?.elevasi
                  : 'sampleData'
              }`}{' '}
              meter
            </span>
          </div>
          <div className="d-flex flex-row px-0">
            <span className="px-0 col-2">Latitude</span>
            <span className="col-10">
              :{' '}
              {`${
                props?.value?.lat !== undefined
                  ? props?.value?.lat
                  : 'sampleData'
              }`}
            </span>
          </div>
          <div className="d-flex flex-row px-0">
            <span className="px-0 col-2">Longitude</span>
            <span className="col-10">
              :{' '}
              {`${
                props?.value?.lon !== undefined
                  ? props?.value?.lon
                  : 'sampleData'
              }`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationMappingList;
