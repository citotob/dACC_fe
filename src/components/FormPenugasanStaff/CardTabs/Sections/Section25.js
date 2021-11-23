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

function Section25({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection25 = "section25";
  let localSection25 = JSON.parse(
    window.localStorage.getItem(strSection25.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section25 = useSelector((state) => state.FormSurveyStaff.section25);

  let array = ["A", "B"];

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 25</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Foto Foto GPS dan Tower
        </CardTitle>
        <div className={`font-weight-bold`}>
          {array?.map((item, i) => {
            return (
              <div key={i} className='text-bold border rounded p-4 mb-2'>
                <p>Foto GPS Site {item}</p>
                <DetailImage
                  label={`Photo GPS Site ${item}`}
                  section='25'
                  kode={kode}
                  lat={eval(
                    `btsMain?.section25?.latitudegpssite${item
                      .replace(/[^a-zA-Z0-9 ]/g, "")
                      .replace(/\s+/g, "")
                      .toLowerCase()}`
                  )}
                  long={eval(
                    `btsMain?.section25?.longitudegpssite${item
                      .replace(/[^a-zA-Z0-9 ]/g, "")
                      .replace(/\s+/g, "")
                      .toLowerCase()}`
                  )}
                />
                <LatitudeLongitude
                  section='25'
                  latLabel={`Latitude GPS Site ${item}`}
                  lonLabel={`Longitude GPS Site ${item}`}
                />
                <DetailInput
                  label={`Deskripsi GPS Site ${item}`}
                  section='25'
                  type='text'
                  value={
                    item === "A"
                      ? btsMain?.section25?.deskripsigpssitea
                      : item === "B"
                      ? btsMain?.section25?.deskripsigpssiteb
                      : ""
                  }
                />
              </div>
            );
          })}
        </div>
        <NextPrevButtons
          section='25'
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

export default Section25;

// useEffect(() => {
//   if (localBtsMain !== null) {
//     dispatch(setBtsMain(localBtsMain));
//   } else {
//     dispatch(
//       setBtsMain({
//         ...btsMain,
//         section25: {
//           ...btsMain?.section25,
//           photogpssitea: "",
//           photogpssiteb: "",
//           latitudegpssitea: "",
//           latitudegpssiteb: "",
//           longitudegpssitea: "",
//           longitudegpssiteb: "",
//           deskripsigpssitea: "",
//           deskripsigpssiteb: "",
//         },
//       })
//     );
//   }
// }, []);
