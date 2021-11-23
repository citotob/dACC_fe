import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, CardBody, CardTitle, Label } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section39({ setactiveTab, db }) {
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection39 = "section39";
  let localSection39 = JSON.parse(
    window.localStorage.getItem(strSection39.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section39 = useSelector(
    (state) => state.FormSurveyStaff.btsMain?.section39
  );

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
  //         section39: {
  //           ...btsMain?.section39,
  //           jumlahpoleexisting: "",
  //           jumlahhhmhexisting: "",
  //           jumlahpolebaru: "",
  //           jumlahhhmhbaru: "",
  //         },
  //       })
  //     );
  //   }
  // }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 39</span>
        <CardTitle className={`mb-5 mt-2 text26`}>Kondisi Fasilitas</CardTitle>
        <div className={`font-weight-bold d-flex flex-row gap16`}>
          <DetailInput
            label='Jumlah Pole Existing'
            section='39'
            type='number'
            satuan='Pcs'
            value={btsMain?.section39?.jumlahpoleexisting}
          />
          <DetailInput
            label='Jumlah HH/MH Existing'
            section='39'
            type='number'
            satuan='Pcs'
            value={btsMain?.section39?.jumlahhhmhexisting}
          />
        </div>
        <div className={`font-weight-bold d-flex flex-row gap16`}>
          <DetailInput
            label='Jumlah Pole Baru'
            section='39'
            type='number'
            satuan='Pcs'
            value={btsMain?.section39?.jumlahpolebaru}
          />
          <DetailInput
            label='Jumlah HH/MH Baru'
            section='39'
            type='number'
            satuan='Pcs'
            value={btsMain?.section39?.jumlahhhmhbaru}
          />
        </div>
        <NextPrevButtons
          section='39'
          setactiveTab={setactiveTab}
          kodeSurvey={kodeSurvey}
          nextDisabled={false}
          prevDisabled={false}
          simpanDisabled={false}
        />
      </>
    </CardBody>
  );
} // location

export default Section39;
