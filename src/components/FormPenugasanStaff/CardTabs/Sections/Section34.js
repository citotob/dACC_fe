import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import DetailImage from "../DetailImage.js";
import NextPrevButtons from "../NextPrevButtons";
import LatitudeLongitude from "../LatitudeLongitude";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section34({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection34 = "section34";
  let localSection34 = JSON.parse(
    window.localStorage.getItem(strSection34.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section34 = useSelector((state) => state.FormSurveyStaff.section34);

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 34</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Peta Lokasi keseluruhan / Global Map
        </CardTitle>
        <div className={`font-weight-bold`}>
          <DetailImage
            label='Peta Lokasi keseluruhan / Global Map'
            section='34'
            kode={kode}
            lat={btsMain?.section34?.latitude}
            long={btsMain?.section34?.longitude}
          />
          <LatitudeLongitude
            section='34'
            latLabel='Latitude'
            lonLabel='Longitude'
          />
          <DetailImage
            label='File KML Peta Lokasi'
            name='kmlkmz'
            section='34'
          />
        </div>
        <NextPrevButtons
          section='34'
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

export default Section34;

// useEffect(() => {
//   if (localBtsMain !== null) {
//     dispatch(setBtsMain(localBtsMain));
//   } else {
//     dispatch(
//       setBtsMain({
//         ...btsMain,
//         section34: {
//           ...btsMain?.section34,
//           petalokasikeseluruhanglobalmap: "",
//           latitude: "",
//           longitude: "",
//           filekmlpetalokasi: "",
//         },
//       })
//     );
//   }
// }, []);
