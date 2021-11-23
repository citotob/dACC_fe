import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailImage from "../DetailImage.js";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section35({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection35 = "section35";
  let localSection35 = JSON.parse(
    window.localStorage.getItem(strSection35.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section35 = useSelector((state) => state.FormSurveyStaff.section35);

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 35</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Perkiraan Link Budget (Capture-an Tools)
        </CardTitle>
        <div className={`font-weight-bold`}>
          <DetailImage
            label='Screen Capture'
            name='jpgpdf'
            section='35'
            asterisk='Upload screen capture pdf atau jpg'
            kode={kode}
            lat={btsMain?.section3?.koordinatgpswgs84latitude}
            long={btsMain?.section3?.koordinatgpswgs84longitude}
          />
        </div>
        <NextPrevButtons
          section='35'
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

export default Section35;

// useEffect(() => {
//   if (localBtsMain !== null) {
//     dispatch(setBtsMain(localBtsMain));
//   } else {
//     dispatch(
//       setBtsMain({
//         ...btsMain,
//         section35: {
//           ...btsMain?.section35,
//           screencapture: "",
//         },
//       })
//     );
//   }
// }, []);
