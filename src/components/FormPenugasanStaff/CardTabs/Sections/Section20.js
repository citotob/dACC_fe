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

function Section20({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection20 = "section20";
  let localSection20 = JSON.parse(
    window.localStorage.getItem(strSection20.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section20 = useSelector((state) => state.FormSurveyStaff.section20);
  console.log("section20 jalan");
  let sites = [1, 2, 3, 4];

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 20</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Foto-Foto Akses ke Site
        </CardTitle>
        <div className={`font-weight-bold`}>
          {sites?.map((number, i) => {
            return (
              <div key={i} className='text-bold border rounded p-4 mb-2'>
                <p>Akses Site {number}</p>
                <DetailImage
                  label={`Photo Akses Site ${number}`}
                  section='20'
                  kode={kode}
                  lat={eval(`btsMain?.section20?.latitudeaksessite${number}`)}
                  long={eval(`btsMain?.section20?.longitudeaksessite${number}`)}
                />
                <LatitudeLongitude
                  section='20'
                  latLabel={`Latitude Akses Site ${number}`}
                  lonLabel={`Longitude Akses Site ${number}`}
                />
                <DetailInput
                  label={`Deskripsi Akses Site ${number}`}
                  section='20'
                  type='text'
                  value={eval(
                    "btsMain?.section20?.deskripsiaksessite" + number
                  )}
                />
              </div>
            );
          })}
        </div>
        <NextPrevButtons
          section='20'
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

export default Section20;

// useEffect(() => {
//   if (localBtsMain !== null) {
//     dispatch(setBtsMain(localBtsMain));
//   } else {
//     dispatch(
//       setBtsMain({
//         ...btsMain,
//         section20: {
//           ...btsMain?.section20,
//           photoaksessite1: "",
//           photoaksessite2: "",
//           photoaksessite3: "",
//           photoaksessite4: "",
//           latitudeaksessite1: "",
//           latitudeaksessite2: "",
//           latitudeaksessite3: "",
//           latitudeaksessite4: "",
//           longitudeaksessite1: "",
//           longitudeaksessite2: "",
//           longitudeaksessite3: "",
//           longitudeaksessite4: "",
//           deskripsiaksessite1: "",
//           deskripsiaksessite2: "",
//           deskripsiaksessite3: "",
//           deskripsiaksessite4: "",
//         },
//       })
//     );
//   }
// }, []);
