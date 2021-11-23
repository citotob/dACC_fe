import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import DetailDropdown from "../DetailDropdown";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section25({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection24 = "section24";
  let localSection24 = JSON.parse(
    window.localStorage.getItem(strSection24.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section24 = useSelector(
    (state) => state.FormSurveyStaff.btsMain?.section24
  );

  useEffect(() => {
    // == sementara tidak pakai indexedDB
  }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 24</span>
        <CardTitle className={`mb-5 mt-2 text26`}>Hasil Survey LOS</CardTitle>
        <div className={`font-weight-bold`}>
          <DetailInput
            label='Site A Latitude (DD Format)'
            section='24'
            type='text'
            value={btsMain?.section24?.sitealatitudeddformat}
          />
          <DetailInput
            label='Site A Longitude (DD Format)'
            section='24'
            type='text'
            value={btsMain?.section24?.sitealongitudeddformat}
          />
          <DetailInput
            label='Site B Latitude (DD Format)'
            section='24'
            type='text'
            value={btsMain?.section24?.siteblatitudeddformat}
          />
          <DetailInput
            label='Site B Longitude (DD Format)'
            section='24'
            type='text'
            value={btsMain?.section24?.siteblongitudeddformat}
          />
          <DetailDropdown
            label='Site A Tipe Tower'
            section='24'
            dropdownItem={[
              { name: "Guyed Mast" },
              { name: "Guyed Mast Tubular" },
              { name: "Self Supporting Tower (Heavy)" },
              { name: "Self Supporting Tower (Medium)" },
              { name: "Self Supporting Tower (Light)" },
              { name: "Lainnya" },
            ]}
            value={btsMain?.section24?.siteatipetower}
          />
          {btsMain?.section24?.siteatipetower === "Lainnya" && (
            <DetailInput
              isExtraInput={true}
              label='Site A Tipe Tower Lainnya'
              section='24'
              type='text'
              value={btsMain?.section24?.siteatipetowerlainnya}
            />
          )}
          <DetailInput
            label='Site A Tinggi Tower'
            section='24'
            satuan='meter'
            value={btsMain?.section24?.siteatinggitower}
          />
          <DetailDropdown
            label='Site B Tipe Tower'
            section='24'
            dropdownItem={[
              { name: "Guyed Mast" },
              { name: "Guyed Mast Tubular" },
              { name: "Self Supporting Tower (Heavy)" },
              { name: "Self Supporting Tower (Medium)" },
              { name: "Self Supporting Tower (Light)" },
              { name: "Lainnya" },
            ]}
            value={btsMain?.section24?.sitebtipetower}
          />
          {btsMain?.section24?.sitebtipetower === "Lainnya" && (
            <DetailInput
              isExtraInput={true}
              label='Site B Tipe Tower Lainnya'
              section='24'
              type='text'
              value={btsMain?.section24?.sitebtipetowerlainnya}
            />
          )}
          <DetailInput
            label='Site B Tinggi Tower'
            section='24'
            type='number'
            satuan='meter'
            value={btsMain?.section24?.sitebtinggitower}
          />
          <DetailInput
            label='Rata-rata Tinggi Pohon'
            section='24'
            type='number'
            satuan='meter'
            value={btsMain?.section24?.rataratatinggipohon}
            asterisk='Asumsi +/- meter'
          />
          <DetailInput
            label='Site A Proposed tinggi min Antenna (Main)'
            section='24'
            type='number'
            satuan='meter'
            value={btsMain?.section24?.siteaproposedtinggiminantennamain}
          />
          <DetailInput
            label='Site A Proposed tinggi min Antenna (SD)'
            section='24'
            type='number'
            satuan='meter'
            value={btsMain?.section24?.siteaproposedtinggiminantennasd}
          />
          <DetailInput
            label='Site B Proposed tinggi min Antenna (Main)'
            section='24'
            type='number'
            satuan='meter'
            value={btsMain?.section24?.sitebproposedtinggiminantennamain}
          />
          <DetailInput
            label='Site B Proposed tinggi min Antenna (SD)'
            section='24'
            type='number'
            satuan='meter'
            value={btsMain?.section24?.sitebproposedtinggiminantennasd}
          />

          <DetailDropdown
            label='Kesimpulan Hasil dari Survey LOS'
            section='24'
            dropdownItem={[{ name: "LOS OK" }, { name: "Tidak LOS" }]}
            value={btsMain?.section24?.kesimpulanhasildarisurveylos}
          />
        </div>
        <NextPrevButtons
          section='24'
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

export default Section25;

// useEffect(() => {
//   if (localBtsMain !== null) {
//     dispatch(setBtsMain(localBtsMain));
//   } else {
//     dispatch(
//       setBtsMain({
//         ...btsMain,
//         section24: {
//           ...btsMain?.section24,
//           sitealatitudeddformat: "",
//           sitealongitudeddformat: "",
//           siteblatitudeddformat: "",
//           siteblongitudeddformat: "",
//           siteatipetower: "",
//           siteatipetowerlainnya: "",
//           siteatinggitower: "",
//           sitebtipetower: "",
//           sitebtipetowerlainnya: "",
//           sitebtinggitower: "",
//           rataratatinggipohon: "",
//           siteaproposedtinggiminantennamain: "",
//           siteaproposedtinggiminantennasd: "",
//           sitebproposedtinggiminantennamain: "",
//           sitebproposedtinggiminantennasd: "",
//           kesimpulanhasildarisurveylos: "",
//         },
//       })
//     );
//   }
// }, []);
