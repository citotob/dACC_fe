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

function Section11({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection11 = "section11";
  let localSection11 = JSON.parse(
    window.localStorage.getItem(strSection11.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section11 = useSelector((state) => state.FormSurveyStaff.section11);

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  // useEffect(() => {
  //   if (localBtsMain !== null) {
  //     dispatch(setBtsMain(localBtsMain));
  //   } else {
  //     dispatch(
  //       setBtsMain({
  //         ...btsMain,
  //         section11: {
  //           ...btsMain?.section11,
  //           foto: "",
  //           latitude: "",
  //           longitude: "",
  //           keterangan: "",
  //         },
  //       })
  //     );
  //   }
  // }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 11</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Foto Foto Lahan Yang Akan Dibangun
        </CardTitle>
        <DetailImage
          label='Foto'
          section='11'
          kode={kode}
          lat={btsMain?.section11?.latitude}
          long={btsMain?.section11?.longitude}
        />
        <LatitudeLongitude
          section='11'
          latLabel='Latitude'
          lonLabel='Longitude'
        />
        <DetailInput
          label='Keterangan'
          section='11'
          value={btsMain?.section11?.keterangan}
          type='text'
        />
      </>
      <NextPrevButtons
        section='11'
        setactiveTab={setactiveTab}
        kodeSurvey={kodeSurvey}
        nextDisabled={false}
        prevDisabled={false}
      />
    </CardBody>
  );
}

export default Section11;
