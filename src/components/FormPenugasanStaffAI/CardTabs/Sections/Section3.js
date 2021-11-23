import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import DetailInput from "../DetailInput.js";
import DetailDropdown from "../DetailDropdown.js";
import DetailImage from "../DetailImage.js";

// import redux
import { setAISection3 } from "../../../../store/formSurveyStaffAI/action";

import { setShowAlert } from "../../../../store/simpanFormAlert/action";

function Section3() {
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;

  // error state
  const [error, setError] = useState({
    akses: false,
    plang: false,
    marking: false,
    pln: false,
    denah: false,
    lanskap: false,
  });

  console.log(`console log nya error`, error);

  const toggleErrorAkses = (boolean) => {
    setError({
      ...error,
      akses: boolean,
    });
  };
  const toggleErrorPlang = (boolean) => {
    setError({
      ...error,
      plang: boolean,
    });
  };
  const toggleErrorMarking = (boolean) => {
    setError({
      ...error,
      marking: boolean,
    });
  };
  const toggleErrorPLN = (boolean) => {
    setError({
      ...error,
      pln: boolean,
    });
  };
  const toggleErrorDenah = (boolean) => {
    setError({
      ...error,
      denah: boolean,
    });
  };
  const toggleErrorLanskap = (boolean) => {
    setError({
      ...error,
      lanskap: boolean,
    });
  };

  // == LOCAL STORAGE
  let strSection3 = "aisection3";
  let localSection3 = JSON.parse(
    window.localStorage.getItem(strSection3.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const aisection3 = useSelector((state) => state.FormSurveyStaffAI.aisection3);

  useEffect(() => {
    // window.localStorage.removeItem("downloadSpeed");
    if (localSection3 !== null) {
      dispatch(setAISection3(localSection3));
    } else {
      // reset redux store ketika tidak ada local storage terdeteksi
      dispatch(
        setAISection3({
          fileAkses: "",
          fileAksesname: "",
          filePlang: "",
          filePlangname: "",
          fileMarking: "",
          fileMarkingname: "",
          filePln: "",
          filePlnname: "",
          fileDenah: "",
          fileDenahname: "",
          fileLanskap: "",
          fileLanskapname: "",
          download: "",
          upload: "",
          upload: "",
          tipenetwork: "",
        })
      );
    }
  }, []);

  const handleSimpanLocalStorage = () => {
    window.localStorage.setItem(
      strSection3.concat(kodeSurvey),
      JSON.stringify(aisection3)
    );
  };

  return (
    <CardBody>
      <>
        <span className={style.section}>Section 3</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Foto-foto Kondisi Lapangan
        </CardTitle>
        <DetailImage
          label='Akses Jalan Menuju Ke Lokasi'
          section='3'
          required={true}
          toggleErrorAkses={toggleErrorAkses}
        />
        <DetailImage
          label='Plang'
          section='3'
          required={true}
          toggleErrorPlang={toggleErrorPlang}
        />
        <DetailImage
          label='Marking Posisi Perangkat'
          section='3'
          required={true}
          toggleErrorMarking={toggleErrorMarking}
        />
        <DetailImage
          label='KWH Meter PLN/Genset'
          section='3'
          required={true}
          toggleErrorPLN={toggleErrorPLN}
        />
        <DetailImage
          label='Gambar Denah Lokasi / Lanskap Bangunan'
          section='3'
          required={true}
          toggleErrorDenah={toggleErrorDenah}
        />
        <DetailImage
          label='Berita Acara'
          section='3'
          required={true}
          toggleErrorLanskap={toggleErrorLanskap}
        />
        <DetailDropdown
          label='Tipe Network'
          section='3'
          dropdownItem={[
            { name: "Wifi", hasInput: false },
            { name: "LAN", hasInput: false },
            { name: "5G", hasInput: false },
            { name: "4G", hasInput: true },
            { name: "3G", hasInput: true },
          ]}
          value={aisection3.tipenetwork}
        />
        {/* ================ OpenSpeedTester Start */}
        <div style={{ textAlign: "center" }}>
          <div style={{ minHeight: "360px" }}>
            <div
              style={{
                width: "100%",
                height: "0",
                paddingBottom: "50%",
                position: "relative",
              }}
            >
              <iframe
                src='//openspeedtest.com/Get-widget.php'
                frameborder='0'
                style={{
                  border: "none",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  minHeight: "360px",
                  overflow: "hidden !important",
                }}
              ></iframe>
            </div>
          </div>
        </div>
        {/* ================ OpenSpeedTester End */}
        <div className={`d-flex flex-row w-100 gap16`}>
          <DetailInput
            label='Download Speed'
            section='3'
            type='number'
            satuan='Mbps'
            value={aisection3?.download?.replace(/(\.\d{2})\d+/g, "$1")}
          />
          <DetailInput
            label='Upload Speed'
            section='3'
            type='number'
            satuan='Mbps'
            value={aisection3?.upload?.replace(/(\.\d{2})\d+/g, "$1")}
          />
        </div>
        <Col lg={12} className='px-0 py-2'>
          <div
            className={`d-flex flex-row mx-auto justify-content-end ${style.modalButtonWrapper}`}
          >
            <button
              className={`${style.yesButton}`}
              onClick={() => {
                handleSimpanLocalStorage();

                dispatch(setShowAlert(true));
                setTimeout(() => {
                  dispatch(setShowAlert(false));
                }, 3000);
              }}
              disabled={Object.values(error).some((x) => x === true)}
            >
              Simpan
            </button>
          </div>
        </Col>
      </>
    </CardBody>
  );
}

export default Section3;
