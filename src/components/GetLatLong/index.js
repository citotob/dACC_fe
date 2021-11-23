import React, { useState } from 'react';

import style from './style.module.scss';

const Index = ({}) => {
  // lat long states
  const [geoLat, setGeoLat] = useState('');
  const [geoLong, setGeoLong] = useState('');
  const [stateLat, setstateLat] = useState('');
  const [stateLon, setstateLon] = useState('');

  const toggleLatValue = (label) => {
    setstateLat(geoLat);
  };

  const toggleLongValue = (label) => {
    setstateLon(geoLong);
  };

  const getGeoLatLong = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeoLat(position.coords.latitude.toFixed(5));
      setGeoLong(position.coords.longitude.toFixed(5));
    });
  };
  return (
    <div>
      <div className={`d-flex flex-row align-items-end gap16`}>
        <div className="form-group flex-grow-1">
          <label className="px-0">Latitude</label>
          <div className="form-control d-flex flex-row justify-space-between align-items-center w-100">
            <input
              style={{ width: '95%', border: 'none', outline: 'none' }}
              type="number"
              placeholder="Latitude"
              value={stateLat.replace(/(\.\d{5})\d+/g, '$1')}
              onChange={(e) => {
                setstateLat(e.target.value);
              }}
            />{' '}
            {stateLat < -90 || stateLat > 90 ? (
              <span style={{ color: 'red', marginLeft: 'auto' }}>
                {' '}
                Must be between -90 an 90!
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <button
          className={`${style.buttonAutofill} px-2 py-1`}
          onClick={() => {
            toggleLatValue();
          }}
        >
          Get Latitude
        </button>
      </div>{' '}
      <div className={`d-flex flex-row align-items-end gap16`}>
        <div className="form-group flex-grow-1">
          <label className="px-0">Longitude</label>
          <div className="form-control d-flex flex-row justify-space-between align-items-center w-100">
            <input
              style={{ width: '95%', border: 'none', outline: 'none' }}
              type="number"
              placeholder="Longitude"
              value={stateLon.replace(/(\.\d{5})\d+/g, '$1')}
              onChange={(e) => {
                setstateLon(e.target.value);
              }}
            />

            {stateLon < -180 || stateLon > 180 ? (
              <span style={{ color: 'red', marginLeft: 'auto' }}>
                {' '}
                Must be between -180 an 180!
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <button
          className={`${style.buttonAutofill} px-2 py-1`}
          onClick={() => {
            toggleLongValue();
          }}
        >
          Get Longitude
        </button>
      </div>
    </div>
  );
};

export default Index;
