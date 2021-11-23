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

function Section23({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection23 = "section23";
  let localSection23 = JSON.parse(
    window.localStorage.getItem(strSection23.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section23 = useSelector((state) => state.FormSurveyStaff.section23);

  let array = ["Path Profile", "Desktop Contour"];

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 23</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Foto-Foto Akses ke Site
        </CardTitle>
        <div className={`font-weight-bold`}>
          {array?.map((item, i) => {
            return (
              <div key={i} className='text-bold border rounded p-4 mb-2'>
                <p>{item}</p>
                <DetailImage
                  label={`Photo ${item}`}
                  section='23'
                  kode={kode}
                  lat={eval(
                    `btsMain?.section23?.latitude${item
                      .replace(/[^a-zA-Z0-9 ]/g, "")
                      .replace(/\s+/g, "")
                      .toLowerCase()}`
                  )}
                  long={eval(
                    `btsMain?.section23?.longitude${item
                      .replace(/[^a-zA-Z0-9 ]/g, "")
                      .replace(/\s+/g, "")
                      .toLowerCase()}`
                  )}
                />
                <LatitudeLongitude
                  section='23'
                  latLabel={`Latitude ${item}`}
                  lonLabel={`Longitude ${item}`}
                />
                <DetailInput
                  label={`Deskripsi ${item}`}
                  section='23'
                  type='text'
                  value={
                    item === "Path Profile"
                      ? btsMain?.section23?.deskripsipathprofile
                      : item === "Desktop Contour"
                      ? btsMain?.section23?.deskripsidesktopcontour
                      : ""
                  }
                />
              </div>
            );
          })}
        </div>
        <NextPrevButtons
          section='23'
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

export default Section23;

// useEffect(() => {
//   if (localBtsMain !== null) {
//     dispatch(setBtsMain(localBtsMain));
//   } else {
//     dispatch(
//       setBtsMain({
//         ...btsMain,
//         section23: {
//           ...btsMain?.section23,
//           photopathprofile: "",
//           photodesktopcontour: "",
//           latitudepathprofile: "",
//           latitudedesktopcontour: "",
//           longitudepathprofile: "",
//           longitudedesktopcontour: "",
//           deskripsipathprofile: "",
//           deskripsidesktopcontour: "",
//         },
//       })
//     );
//   }
// }, []);
