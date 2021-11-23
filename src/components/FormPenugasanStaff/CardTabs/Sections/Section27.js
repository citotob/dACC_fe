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

function Section27({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection27 = "section27";
  let localSection27 = JSON.parse(
    window.localStorage.getItem(strSection27.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section27 = useSelector((state) => state.FormSurveyStaff.section27);

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 27</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Proposed Lokasi Antenna MW @ SITE A (As Plan Drawing)
        </CardTitle>
        <div className={`font-weight-bold`}>
          <DetailImage
            label={`Photo`}
            section='27'
            kode={kode}
            lat={btsMain?.section27?.latitude}
            long={btsMain?.section27?.longitude}
          />
          <LatitudeLongitude
            section='27'
            latLabel={`Latitude`}
            lonLabel={`Longitude`}
          />
          <DetailInput
            label={`Deskripsi`}
            section='27'
            type='text'
            value={btsMain?.section27?.deskripsi}
          />
        </div>
        <NextPrevButtons
          section='27'
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

export default Section27;

// useEffect(() => {
//   if (localBtsMain !== null) {
//     dispatch(setBtsMain(localBtsMain));
//   } else {
//     dispatch(
//       setBtsMain({
//         ...btsMain,
//         section27: {
//           ...btsMain?.section27,
//           photo: "",
//           latitude: "",
//           longitude: "",
//           deskripsi: "",
//         },
//       })
//     );
//   }
// }, []);
