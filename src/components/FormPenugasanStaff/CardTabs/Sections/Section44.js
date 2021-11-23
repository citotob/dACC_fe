import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailImage from "../DetailImage";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section44({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection44 = "section44";
  let localSection44 = JSON.parse(
    window.localStorage.getItem(strSection44.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section44 = useSelector(
    (state) => state.FormSurveyStaff.btsMain?.section44
  );

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 44</span>
        <CardTitle className={`mb-5 mt-2 text26`}>As Plan Drawing</CardTitle>
        <div className={`font-weight-bold`}>
          <DetailImage
            label='As Plan Drawing'
            section='44'
            kode={kode}
            lat={btsMain?.section3?.koordinatgpswgs84latitude}
            long={btsMain?.section3?.koordinatgpswgs84longitude}
          />
        </div>
        <NextPrevButtons
          section='44'
          setactiveTab={setactiveTab}
          kodeSurvey={kodeSurvey}
          nextDisabled={true}
          prevDisabled={false}
          simpanDisabled={false}
        />
      </>
    </CardBody>
  );
}

export default Section44;

// useEffect(() => {
//   if (localBtsMain !== null) {
//     dispatch(setBtsMain(localBtsMain));
//   } else {
//     dispatch(
//       setBtsMain({
//         ...btsMain,
//         section44: {
//           ...btsMain?.section44,
//           asplandrawing: "",
//         },
//       })
//     );
//   }
// }, []);
