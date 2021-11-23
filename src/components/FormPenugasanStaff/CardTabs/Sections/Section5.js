import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle, Label } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import DetailDropdown from "../DetailDropdown.js";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section5({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection5 = "section5";
  let localSection5 = JSON.parse(
    window.localStorage.getItem(strSection5.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section5 = useSelector(
    (state) => state.FormSurveyStaff.btsMain?.section5
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
  //         section5: {
  //           ...btsMain?.section5,
  //           posisitowerpole: "",
  //           statuskepemilikanlahan: "",
  //           statuskepemilikanlahanlainnya: "",
  //           namapemiliklahan: "",
  //           namapemiliklahan2: "",
  //           nomorpemiliklahan: "",
  //           nomorpemiliklahan2: "",
  //           statuskondisilahan: "",
  //           statuskondisilahanlainnya: "",
  //           kondisisosial: "",
  //           keamanan: "",
  //           luaslahan: "",
  //           panjang: "",
  //           lebar: "",
  //         },
  //       })
  //     );
  //   }
  // }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 5</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Informasi Umum Lahan
        </CardTitle>
        <div className={`font-weight-bold`}>
          <DetailDropdown
            label='Posisi Tower/Pole'
            section='5'
            dropdownItem={[
              { name: "Di Permukiman" },
              { name: "Jarak dari permukiman 100 Meter (Max 600 meter)" },
            ]}
            value={btsMain?.section5?.posisitowerpole}
          />
          <DetailDropdown
            label='Status Kepemilikan Lahan'
            section='5'
            dropdownItem={[
              { name: "Pemerintah" },
              { name: "Individu/Perusahaan" },
              { name: "Hutan Lindung" },
              { name: "Tanah Adat" },
              { name: "Kawasan Konservasi" },
              { name: "Hutan Produksi" },
              { name: "Lainnya" },
            ]}
            value={btsMain?.section5?.statuskepemilikanlahan}
          />
          {btsMain?.section5?.statuskepemilikanlahan === "Lainnya" && (
            <DetailInput
              isExtraInput={true}
              label='Status Kepemilikan Lahan Lainnya'
              section='5'
              type='text'
              value={btsMain?.section5?.statuskepemilikanlahanlainnya}
            />
          )}
          <DetailInput
            label='Nama Pemilik Lahan'
            section='5'
            type='text'
            value={btsMain?.section5?.namapemiliklahan}
          />
          <DetailInput
            label='Nomor Pemilik Lahan'
            section='5'
            type='number'
            value={btsMain?.section5?.nomorpemiliklahan}
          />
          <DetailInput
            label='Nama Pemilik Lahan 2'
            section='5'
            type='text'
            value={btsMain?.section5?.namapemiliklahan2}
          />
          <DetailInput
            label='Nomor Pemilik Lahan 2'
            section='5'
            type='number'
            value={btsMain?.section5?.nomorpemiliklahan2}
          />
          <DetailDropdown
            label='Status Kondisi Lahan'
            section='5'
            dropdownItem={[
              { name: "Kosong" },
              { name: "Rumah" },
              { name: "Lainnya" },
            ]}
            value={btsMain?.section5?.statuskondisilahan}
          />
          {btsMain?.section5?.statuskondisilahan === "Lainnya" && (
            <DetailInput
              isExtraInput={true}
              label='Status Kondisi Lahan Lainnya'
              section='5'
              type='text'
              value={btsMain?.section5?.statuskondisilahanlainnya}
            />
          )}
          <DetailDropdown
            label='Kondisi Sosial'
            section='5'
            dropdownItem={[
              { name: "Kooperatif" },
              { name: "Kurang Kooperatif" },
              { name: "Tidak Kooperatif" },
            ]}
            value={btsMain?.section5?.kondisisosial}
          />
          <DetailDropdown
            label='Keamanan'
            section='5'
            dropdownItem={[{ name: "Aman" }, { name: "Tidak Aman" }]}
            value={btsMain?.section5?.keamanan}
          />
          <Label>Luas Lahan</Label>
          <div className='form-group d-flex flex-row align-items-center gap8'>
            <DetailInput
              label='Panjang'
              section='5'
              type='number'
              satuan='meter'
              value={btsMain?.section5?.panjang}
            />
            <span> x </span>
            <DetailInput
              label='Lebar'
              section='5'
              type='number'
              satuan='meter'
              value={btsMain?.section5?.lebar}
            />
          </div>
        </div>
        <NextPrevButtons
          section='5'
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

export default Section5;
