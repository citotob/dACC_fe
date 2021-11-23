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

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section12({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection12 = "section12";
  let localSection12 = JSON.parse(
    window.localStorage.getItem(strSection12.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section12 = useSelector((state) => state.FormSurveyStaff.section12);

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
  //         section12: {
  //           ...btsMain?.section12,
  //           fotolayoutsite: "",
  //           latitudelayoutsite: "",
  //           longitudelayoutsite: "",
  //           deskripsilayoutsite: "",
  //           fototower: "",
  //           latitudetower: "",
  //           longitudetower: "",
  //           deskripsitower: "",
  //           fotodenahlokasiarea: "",
  //           latitudedenahlokasiarea: "",
  //           longitudedenahlokasiarea: "",
  //           deskripsidenahlokasiarea: "",
  //           towerkesourcepowerifany: "",
  //           towerkeantennavsat: "",
  //           towerkesolarpanel: "",
  //         },
  //       })
  //     );
  //   }
  // }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 12</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Layout Site (Sesuai Penawaran Tender)
        </CardTitle>
        <div className={`font-weight-bold`}>
          <div className='text-bold border rounded p-4 mb-2'>
            <DetailImage
              label='Foto Layout Site'
              section='12'
              kode={kode}
              lat={btsMain?.section12?.latitudelayoutsite}
              long={btsMain?.section12?.longitudelayoutsite}
            />
            <LatitudeLongitude
              section='12'
              latLabel='Latitude Layout Site'
              lonLabel='Longitude Layout Site'
            />
            <DetailInput
              label='Deskripsi Layout Site'
              section='12'
              value={btsMain?.section12?.deskripsilayoutsite}
              type='text'
            />
          </div>
          <div className='text-bold border rounded p-4 mb-2'>
            <DetailImage
              label='Foto Tower'
              section='12'
              kode={kode}
              lat={btsMain?.section12?.latitudetower}
              long={btsMain?.section12?.longitudetower}
            />
            <LatitudeLongitude
              section='12'
              latLabel='Latitude Tower'
              lonLabel='Longitude Tower'
            />
            <DetailInput
              label='Deskripsi Tower'
              section='12'
              value={btsMain?.section12?.deskripsitower}
              type='text'
            />
          </div>
          <div className='text-bold border rounded p-4 mb-2'>
            <DetailImage
              label='Foto Denah Lokasi Area'
              section='12'
              kode={kode}
              lat={btsMain?.section12?.latitudedenahlokasiarea}
              long={btsMain?.section12?.longitudedenahlokasiarea}
            />
            <LatitudeLongitude
              section='12'
              latLabel='Latitude Denah Lokasi Area'
              lonLabel='Longitude Denah Lokasi Area'
            />
            <DetailInput
              label='Deskripsi Denah Lokasi Area'
              section='12'
              value={btsMain?.section12?.deskripsidenahlokasiarea}
              type='text'
            />
          </div>
          <DetailInput
            label='Tower ke Source Power (if any)'
            section='12'
            satuan=''
            value={btsMain?.section12?.towerkesourcepowerifany}
          />
          <DetailInput
            label='Tower ke Antenna VSAT'
            section='12'
            satuan=''
            value={btsMain?.section12?.towerkeantennavsat}
          />
          <DetailInput
            label='Tower ke Solar Panel'
            section='12'
            satuan=''
            value={btsMain?.section12?.towerkesolarpanel}
            asterisk='Gambarkan rencana tower/monopole/pole, indoor unit, antenna VSAT, Solar Panel, BTS dll'
          />
        </div>
        <NextPrevButtons
          section='22'
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

export default Section12;
