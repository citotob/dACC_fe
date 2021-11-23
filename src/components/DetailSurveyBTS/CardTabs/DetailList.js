import React from 'react';

function DetailList(props) {
  return (
    <div className="d-flex flex-row mb-2 px-0 flex-grow-1">
      {props.sector && props.type === 'list' ? (
        <>
          <span className="col-5 px-0">{props.label}</span>
          <div className="col-7 px-0">
            <div className="d-flex flex-column px-0">
              <div className="d-flex flex-row px-0">
                <span className="px-0 col-2">Topography</span>
                <span className="col-10 mb-2">
                  :
                  {`${
                    props?.value?.topografi !== undefined
                      ? props?.value?.topografi
                      : 'sampleData'
                  }`}
                </span>
              </div>
              <div className="d-flex flex-row px-0">
                <span className="px-0 col-2">Landscape</span>
                <span className="col-10 mb-2">
                  :
                  {`${
                    props?.value?.landscape !== undefined
                      ? props?.value?.landscape
                      : 'sampleData'
                  }`}
                </span>
              </div>
              <div className="d-flex flex-row px-0">
                <span className="px-0 col-2">Demography</span>
                <span className="col-10 mb-2">
                  :
                  {`${
                    props?.value?.demografi !== undefined
                      ? props?.value?.demografi
                      : 'sampleData'
                  }`}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : props.type === 'file' ? (
        <>
          <span className="col-5 px-0">{props.label}</span>
          <span className="col-7 px-0">
            :
            <button
              onClick={() => {
                console.log('downloading file...');
              }}
            >
              Download File
            </button>
          </span>
        </>
      ) : (
        <>
          <span className="col-5 px-0">{props.label}</span>
          <span className="col-7 px-0">
            : {`${props?.value}`} {props.satuan ?? ''}
          </span>
        </>
      )}
    </div>
  );
}

export default DetailList;
