import React from "react";
import MapModule from "./MapModule";
import { useHistory } from "react-router-dom";

//IMPORT CUSTOM STYLING
import style from "../style.module.css";

function Index() {
  let role = window.localStorage.getItem("roleName");

  return (
    <>
      {role === "admin" && (
        <div className='col col-lg-6 col-m-12 col-s-12'>
          {/* BOX PUTIH  */}
          <div className={`${style.cardMediumWrapper} px-4`}>
            <MapModule />
            {/* <p>lala</p> */}
          </div>
        </div>
      )}
      {role === "executive" && (
        <div className='col col-lg-6 col-m-12 col-s-12'>
          {/* BOX PUTIH  */}
          <div className={`${style.cardMediumWrapper} px-4`}>
            <MapModule />
            {/* <p>lala</p> */}
          </div>
        </div>
      )}
      {role === "adminsurveyor" && (
        <div className='col col-lg-12 col-m-12 col-s-12'>
          {/* BOX PUTIH  */}
          <div className={`${style.cardMediumWrapper} px-4`}>
            <MapModule />
            {/* <p>lala</p> */}
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
