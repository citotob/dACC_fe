import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle } from "reactstrap";

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

function Section29({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection29 = "section29";
  let localSection29 = JSON.parse(
    window.localStorage.getItem(strSection29.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section29 = useSelector((state) => state.FormSurveyStaff.section29);

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 29</span>
        <CardTitle className={`mb-5 mt-2 text26`}>Foto Tower Site B</CardTitle>
        <div className={`font-weight-bold`}>
          <DetailImage
            label={`Photo`}
            section='29'
            kode={kode}
            lat={btsMain?.section29?.latitude}
            long={btsMain?.section29?.longitude}
          />
          <LatitudeLongitude
            section='29'
            latLabel={`Latitude`}
            lonLabel={`Longitude`}
          />
          <DetailInput
            label={`Deskripsi`}
            section='29'
            type='text'
            value={btsMain?.section29?.deskripsi}
          />
        </div>
        <NextPrevButtons
          section='29'
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

export default Section29;
// useEffect(() => {
//   if (localBtsMain !== null) {
//     dispatch(setBtsMain(localBtsMain));
//   } else {
//     dispatch(
//       setBtsMain({
//         ...btsMain,
//         section29: {
//           ...btsMain?.section29,
//           photo: "",
//           latitude: "",
//           longitude: "",
//           deskripsi: "",
//         },
//       })
//     );
//   }
// }, []);
