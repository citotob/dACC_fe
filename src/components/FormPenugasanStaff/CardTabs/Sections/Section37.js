import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import DetailRadio from "../DetailRadio";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";
import DetailDropdown from "../DetailDropdown";

function Section37({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection37 = "section37";
  let localSection37 = JSON.parse(
    window.localStorage.getItem(strSection37.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section37 = useSelector((state) => state.FormSurveyStaff.section37);

  useEffect(() => {
    if (localBtsMain !== null) {
      dispatch(setBtsMain(localBtsMain));
    } else {
      dispatch(
        setBtsMain({
          ...btsMain,
          section37: {
            ...btsMain?.section37,
            jarakrute: "",
            rekomendasitipekonstruksi: "",
            ruteinformasilokasi: "",
            kodepos: "",
          },
        })
      );
    }
  }, []);

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
  //         section37: {
  //           ...btsMain?.section37,
  //           jarakrute: "",
  //           rekomendasitipekonstruksi: "",
  //           ruteinformasilokasi: "",
  //           kodepos: "",
  //         },
  //       })
  //     );
  //   }
  // }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 37</span>
        <CardTitle className={`mb-5 mt-2 text26`}>Hasil Survey</CardTitle>
        <div className={`font-weight-bold`}>
          <DetailInput
            label='Jarak Rute'
            section='37'
            type='number'
            satuan='KM'
            value={btsMain?.section37?.jarakrute}
          />
          <DetailDropdown
            label='Rekomendasi Tipe Konstruksi'
            section='37'
            dropdownItem={[{ name: "Aerial" }, { name: "Underground" }]}
            value={btsMain?.section37?.rekomendasitipekonstruksi}
          />
          <DetailInput
            label='Rute/Informasi Lokasi'
            section='37'
            type='text'
            value={btsMain?.section37?.ruteinformasilokasi}
          />
          <DetailInput
            label='Kode Pos'
            section='37'
            type='number'
            value={btsMain?.section37?.kodepos}
          />
        </div>
      </>
      <NextPrevButtons
        section='37'
        setactiveTab={setactiveTab}
        kodeSurvey={kodeSurvey}
        nextDisabled={false}
        prevDisabled={false}
        simpanDisabled={false}
      />
    </CardBody>
  );
}

export default Section37;
