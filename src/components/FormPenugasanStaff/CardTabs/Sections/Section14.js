import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

// import components
import DetailInput from "../DetailInput.js";
import DetailDropdown from "../DetailDropdown.js";
import DetailImage from "../DetailImage";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section14({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection14 = "section14";
  let localSection14 = JSON.parse(
    window.localStorage.getItem(strSection14.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section14 = useSelector((state) => state.FormSurveyStaff.section14);

  let dropdownItemTopography = [
    { name: "Datar" },
    { name: "Laut/Sungai" },
    { name: "Hutan" },
    { name: "Berbukit" },
  ];

  let dropdownItemLandscape = [
    { name: "Pemukiman" },
    { name: "Perkantoran" },
    { name: "Industri" },
    { name: "Lainnya" },
  ];

  let dropdownItemDemography = [
    { name: "Padat" },
    { name: "Cukup Padat" },
    { name: "Kosong" },
    { name: "Lainnya" },
  ];

  let degrees = [0, 45, 90, 135, 180, 225, 270, 315];

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 14</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Informasi Coverage and Obstacle
        </CardTitle>
        <div className={`font-weight-bold`}>
          {degrees?.map((number, i) => {
            return (
              <div key={i} className='text-bold border rounded p-4 mb-2'>
                <p>Degree {number}°</p>
                <DetailImage
                  label={`Photo ${number}°`}
                  section='14'
                  kode={kode}
                  lat={btsMain?.section3?.koordinatgpswgs84latitude}
                  long={btsMain?.section3?.koordinatgpswgs84longitude}
                />
                <DetailInput
                  label={`Distance ${number}°`}
                  section='14'
                  type='number'
                  satuan='KM'
                  value={eval("btsMain?.section14?.distance" + number)}
                />
                <DetailInput
                  label={`Obstacle Type ${number}°`}
                  section='14'
                  type='text'
                  value={eval("btsMain?.section14?.obstacletype" + number)}
                />
                <DetailInput
                  label={`Obstacle Height ${number}°`}
                  section='14'
                  type='number'
                  satuan='KM'
                  value={eval("btsMain?.section14?.obstacleheight" + number)}
                />
                <DetailDropdown
                  label={`Topography ${number}°`}
                  section='14'
                  dropdownItem={dropdownItemTopography}
                  value={eval("btsMain?.section14?.topography" + number)}
                />
                <DetailDropdown
                  label={`Landscape ${number}°`}
                  section='14'
                  dropdownItem={dropdownItemLandscape}
                  value={eval("btsMain?.section14?.landscape" + number)}
                />
                {eval("btsMain?.section14?.landscape" + number) ===
                  "Lainnya" && (
                  <DetailInput
                    isExtraInput={true}
                    label={`Landscape ${number}° Lainnya`}
                    section='14'
                    type='text'
                    value={eval(
                      "btsMain?.section14?.landscape" + number + "lainnya"
                    )}
                  />
                )}
                <DetailDropdown
                  label={`Demography ${number}°`}
                  section='14'
                  dropdownItem={dropdownItemDemography}
                  value={eval("btsMain?.section14?.demography" + number)}
                />
                {eval("btsMain?.section14?.demography" + number) ===
                  "Lainnya" && (
                  <DetailInput
                    isExtraInput={true}
                    label={`Demography ${number}° Lainnya`}
                    section='14'
                    type='text'
                    value={eval(
                      "btsMain?.section14?.demography" + number + "lainnya"
                    )}
                  />
                )}
                <DetailInput
                  label={`Description ${number}°`}
                  section='14'
                  type='text'
                  value={eval("btsMain?.section14?.description" + number)}
                />
              </div>
            );
          })}
        </div>
        <NextPrevButtons
          section='14'
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

export default Section14;

// useEffect(() => {
//   if (localBtsMain !== null) {
//     dispatch(setBtsMain(localBtsMain));
//   } else {
//     dispatch(
//       setBtsMain({
//         ...btsMain,
//         section14: {
//           ...btsMain?.section14,
//           photo0: "",
//           distance0: "",
//           obstacletype0: "",
//           obstacleheight0: "",
//           topography0: "",
//           landscape0: "",
//           landscape0lainnya: "",
//           demography0: "",
//           demography0lainnya: "",
//           description0: "",
//           photo45: "",
//           distance45: "",
//           obstacletype45: "",
//           obstacleheight45: "",
//           topography45: "",
//           landscape45: "",
//           landscape45lainnya: "",
//           demography45: "",
//           demography45lainnya: "",
//           description45: "",
//           photo90: "",
//           distance90: "",
//           obstacletype90: "",
//           obstacleheight90: "",
//           topography90: "",
//           landscape90: "",
//           landscape90lainnya: "",
//           demography90: "",
//           demography90lainnya: "",
//           description90: "",
//           photo135: "",
//           distance135: "",
//           obstacletype135: "",
//           obstacleheight135: "",
//           topography135: "",
//           landscape135: "",
//           landscape135lainnya: "",
//           demography135: "",
//           demography135lainnya: "",
//           description135: "",
//           photo180: "",
//           distance180: "",
//           obstacletype180: "",
//           obstacleheight180: "",
//           topography180: "",
//           landscape180: "",
//           landscape180lainnya: "",
//           demography180: "",
//           demography180lainnya: "",
//           description180: "",
//           photo225: "",
//           distance225: "",
//           obstacletype225: "",
//           obstacleheight225: "",
//           topography225: "",
//           landscape225: "",
//           landscape225lainnya: "",
//           demography225: "",
//           demography225lainnya: "",
//           description225: "",
//           photo270: "",
//           distance270: "",
//           obstacletype270: "",
//           obstacleheight270: "",
//           topography270: "",
//           landscape270: "",
//           landscape270lainnya: "",
//           demography270: "",
//           demography270lainnya: "",
//           description270: "",
//           photo315: "",
//           distance315: "",
//           obstacletype315: "",
//           obstacleheight315: "",
//           topography315: "",
//           landscape315: "",
//           landscape315lainnya: "",
//           demography315: "",
//           demography315lainnya: "",
//           description315: "",
//         },
//       })
//     );
//   }
// }, []);
