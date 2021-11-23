import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import DetailImage from "../DetailImage";
import NextPrevButtons from "../NextPrevButtons";
import LatitudeLongitude from "../LatitudeLongitude";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section32({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection32 = "section32";
  let localSection32 = JSON.parse(
    window.localStorage.getItem(strSection32.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section32 = useSelector((state) => state.FormSurveyStaff.section32);

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 32</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Foto Line Of Sight (LOS)
        </CardTitle>
        <div className={`font-weight-bold`}>
          <DetailInput
            label='Dari'
            type='text'
            section='32'
            value={btsMain?.section32?.dari}
          />
          <DetailInput
            label='Ke'
            type='text'
            section='32'
            value={btsMain?.section32?.ke}
          />
          <DetailInput
            label='Azimuth'
            type='text'
            section='32'
            value={btsMain?.section32?.azimuth}
          />
          <div className='text-bold border rounded p-4 mb-2'>
            <DetailImage
              label='Gambar diambil dari Site A ke Site B (tanpa zoom)'
              message='Tunjukan dengan tanda Panah untuk informasi Obstacle / Blocking  Area'
              section='32'
              kode={kode}
              lat={btsMain?.section32?.latitudeakebtanpazoom}
              long={btsMain?.section32?.longitudeakebtanpazoom}
            />
            <LatitudeLongitude
              section='32'
              latLabel={`Latitude (A ke B Tanpa Zoom)`}
              lonLabel={`Longitude (A ke B Tanpa Zoom)`}
            />
          </div>
          <div className='text-bold border rounded p-4 mb-2'>
            <DetailImage
              label='Gambar diambil dari Site A ke Site B (dengan zoom)'
              message='Tunjukan dengan tanda Panah untuk informasi Obstacle / Blocking  Area'
              section='32'
              section='32'
              kode={kode}
              lat={btsMain?.section32?.latitudeakebdenganzoom}
              long={btsMain?.section32?.longitudeakebdenganzoom}
            />
            <LatitudeLongitude
              section='32'
              latLabel={`Latitude (A ke B Dengan Zoom)`}
              lonLabel={`Longitude (A ke B Dengan Zoom)`}
            />
          </div>
          <div className='text-bold border rounded p-4 mb-2'>
            <DetailImage
              label='Gambar diambil dari Site B ke Site A (tanpa zoom)'
              message='Tunjukan dengan tanda Panah untuk informasi Obstacle / Blocking Area Site B'
              section='32'
              section='32'
              kode={kode}
              lat={btsMain?.section32?.latitudebkeatanpazoom}
              long={btsMain?.section32?.longitudebkeatanpazoom}
            />
            <LatitudeLongitude
              section='32'
              latLabel={`Latitude (B ke A Tanpa Zoom)`}
              lonLabel={`Longitude (B ke A Tanpa Zoom)`}
            />
          </div>

          <div className='text-bold border rounded p-4 mb-2'>
            <DetailImage
              label='Gambar diambil dari Site B ke Site A (dengan zoom)'
              message='Tunjukan dengan tanda Panah untuk informasi Obstacle / Blocking  Area di Site B dan Halangan nya '
              section='32'
              section='32'
              kode={kode}
              lat={btsMain?.section32?.latitudebkeadenganzoom}
              long={btsMain?.section32?.longitudebkeadenganzoom}
            />
            <LatitudeLongitude
              section='32'
              latLabel={`Latitude (B ke A Dengan Zoom)`}
              lonLabel={`Longitude (B ke A Dengan Zoom)`}
            />
          </div>
        </div>
        <NextPrevButtons
          section='32'
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

export default Section32;
