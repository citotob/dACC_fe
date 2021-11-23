import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle, Label } from "reactstrap";

//Import Style
import style from "../style.module.scss";

// import components
import DetailInput from "../DetailInput.js";
import DetailImage from "../DetailImage";
import NextPrevButtons from "../NextPrevButtons";
import LatitudeLongitude from "../LatitudeLongitude";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section15({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection15 = "section15";
  let localSection15 = JSON.parse(
    window.localStorage.getItem(strSection15.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section15 = useSelector((state) => state.FormSurveyStaff.section15);

  let degrees = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

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
  //         section15: {
  //           ...btsMain?.section15,
  //           photo0: "",
  //           latitude0: "",
  //           longitude0: "",
  //           description0: "",
  //           photo30: "",
  //           latitude30: "",
  //           longitude30: "",
  //           description30: "",
  //           photo60: "",
  //           latitude60: "",
  //           longitude60: "",
  //           description60: "",
  //           photo90: "",
  //           latitude90: "",
  //           longitude90: "",
  //           description90: "",
  //           photo120: "",
  //           latitude120: "",
  //           longitude120: "",
  //           description120: "",
  //           photo150: "",
  //           latitude150: "",
  //           longitude150: "",
  //           description150: "",
  //           photo180: "",
  //           latitude180: "",
  //           longitude180: "",
  //           description180: "",
  //           photo210: "",
  //           latitude210: "",
  //           longitude210: "",
  //           description210: "",
  //           photo240: "",
  //           latitude240: "",
  //           longitude240: "",
  //           description240: "",
  //           photo270: "",
  //           latitude270: "",
  //           longitude270: "",
  //           description270: "",
  //           photo300: "",
  //           latitude300: "",
  //           longitude300: "",
  //           description300: "",
  //           photo330: "",
  //           latitude330: "",
  //           longitude330: "",
  //           description330: "",
  //         },
  //       })
  //     );
  //   }
  // }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 15</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Foto Foto Capture G-NETTRACK Jarak 0.5 KM
        </CardTitle>
        <div className={`font-weight-bold`}>
          {degrees?.map((number, i) => {
            return (
              <div key={i} className='text-bold border rounded p-4 mb-2'>
                <p>Degree {number}°</p>
                <DetailImage
                  label={`Photo ${number}°`}
                  section='15'
                  kode={kode}
                  lat={btsMain?.section3?.koordinatgpswgs84latitude}
                  long={btsMain?.section3?.koordinatgpswgs84longitude}
                />
                <LatitudeLongitude
                  section='15'
                  latLabel={`Latitude ${number}°`}
                  lonLabel={`Longitude ${number}°`}
                />
                <DetailInput
                  label={`Description ${number}°`}
                  section='15'
                  type='text'
                  value={eval("btsMain?.section15?.description" + number)}
                />
              </div>
            );
          })}
        </div>
        <NextPrevButtons
          section='15'
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

export default Section15;
