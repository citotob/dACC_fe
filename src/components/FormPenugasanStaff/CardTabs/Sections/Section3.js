import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import DetailDropdown from "../DetailDropdown.js";
import NextPrevButtons from "../NextPrevButtons";
import LatitudeLongitude from "../LatitudeLongitude";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section3({ setactiveTab, db }) {
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection3 = "section3";
  let localSection3 = JSON.parse(
    window.localStorage.getItem(strSection3.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section3 = useSelector(
    (state) => state.FormSurveyStaff.btsMain?.section3
  );

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  // useEffect(() => {
  //   if (localBtsMain !== null) {
  //     dispatch(setBtsMain(localBtsMain));
  //   } else {
  //     dispatch(
  //       setBtsMain({
  //         ...btsMain,
  //         section3: {
  //           ...btsMain?.section3,
  //           koordinatgpswgslatitude: "",
  //           koordinatgpswgslongitude: "",
  //           altitudeasl: "",
  //           tinggitowerpole: "",
  //           tipetower: "",
  //         },
  //       })
  //     );
  //   }
  // }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 3</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Informasi Geografi & Data Tower Yang Disarankan
        </CardTitle>
        <div className={`font-weight-bold`}>
          <LatitudeLongitude
            section='3'
            latLabel='Koordinat GPS WGS84 - Latitude'
            lonLabel='Koordinat GPS WGS84 - Longitude'
          />
          <DetailInput
            inputWidth='60%'
            label='Altitude (ASL)'
            section='3'
            type='number'
            satuan='meter di atas permukaan laut'
            value={btsMain?.section3?.altitudeasl}
          />
          {/* <DetailInput
            label='Tinggi Tower/Pole'
            section='3'
            type='number'
            satuan='meter'
            value={btsMain?.section3?.tinggitowerpole}
          /> */}
          <DetailDropdown
            label='Tinggi Tower/Pole'
            section='3'
            value={btsMain?.section3?.tinggitowerpole}
            dropdownItem={[
              { name: "18" },
              { name: "32" },
              { name: "42" },
              { name: "52" },
              { name: "62" },
              { name: "72" },
            ]}
          />
          <DetailDropdown
            label='Tipe Tower'
            section='3'
            value={btsMain?.section3?.tipetower}
            dropdownItem={[
              { name: "Guyed Mast" },
              { name: "Guyed Mast Tubular" },
              { name: "Self Supporting Tower (Heavy)" },
              { name: "Self Supporting Tower (Medium)" },
              { name: "Self Supporting Tower (Light)" },
              { name: "Lainnya" },
            ]}
          />
          {btsMain?.section3?.tipetower === "Lainnya" && (
            <DetailInput
              isExtraInput={true}
              label='Tipe Tower Lainnya'
              section='3'
              type='text'
              value={btsMain?.section3?.tipetowerlainnya}
            />
          )}
        </div>
        <NextPrevButtons
          section='3'
          setactiveTab={setactiveTab}
          kodeSurvey={kodeSurvey}
          nextDisabled={false}
          prevDisabled={false}
          simpanDisabled={false}
        />
      </>
    </CardBody>
  );
} // location

export default Section3;
