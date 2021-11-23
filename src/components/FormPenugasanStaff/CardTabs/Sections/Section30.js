import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle, Label } from "reactstrap";

//Import Style
import style from "../style.module.scss";

// import components
import DetailInput from "../DetailInput.js";
import LatitudeLongitude from "../LatitudeLongitude";
import DetailImage from "../DetailImage";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section30({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection30 = "section30";
  let localSection30 = JSON.parse(
    window.localStorage.getItem(strSection30.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section30 = useSelector((state) => state.FormSurveyStaff.section30);

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 30</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Proposed Lokasi Antenna MW @ SITE A (As Plan Drawing)
        </CardTitle>
        <div className={`font-weight-bold`}>
          <DetailImage
            label={`Photo`}
            section='30'
            kode={kode}
            lat={btsMain?.section30?.latitude}
            long={btsMain?.section30?.longitude}
          />
          <LatitudeLongitude
            section='30'
            latLabel={`Latitude`}
            lonLabel={`Longitude`}
          />
          <DetailInput
            label={`Deskripsi`}
            section='30'
            type='text'
            value={btsMain?.section30?.deskripsi}
          />
        </div>
        <NextPrevButtons
          section='30'
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

export default Section30;

// useEffect(() => {
//   if (localBtsMain !== null) {
//     dispatch(setBtsMain(localBtsMain));
//   } else {
//     dispatch(
//       setBtsMain({
//         ...btsMain,
//         section30: {
//           ...btsMain?.section30,
//           photo: "",
//           latitude: "",
//           longitude: "",
//           deskripsi: "",
//         },
//       })
//     );
//   }
// }, []);
