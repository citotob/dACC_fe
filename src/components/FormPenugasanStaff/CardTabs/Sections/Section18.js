import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import DetailImage from "../DetailImage.js";
import NextPrevButtons from "../NextPrevButtons";
import LatitudeLongitude from "../LatitudeLongitude";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";
import InfoText from "../InfoText";

function Section18({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection18 = "section18";
  let localSection18 = JSON.parse(
    window.localStorage.getItem(strSection18.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section18 = useSelector((state) => state.FormSurveyStaff.section18);

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
  //         section18: {
  //           ...btsMain?.section18,
  //           filelocationmapping: "",
  //           fotolocationmapping: "",
  //           latitudelocationmapping: "",
  //           longitudelocationmapping: "",
  //           deskripsilocationmapping: "",
  //           latitudekandidat1: "",
  //           longitudekandidat1: "",
  //           elevasikandidat1: "",
  //           latitudekandidat2: "",
  //           longitudekandidat2: "",
  //           elevasikandidat2: "",
  //         },
  //       })
  //     );
  //   }
  // }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 18</span>
        <CardTitle className={`mb-5 mt-2 text26`}>Location Mapping</CardTitle>
        <div className={`font-weight-bold`}>
          <DetailImage
            label='File Location Mapping'
            name='kmlkmz'
            section='18'
          />
          <DetailImage
            label='Foto Location Mapping'
            section='18'
            kode={kode}
            lat={btsMain?.section18?.latitudelocationmapping}
            long={btsMain?.section18?.longitudelocationmapping}
          />
          <LatitudeLongitude
            section='18'
            latLabel='Latitude Location Mapping'
            lonLabel='Longitude Location Mapping'
          />
          <DetailInput
            label='Deskripsi Location Mapping'
            section='18'
            type='text'
            value={btsMain?.section18?.deskripsilocationmapping}
          />
          <p>POSISI YANG DIUSULKAN:</p>
          <div className='text-bold border rounded p-4 mb-2'>
            <p>Kandidat 1</p>
            <LatitudeLongitude
              section='18'
              latLabel='Latitude Kandidat 1'
              lonLabel='Longitude Kandidat 1'
            />
            <DetailInput
              label='Elevasi Kandidat 1'
              section='18'
              type='number'
              satuan='meter'
              value={btsMain?.section18?.elevasikandidat1}
            />
          </div>
          <div className='text-bold border rounded p-4 mb-2'>
            <p>Kandidat 2</p>
            <LatitudeLongitude
              section='18'
              latLabel='Latitude Kandidat 2'
              lonLabel='Longitude Kandidat 2'
            />
            <DetailInput
              label='Elevasi Kandidat 2'
              section='18'
              type='number'
              satuan='meter'
              value={btsMain?.section18?.elevasikandidat2}
            />
          </div>
          <InfoText text1='KET. Gambarkan keadaan lokasi di peta termasuk didalamnya target area yang akan dicover, obstacle / penghalang, kondisi pasar, area perkantoran, letak jalan akses, nama pertokoan/kantor, masjid, sungai, pasar tradisional, gerbang gapura, garis GSB, terminal, sketsa kontur (jika daerah berbukit dan terletak di kemiringan), titik kordinat utama yang diusulkan dan kandidat titik kordinat usulan lainnya (3 kandidat), coverage plot dari planning tools beserta surrounding tower opsel.' />
        </div>
        <NextPrevButtons
          section='18'
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

export default Section18;
