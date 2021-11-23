import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import DetailImage from "../DetailImage.js";
import NextPrevButtons from "../NextPrevButtons";
import LatitudeLongitude from "../LatitudeLongitude";
import Card1 from "../card1";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";
import card1 from "../card1";

function Section13({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection13 = "section13";
  let localSection13 = JSON.parse(
    window.localStorage.getItem(strSection13.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section13 = useSelector(
    (state) => state.FormSurveyStaff.btsMain?.section13
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
  //         section13: {
  //           ...btsMain?.section13,
  //           fotolahankandidat: "",
  //           latitudelahankandidat: "",
  //           longitudelahankandidat: "",
  //           keteranganlahankandidat: "",
  //           fotomarkinggps: "",
  //           latitudemarkinggps: "",
  //           longitudemarkinggps: "",
  //           keteranganmarkinggps: "",
  //         },
  //       })
  //     );
  //   }
  // }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 13</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Foto Foto Kandidat Lahan
        </CardTitle>
        <div className={`font-weight-bold`}>
          <div className='text-bold border rounded p-4 mb-2'>
            <DetailImage
              label='Foto Lahan Kandidat'
              section='13'
              kode={kode}
              lat={btsMain?.section3?.koordinatgpswgs84latitude}
              long={btsMain?.section3?.koordinatgpswgs84longitude}
            />

            <Card1
              label='Latitude'
              value={
                btsMain?.section3?.koordinatgpswgs84latitude ??
                "isi data di section 3"
              }
            />

            <Card1
              label='Longitude'
              value={
                btsMain?.section3?.koordinatgpswgs84longitude ??
                "isi data di section 3"
              }
            />

            <DetailInput
              label='Keterangan Lahan Kandidat'
              section='13'
              type='text'
              value={btsMain?.section13?.keteranganlahankandidat}
            />
          </div>
          <div className='text-bold border rounded p-4 mb-2'>
            <DetailImage
              label='Foto Marking GPS'
              section='13'
              kode={kode}
              lat={btsMain?.section3?.koordinatgpswgs84latitude}
              long={btsMain?.section3?.koordinatgpswgs84longitude}
            />

            <Card1
              label='Latitude'
              value={
                btsMain?.section3?.koordinatgpswgs84latitude ??
                "isi data di section 3"
              }
            />

            <Card1
              label='Longitude'
              value={
                btsMain?.section3?.koordinatgpswgs84longitude ??
                "isi data di section 3"
              }
            />

            <DetailInput
              label='Keterangan Marking GPS'
              section='13'
              type='text'
              value={btsMain?.section13?.keteranganmarkinggps}
            />
          </div>
        </div>
        <div className='mb-2'>
          <p className={`font-weight-normal text-info`}>
            * Titik referensi pengambilan gambar dari lahan kandidat site
          </p>
        </div>
        <NextPrevButtons
          section='13'
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

export default Section13;
