import React from "react";
// import MapModule from "./MapModule";
import MapClustering from "./MapClustering";

//IMPORT CUSTOM STYLING
import style from "../style.module.css";

function index() {
  return (
    <div className='col col-lg-6 col-m-12 col-s-12'>
      {/* BOX PUTIH  */}
      <div className={`${style.cardMediumWrapper} px-4`}>
        <div className={`${style.cardMediumTitle}`}>
          <div className={`${style.cardMediumLabel}`}>
            <p>Map Persebaran Lokasi Survey</p>
          </div>
          <div className={`${style.cardMediumButtonsWrapper}`}>
            <div className={`${style.cardMediumButtons}`}>
              <button className={`${style.active}`}>Akses Internet</button>
              <button className={`${style.inactive}`}>BTS</button>
            </div>
          </div>
        </div>
        {/* <MapModule /> */}
        <MapClustering />
      </div>
    </div>
  );
}

export default index;
