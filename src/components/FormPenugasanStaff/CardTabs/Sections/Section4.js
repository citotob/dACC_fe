import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle, Label } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import DetailRadio from "../DetailRadio";
import DetailDropdown from "../DetailDropdown";
import DetailImage from "../DetailImage";
import NextPrevButtons from "../NextPrevButtons";
import InfoText from "../InfoText";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";
import { setShowAlert } from "../../../../store/simpanFormAlert/action";

function Section4({ setactiveTab, db }) {
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection4 = "section4";
  let localSection4 = JSON.parse(
    window.localStorage.getItem(strSection4.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // == Redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section4 = useSelector(
    (state) => state.FormSurveyStaff.btsMain?.section4
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
  //         section4: {
  //           ...btsMain?.section4,
  //           menggunakantransmisivsat: "",
  //           penempatanantenna: "",
  //           mountingantenna: "",
  //           diameterantenna: "",
  //           tipeantennasatelit: "",
  //           satelityangakandigunakan: "",
  //           lampiranprintscreen: "",
  //           azimuth: "",
  //           elevasi: "",
  //           obstacle: "",
  //         },
  //       })
  //     );
  //   }
  // }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 4</span>
        <CardTitle className={`mb-5 mt-2 text26`}>Transmisi VSAT</CardTitle>
        <div className={`font-weight-bold`}>
          <DetailDropdown
            label='Menggunakan Transmisi VSAT'
            section='4'
            dropdownItem={[{ name: "Ya" }, { name: "Tidak" }]}
            value={btsMain?.section4?.menggunakantransmisivsat}
          />
        </div>
        {btsMain?.section4?.menggunakantransmisivsat === "Ya" && (
          <div className={`font-weight-bold`}>
            <DetailDropdown
              label='Penempatan Antenna'
              section='4'
              dropdownItem={[
                { name: "Ground" },
                { name: "Rooftop" },
                { name: "Wall Mounting" },
              ]}
              value={btsMain?.section4?.penempatanantenna}
            />
            <DetailDropdown
              label='Mounting Antenna'
              section='4'
              dropdownItem={[
                { name: "Non Penetrating" },
                { name: "Penetrating" },
                { name: "Ground" },
                { name: "Rooftop" },
                { name: "Wall Mounting" },
              ]}
              value={btsMain?.section4?.mountingantenna}
            />
            <DetailDropdown
              label='Diameter Antenna'
              section='4'
              dropdownItem={[
                { name: "1.3 meter" },
                { name: "1.8 meter" },
                { name: "2.4 meter" },
              ]}
              value={btsMain?.section4?.diameterantenna}
            />
            <DetailDropdown
              label='Tipe Antenna Satelit'
              section='4'
              dropdownItem={[
                { name: "Ku-Band" },
                { name: "Ka-Band" },
                { name: "C-Band" },
                { name: "C-Band Extended" },
              ]}
              value={btsMain?.section4?.tipeantennasatelit}
            />
            <DetailDropdown
              label='Satelit Yang Akan Digunakan'
              section='4'
              dropdownItem={[
                { name: "PSN Nusantara Satu (146 deg EAST)" },
                { name: "JCSAT 4B (124 Deg. EAST)" },
                { name: "Apstart (138 Deg EAST)" },
                { name: "Asiasat 9 (122 Deg. EAST)" },
                { name: "SES-12 ( 95 Deg. EAST)" },
              ]}
              value={btsMain?.section4?.satelityangakandigunakan}
            />
            {btsMain?.section4?.satelityangakandigunakan !== "" && (
              <DetailImage
                label='Lampiran Print Screen'
                section='4'
                asterisk='Lampirkan hasil print screen dari satfinder dalam mensurvey seluruh Satelit yang disebutkan diatas.'
              />
            )}
            {btsMain?.section4?.lampiranprintscreen !== "" && (
              <>
                <DetailInput
                  label='Azimuth'
                  section='4'
                  type='number'
                  satuan='meter'
                  value={btsMain?.section4?.azimuth}
                />
                <DetailInput
                  label='Elevasi'
                  section='4'
                  type='number'
                  satuan='meter'
                  value={btsMain?.section4?.elevasi}
                />
                <DetailInput
                  label='Obstacle'
                  section='4'
                  type='text'
                  value={btsMain?.section4?.obstacle}
                />
              </>
            )}
            <InfoText text1='Gunakan Satfinder app untuk menentukan lokasi satelit' />
          </div>
        )}
        {btsMain?.section4?.menggunakantransmisivsat !== "Ya" && (
          <InfoText text1='Silahkan isi form MW LOS atau FO' />
        )}
        <NextPrevButtons
          section='4'
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

export default Section4;
