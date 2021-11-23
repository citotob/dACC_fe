import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailImage from "../DetailImage";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section43({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection43 = "section43";
  let localSection43 = JSON.parse(
    window.localStorage.getItem(strSection43.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section43 = useSelector(
    (state) => state.FormSurveyStaff.btsMain?.section43
  );

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 43</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Rute Fiber Optik di Google Map
        </CardTitle>
        <div className={`font-weight-bold`}>
          <DetailImage
            label='Rute Fiber Optik di Google Map'
            section='43'
            kode={kode}
            lat={btsMain?.section3?.koordinatgpswgs84latitude}
            long={btsMain?.section3?.koordinatgpswgs84longitude}
          />
        </div>
        <NextPrevButtons
          section='43'
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

export default Section43;

// useEffect(() => {
//   if (localBtsMain !== null) {
//     dispatch(setBtsMain(localBtsMain));
//   } else {
//     dispatch(
//       setBtsMain({
//         ...btsMain,
//         section43: {
//           ...btsMain?.section43,
//           rutefiberoptikdigooglemap: "",
//         },
//       })
//     );
//   }
// }, []);
