import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import DetailImage from "../DetailImage";
import NextPrevButtons from "../NextPrevButtons";
import LatitudeLongitude from "../LatitudeLongitude";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";
import InfoText from "../InfoText";

function Section33({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection33 = "section33";
  let localSection33 = JSON.parse(
    window.localStorage.getItem(strSection33.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section33 = useSelector((state) => state.FormSurveyStaff.section33);

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 33</span>
        <CardTitle className={`mb-5 mt-2 text26`}>Path Profile</CardTitle>
        <div className={`font-weight-bold`}>
          <DetailImage
            label='Path Profile'
            section='33'
            kode={kode}
            lat={btsMain?.section33?.latitude}
            long={btsMain?.section33?.longitude}
          />
          <LatitudeLongitude
            section='33'
            latLabel='Latitude'
            lonLabel='Longitude'
          />
          <DetailInput
            label='Keterangan'
            section='33'
            value={btsMain?.section33?.keterangan}
            type='text'
          />
        </div>
        <NextPrevButtons
          section='33'
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

export default Section33;

// useEffect(() => {
//   if (localBtsMain !== null) {
//     dispatch(setBtsMain(localBtsMain));
//   } else {
//     dispatch(
//       setBtsMain({
//         ...btsMain,
//         section33: {
//           ...btsMain?.section33,
//           pathprofile: "",
//           latitude: "",
//           longitude: "",
//           keterangan: "",
//         },
//       })
//     );
//   }
// }, []);
