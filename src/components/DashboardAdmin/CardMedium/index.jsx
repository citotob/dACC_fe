import React from "react";

// IMPORT CUSTOM STYLING
import style from "./style.module.css";

// IMPORT COMPONENTS
import CardChart from "./CardChart";
import CardMap from "./CardMap";

function index() {
  return (
    <div
      className={`container-fluid col-lg-6 col-m-12 col-s-12 ${style.cardMediumContainer}`}
    >
      <div className='row g-5'>
        <div className='col-lg-6 col-m-12 col-s-12'>
          <CardChart />
        </div>
        <div className='col-lg-6 col-m-12 col-s-12'>
          <CardMap />
        </div>
      </div>
    </div>
  );
}

export default index;
