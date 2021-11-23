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

function Section26({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection26 = "section26";
  let localSection26 = JSON.parse(
    window.localStorage.getItem(strSection26.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section26 = useSelector((state) => state.FormSurveyStaff.section26);

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 26</span>
        <CardTitle className={`mb-5 mt-2 text26`}>Foto Tower Site A</CardTitle>
        <div className={`font-weight-bold`}>
          <DetailImage
            label={`Photo`}
            section='26'
            kode={kode}
            lat={btsMain?.section26?.latitude}
            long={btsMain?.section26?.longitude}
          />
          <LatitudeLongitude
            section='26'
            latLabel={`Latitude`}
            lonLabel={`Longitude`}
          />
          <DetailInput
            label={`Deskripsi`}
            section='26'
            type='text'
            value={btsMain?.section26?.deskripsi}
          />
        </div>
        <NextPrevButtons
          section='26'
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

export default Section26;

// useEffect(() => {
//   if (localBtsMain !== null) {
//     dispatch(setBtsMain(localBtsMain));
//   } else {
//     dispatch(
//       setBtsMain({
//         ...btsMain,
//         section26: {
//           ...btsMain?.section26,
//           photo: "",
//           latitude: "",
//           longitude: "",
//           deskripsi: "",
//         },
//       })
//     );
//   }
// }, []);
