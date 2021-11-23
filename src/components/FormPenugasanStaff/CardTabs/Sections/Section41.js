import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailImage from "../DetailImage";
import DetailInput from "../DetailInput";
import LatitudeLongitude from "../LatitudeLongitude";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section41({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection41 = "section41";
  let localSection41 = JSON.parse(
    window.localStorage.getItem(strSection41.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section41 = useSelector(
    (state) => state.FormSurveyStaff.btsMain?.section41
  );

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 41</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Foto Titik Terminasi di POI
        </CardTitle>
        <div className={`font-weight-bold`}>
          <DetailImage
            label='Foto Titik Terminasi di POI'
            section='41'
            kode={kode}
            lat={btsMain?.section41?.latitude}
            long={btsMain?.section41?.longitude}
          />
          <LatitudeLongitude
            section='41'
            latLabel='Latitude'
            lonLabel='Longitude'
          />
          <DetailInput
            label='Keterangan'
            section='41'
            type='text'
            value={btsMain?.section41?.keterangan}
          />
        </div>
        <NextPrevButtons
          section='41'
          setactiveTab={setactiveTab}
          kodeSurvey={kodeSurvey}
          nextDisabled={false}
          prevDisabled={false}
          simpanDisabled={false}
        />
      </>
    </CardBody>
  );
}

export default Section41;
