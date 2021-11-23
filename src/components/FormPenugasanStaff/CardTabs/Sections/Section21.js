import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import FormEditors from "../FormEditors";
import RawToHtml from "../RawToHtml22";
import RawToHtml22Class from "../RawToHtml22Class";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";
function Section21({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection21 = "section21";
  let localSection21 = JSON.parse(
    window.localStorage.getItem(strSection21.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section21 = useSelector((state) => state.FormSurveyStaff.section21);

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <span className={style.section}>Section 21</span>
      <CardTitle className={`mb-5 mt-2 text26`}>General Comment</CardTitle>
      <RawToHtml kodeSurvey={kodeSurvey} section='21' />
      <NextPrevButtons
        section='21'
        setactiveTab={setactiveTab}
        kodeSurvey={kodeSurvey}
        nextDisabled={true}
        prevDisabled={false}
        simpanDisabled={false}
      />
      {/* <div
          dangerouslySetInnerHTML={{
            __html: btsMain?.section21?.generalcommenthtml,
          }}
        /> */}
    </CardBody>
  );
}

export default Section21;

// useEffect(() => {
//   db.collection(eval("strBtsMain").concat(kodeSurvey))
//     .get()
//     .then((data) => {
//       if (data[0]) {
//         dispatch(setBtsMain(data[0].btsMain));
//       } else {
//         destroyBtsForm(dispatch, btsMain, setBtsMain);
//       }
//     });
// }, []);
// useEffect(() => {
//   if (localBtsMain !== null) {
//     dispatch(setBtsMain(localBtsMain));
//   } else {
//     dispatch(
//       setBtsMain({
//         ...btsMain,
//         section21: {
//           ...btsMain?.section21,
//           generalcomment: "",
//           generalcommentraw: "",
//           generalcommenthtml: "",
//         },
//       })
//     );
//   }
// }, []);

// document.getElementById("write").innerHTML =
//   btsMain?.section21?.generalcommenthtml;
