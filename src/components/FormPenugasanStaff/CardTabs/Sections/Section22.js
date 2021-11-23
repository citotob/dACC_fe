import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import DetailDropdown from "../DetailDropdown";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section22({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection22 = "section22";
  let localSection22 = JSON.parse(
    window.localStorage.getItem(strSection22.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section22 = useSelector(
    (state) => state.FormSurveyStaff.btsMain?.section22
  );

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 22</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Informasi Desain Link Microwave
        </CardTitle>
        <div className={`font-weight-bold`}>
          <DetailInput
            label='Site A ID (Near End)'
            section='22'
            value={btsMain?.section22?.siteaidmapnearend}
          />
          <DetailInput
            label='Site B ID (Far End)'
            section='22'
            value={btsMain?.section22?.sitebidfarend}
          />
          <DetailDropdown
            label='Frequency'
            section='22'
            dropdownItem={[
              { name: "6G" },
              { name: "7G" },
              { name: "8G" },
              { name: "11G" },
              { name: "13G" },
              { name: "15G" },
              { name: "23G" },
            ]}
            value={btsMain?.section22?.frequency}
          />
          <DetailInput
            label='Konfigurasi'
            section='22'
            value={btsMain?.section22?.konfigurasi}
          />
          <DetailInput
            label='Kapasitas'
            section='22'
            value={btsMain?.section22?.kapasitas}
          />
          <DetailDropdown
            label='Ukuran Ant (Main)'
            section='22'
            dropdownItem={[
              { name: "0.3" },
              { name: "0.6" },
              { name: "0.9" },
              { name: "1.2" },
              { name: "1.8" },
              { name: "2.4" },
            ]}
            value={btsMain?.section22?.ukuranantmain}
          />
          <DetailDropdown
            label='Ukuran Ant (SD)'
            section='22'
            dropdownItem={[
              { name: "0.3" },
              { name: "0.6" },
              { name: "0.9" },
              { name: "1.2" },
              { name: "1.8" },
              { name: "2.4" },
            ]}
            value={btsMain?.section22?.ukuranantsd}
          />
          <DetailInput
            label='Site A Antenna Support'
            section='22'
            value={btsMain?.section22?.siteaantennasupport}
          />
          <DetailInput
            label='Site B Antenna Support'
            section='22'
            value={btsMain?.section22?.sitebantennasupport}
          />
          <DetailInput
            label='Peta Digital'
            section='22'
            value={btsMain?.section22?.petadigital}
          />
          <DetailInput
            label='Kandidat Site A'
            section='22'
            value={btsMain?.section22?.kandidatsitea}
          />
          <DetailInput
            label='Kandidat Site B'
            section='22'
            value={btsMain?.section22?.kandidatsiteb}
          />
          <DetailInput
            label='Path Length'
            section='22'
            satuan='km'
            value={btsMain?.section22?.pathlength}
          />
          <DetailInput
            label='Site A Azimuth'
            section='22'
            satuan='derajat'
            value={btsMain?.section22?.siteaazimuth}
          />
          <DetailInput
            label='Site B Azimuth'
            section='22'
            satuan='derajat'
            value={btsMain?.section22?.sidebazimuth}
          />
          <DetailInput
            label='Site A Elevasi'
            section='22'
            satuan='meter'
            value={btsMain?.section22?.siteaelevasi}
          />
          <DetailInput
            label='Site B Elevasi'
            section='22'
            satuan='meter'
            value={btsMain?.section22?.sitebelevasi}
          />
          <DetailInput
            label='Site A Sudut Vertical (*)'
            section='22'
            satuan='derajat'
            value={btsMain?.section22?.siteasudutvertical}
          />
          <DetailInput
            label='Site B Sudut Vertical (*)'
            section='22'
            satuan='derajat'
            value={btsMain?.section22?.sitebsudutvertical}
          />
          <DetailInput
            label='Site A Tinggi Antenna'
            section='22'
            satuan='meter'
            value={btsMain?.section22?.siteatinggiantenna}
          />
          <DetailInput
            label='Site A Tinggi Antenna SD'
            section='22'
            satuan='meter'
            value={btsMain?.section22?.siteatinggiantennasd}
          />
          <DetailInput
            label='Site B Tinggi Antenna'
            section='22'
            satuan='meter'
            value={btsMain?.section22?.sitebtinggiantenna}
          />
          <DetailInput
            label='Site B SD Tinggi Antenna SD'
            section='22'
            satuan='meter'
            value={btsMain?.section22?.sitebsdtinggiantennasd}
          />
        </div>
        <div className='mb-2'>
          <p className={`font-weight-normal text-info`}>
            (*) Site bisa saja memiliki lebih dari 1 link ke site lain, tapi
            kontraktor cukup mengisi informasi untuk uplink site saja.
          </p>
          <p className={`font-weight-normal text-danger`}>
            Site A adalah site terdekat kearah terminal, Site B adalah site
            terdekat kearah POI (Northbound).
          </p>
        </div>
        <NextPrevButtons
          section='22'
          setactiveTab={setactiveTab}
          kodeSurvey={kodeSurvey}
          nextDisabled={false}
          prevDisabled={true}
          simpanDisabled={false}
        />
      </>
    </CardBody>
  );
}

export default Section22;

// useEffect(() => {
//   if (localBtsMain !== null) {
//     dispatch(setBtsMain(localBtsMain));
//   } else {
//     dispatch(
//       setBtsMain({
//         ...btsMain,
//         section22: {
//           ...btsMain?.section22,
//           siteaidmapnearend: "",
//           sitebidfarend: "",
//           frequency: "",
//           konfigurasi: "",
//           kapasitas: "",
//           ukuranantmain: "",
//           ukuranantsd: "",
//           siteaantennasupport: "",
//           sitebantennasupport: "",
//           petadigital: "",
//           kandidatsitea: "",
//           kandidatsiteb: "",
//           pathlength: "",
//           siteaazimuth: "",
//           sidebazimuth: "",
//           siteaelevasi: "",
//           sitebelevasi: "",
//           siteasudutvertical: "",
//           sitebsudutvertical: "",
//           siteatinggiantenna: "",
//           siteatinggiantennasd: "",
//           sitebtinggiantenna: "",
//           sitebsdtinggiantennasd: "",
//         },
//       })
//     );
//   }
// }, []);
