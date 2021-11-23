import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle, Label } from "reactstrap";

//Import Style
import style from "../style.module.scss";

// import components
import DetailInput from "../DetailInput.js";
import DetailImage from "../DetailImage";
import DetailCheckbox from "../DetailCheckbox";
import NextPrevButtons from "../NextPrevButtons";
import LatitudeLongitude from "../LatitudeLongitude";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section17({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection17 = "section17";
  let localSection17 = JSON.parse(
    window.localStorage.getItem(strSection17.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section17 = useSelector((state) => state.FormSurveyStaff.section17);

  let operators = ["Telkomsel", "Indosat", "XL"];

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 17</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Foto Foto Capture G-NETTRACK Rute Jalan (+/- 2KM Dari Kandidat Site)
        </CardTitle>
        <div className={`font-weight-bold`}>
          <DetailCheckbox
            label='Pilihan Operator'
            section='17'
            name={["Telkomsel", "Indosat", "XL", "No Coverage"]}
          />
          {btsMain?.section17?.pilihanoperator?.map &&
            btsMain?.section17?.pilihanoperator?.map((operator, i) => {
              return (
                <div key={i} className='text-bold border rounded p-4 mb-2'>
                  <p>Operator {operator}</p>
                  <DetailImage
                    label={`Photo ${operator}`}
                    section='17'
                    kode={kode}
                    lat={btsMain?.section3?.koordinatgpswgs84latitude}
                    long={btsMain?.section3?.koordinatgpswgs84longitude}
                  />
                  <DetailInput
                    label={`Description ${operator}`}
                    section='17'
                    type='text'
                    value={
                      operator === "Telkomsel"
                        ? btsMain?.section17?.descriptiontelkomsel
                        : operator === "Indosat"
                        ? btsMain?.section17?.descriptionindosat
                        : operator === "XL"
                        ? btsMain?.section17?.descriptionxl
                        : ""
                    }
                  />
                </div>
              );
            })}
        </div>
        <NextPrevButtons
          section='17'
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

export default Section17;

// useEffect(() => {
//   if (localBtsMain !== null) {
//     dispatch(setBtsMain(localBtsMain));
//   } else {
//     dispatch(
//       setBtsMain({
//         ...btsMain,
//         section17: {
//           ...btsMain?.section17,
//           pilihanoperator: "",
//           phototelkomsel: "",
//           latitudetelkomsel: "",
//           longitudetelkomsel: "",
//           descriptiontelkomsel: "",
//           photoindosat: "",
//           latitudeindosat: "",
//           longitudeindosat: "",
//           descriptionindosat: "",
//           photoxl: "",
//           latitudexl: "",
//           longitudexl: "",
//           descriptionxl: "",
//           photonocoverage: "",
//           latitudenocoverage: "",
//           longitudenocoverage: "",
//           descriptionnocoverage: "",
//         },
//       })
//     );
//   }
// }, []);
