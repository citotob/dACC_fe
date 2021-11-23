import React, { useState, useEffect } from "react";

import { Card, CardBody, Modal } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { setBtsFormTab } from "../../../store/btsFormTab/action";

// IMPORT STYLE
import style from "./style.module.scss";

// import icons
import mapIcon from "../../../assets/icons/map-icon.svg";

import CardMap from "../CardMap/index";
import CardTabs from "../CardTabs";

function CardInfo(props) {
  const [visibility, setVisibility] = useState({});
  const toggleVisibility = (id) => {
    setVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const [selectedLokasi, setselectedLokasi] = useState("");
  const [selectedLat, setselectedLat] = useState("");
  const [selectedLong, setselectedLong] = useState("");

  const data = props?.datatable;
  const [modalMapOpen, setmodalMap] = useState(false);

  // modal functions
  function tog_map() {
    setmodalMap(!modalMapOpen);
    removeBodyCss();
  }
  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  // redux
  const dispatch = useDispatch();

  // state tabs ssr and MW Los Survey and FO Survey
  const [toggleButtonSSR, settoggleButtonSSR] = useState(
    `${style.togActiveBtn}`
  );
  const [toggleButtonMW, settoggleButtonMW] = useState(``);
  const [toggleButtonFO, settoggleButtonFO] = useState(``);
  const [stateMWFOTabs, setStateMWFOTabs] = useState(false);
  // redux
  // const FormSurveyStaff = useSelector((state) => state.FormSurveyStaff);

  // card info
  const Info = ({ data }) => {
    let namaLokasi = data?.lokasisurvey?.desa?.name;
    let latitude = data?.lokasisurvey?.latitude;
    let longitude = data?.lokasisurvey?.longitude;
    const formType = useSelector((state) => state.BtsFormTypeReducer.formType);
    const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);

    useEffect(() => {
      if (btsMain?.section4?.menggunakantransmisivsat === "Tidak") {
        setStateMWFOTabs(true);
      } else {
        setStateMWFOTabs(false);
      }
    }, [btsMain?.section4?.menggunakantransmisivsat]);
    // Modal component
    const modalComponentMap = () => {
      return (
        <Modal
          isOpen={modalMapOpen}
          size='lg'
          centered={true}
          toggle={() => {
            tog_map();
          }}
        >
          {/* <div className={`modal-body ${style.modalBody}`}> */}
          <div className='m-4 pb-4'>
            <CardMap
              lat={selectedLat}
              long={selectedLong}
              namaLokasi={selectedLokasi}
            />
          </div>
        </Modal>
      );
    };

    return (
      <Card>
        {modalComponentMap()}
        <CardBody
          className={style.cardBody}
          style={{ padding: "10px", paddingBottom: "10px" }}
        >
          <div className={style.cardTitleWrapper}>
            <div className='d-flex col-6 flex-row align-items-center gap24'>
              <span className='d-flex flex-row align-items-center'>
                <span className={style.cardTitle}>Form Hasil Survey</span>
              </span>
              {/* ====================== Toggle Buttons Akses Internet / BTS ===== */}
              <div className={`${style.toggleTableButtonWrapper}`}>
                <button
                  className={`${
                    formType === "ssr" ? toggleButtonSSR : ""
                  } px-3 py-2 rounded mr-1`}
                  onClick={() => {
                    settoggleButtonSSR(`${style.togActiveBtn}`);
                    settoggleButtonMW("");
                    settoggleButtonFO("");

                    dispatch(setBtsFormTab("ssr"));
                  }}
                >
                  SSR
                </button>

                {btsMain?.section4?.menggunakantransmisivsat !== "Ya" ? (
                  <>
                    <button
                      className={`${
                        formType === "mw" ? style.togActiveBtn : toggleButtonMW
                      } px-3 py-2 rounded mr-1`}
                      onClick={() => {
                        settoggleButtonSSR("");
                        settoggleButtonMW(`${style.togActiveBtn}`);
                        settoggleButtonFO("");

                        dispatch(setBtsFormTab("mw"));
                      }}
                    >
                      MW LOS Survey
                    </button>
                    <button
                      className={`${
                        formType === "fo" ? style.togActiveBtn : toggleButtonFO
                      } px-3 py-2 rounded mr-1`}
                      onClick={() => {
                        settoggleButtonSSR("");
                        settoggleButtonMW("");
                        settoggleButtonFO(`${style.togActiveBtn}`);

                        dispatch(setBtsFormTab("fo"));
                      }}
                    >
                      FO Survey
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
              {/* ====================== Toggle Buttos Akses Internet / BTS ===== */}
            </div>
            <div className='d-flex col-6 flex-row justify-content-end align-items-center'>
              <span className='d-flex flex-row justify-content-end'>
                <span
                  className={`d-flex align-items-center ${style.titikLokasi}`}
                >
                  Titik Lokasi:
                </span>

                <button
                  onClick={() => {
                    tog_map();
                    setselectedLokasi(namaLokasi);
                    // setselectedLokasi(data?.namaLokasi.toUpperCase());
                    setselectedLat(latitude);
                    // setselectedLat(data?.latitude);
                    setselectedLong(longitude);
                    // setselectedLong(data?.longitude);
                  }}
                  className={`${style.titikLokasiButton} ${style.titikLokasiItems}`}
                >
                  {namaLokasi} {latitude} || {longitude}
                </button>
                <button
                  onClick={() => {
                    tog_map();
                    setselectedLokasi(namaLokasi);
                    // setselectedLokasi(data?.namaLokasi.toUpperCase());
                    setselectedLat(latitude);
                    // setselectedLat(data?.latitude);
                    setselectedLong(longitude);
                    // setselectedLong(data?.longitude);
                  }}
                  className={`${style.mapButton} ${style.titikLokasiItems}`}
                >
                  <img src={mapIcon} alt='map icon'></img>
                </button>
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  };

  return (
    <span>
      <span>
        <Info data={data} />
        {/* {FormSurveyStaff ? <CardTabs datatable={data} /> : <></>} */}
        <CardTabs datatable={data} />
      </span>
      {/* {data ? (
        data.data.map((data, id) => {
          // console.log("data yang diturunin : ", data);
          return (
            <span key={id}>
              <Info data={data} id={id} />
              {visibility[id] ? <CardTabs datatable={data} /> : null}
            </span>
          );
        })
      ) : (
       
      )} */}
    </span>
  );
}

export default CardInfo;
