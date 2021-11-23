import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import DetailDropdown from "../DetailDropdown";
import DetailRadio from "../DetailRadio";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section36({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection36 = "section36";
  let localSection36 = JSON.parse(
    window.localStorage.getItem(strSection36.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section36 = useSelector(
    (state) => state.FormSurveyStaff.btsMain?.section36
  );

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 36</span>
        <CardTitle className={`mb-5 mt-2 text26`}>Informasi Umum</CardTitle>
        <div className={`font-weight-bold`}>
          <DetailDropdown
            label='Site POI'
            section='36'
            dropdownItem={[
              { name: "Rural" },
              { name: "Perbatasan dengan negara lain" },
            ]}
            value={btsMain?.section36?.sitepoi}
          />
          <DetailInput
            label='Alamat (POI)'
            section='36'
            type='text'
            value={btsMain?.section36?.alamatpoi}
          />
          <DetailInput
            label='Kontak (POI)'
            section='36'
            type='text'
            value={btsMain?.section36?.kontakpoi}
          />
          <DetailInput
            label='Nomor Telepon (POI)'
            section='36'
            type='number'
            value={btsMain?.section36?.nomorteleponpoi}
          />
          <DetailInput
            label='Alamat Kontak (POI)'
            section='36'
            type='text'
            value={btsMain?.section36?.alamatkontakpoi}
          />
          <DetailDropdown
            label='Sit STO'
            section='36'
            dropdownItem={[
              { name: "Rural" },
              { name: "Perbatasan dengan negara lain" },
            ]}
            value={btsMain?.section36?.sitsto}
          />
          <DetailInput
            label='Alamat (STO)'
            section='36'
            type='text'
            value={btsMain?.section36?.alamatsto}
          />
          <DetailInput
            label='Kontak (STO)'
            section='36'
            type='text'
            value={btsMain?.section36?.kontaksto}
          />
          <DetailInput
            label='Nomor Telepon (STO)'
            section='36'
            type='number'
            value={btsMain?.section36?.nomorteleponsto}
          />
          <DetailInput
            label='Alamat Kontak (STO)'
            section='36'
            type='text'
            value={btsMain?.section36?.alamatkontaksto}
          />
        </div>
      </>
      <NextPrevButtons
        section='36'
        setactiveTab={setactiveTab}
        kodeSurvey={kodeSurvey}
        nextDisabled={false}
        prevDisabled={true}
        simpanDisabled={false}
      />
    </CardBody>
  );
}

export default Section36;

// useEffect(() => {
//   if (localBtsMain !== null) {
//     dispatch(setBtsMain(localBtsMain));
//   } else {
//     dispatch(
//       setBtsMain({
//         ...btsMain,
//         section36: {
//           ...btsMain?.section36,
//           sitepoi: "",
//           alamatpoi: "",
//           kontakpoi: "",
//           nomorteleponpoi: "",
//           alamatkontakpoi: "",
//           sitsto: "",
//           alamatsto: "",
//           kontaksto: "",
//           nomorteleponsto: "",
//           alamatkontaksto: "",
//         },
//       })
//     );
//   }
// }, []);
