import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailDropdown from "../DetailDropdown.js";
import NextPrevButtons from "../NextPrevButtons";

// import redux
import { setBtsMain } from "../../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../../helpers/destroyReduxSessions/destroyBtsForm";

function Section9({ setactiveTab, db }) {
  // location
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection9 = "section9";
  let localSection9 = JSON.parse(
    window.localStorage.getItem(strSection9.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section9 = useSelector((state) => state.FormSurveyStaff.section9);

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
  //         section9: {
  //           ...btsMain?.section9,
  //           statuskepemilikansurattanah: "",
  //           statuskepemilikansurattanahlainnya: "",
  //           ijinyangdibutuhkan: "",
  //           ijinyangdibutuhkanlainnya: "",
  //           idpemiliklahan: "",
  //         },
  //       })
  //     );
  //   }
  // }, []);

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 9</span>
        <CardTitle className={`mb-5 mt-2 text26`}>Perijinan</CardTitle>
        <div className={`font-weight-bold`}>
          <DetailDropdown
            label='Status Kepemilikan Surat Tanah'
            section='9'
            dropdownItem={[
              { name: "SHM" },
              { name: "Girik/Persil" },
              { name: "Lainnya" },
            ]}
            value={btsMain?.section9?.statuskepemilikansurattanah}
          />
          {btsMain?.section9?.statuskepemilikansurattanah === "Lainnya" && (
            <DetailDropdown
              label='Status Kepemilikan Surat Tanah Lainnya'
              section='9'
              dropdownItem={[
                { name: "Tanah Adat" },
                { name: "Tanah Hibah" },
                { name: "Belum Ada" },
              ]}
              value={btsMain?.section9?.statuskepemilikansurattanahlainnya}
            />
          )}
          <DetailDropdown
            label='Ijin yang Dibutuhkan'
            section='9'
            dropdownItem={[
              { name: "Ijin Warga" },
              { name: "Ijin Prinsip" },
              { name: "Khusus (Lingkungan)" },
              { name: "Lainnya" },
            ]}
            value={btsMain?.section9?.ijinyangdibutuhkan}
          />
          {btsMain?.section9?.ijinyangdibutuhkan === "Lainnya" && (
            <DetailDropdown
              label='Ijin yang Dibutuhkan Lainnya'
              section='9'
              dropdownItem={[{ name: "TNI" }, { name: "Negara" }]}
              value={btsMain?.section9?.ijinyangdibutuhkanlainnya}
            />
          )}
          <DetailDropdown
            label='ID Pemilik Lahan'
            section='9'
            dropdownItem={[
              { name: "KTP" },
              { name: "Passport" },
              { name: "KTA (TNI / State)" },
            ]}
            value={btsMain?.section9?.idpemiliklahan}
          />
        </div>
        <NextPrevButtons
          section='9'
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

export default Section9;
