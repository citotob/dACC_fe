import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBtsFormTab } from "../../../store/btsFormTab/action";
import { Card, CardBody, Modal } from "reactstrap";

import { Link } from "react-router-dom";

// IMPORT STYLE
import style from "./style.module.scss";

// import icons
import mapIcon from "../../../assets/icons/map-icon.svg";

import CardMap from "../CardMap/index";
import CardTabs from "../CardTabs";
import TestMap from "../../TestMap/TestMap";

function CardInfo(props) {
  const moment = require("moment");
  const [visibility, setVisibility] = useState({});
  const toggleVisibility = (id) => {
    setVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const [selectedLokasi, setselectedLokasi] = useState("");
  const [selectedLat, setselectedLat] = useState("");
  const [selectedLong, setselectedLong] = useState("");

  const data = props?.datatable;
  const btsData = props?.btsData;

  // console.log('data table dalam cardInfo survey BTS dari api :', props);
  // console.log('btsData dalam cardInfo survey BTS dari api :', btsData);

  // modal states
  const [modalMapOpen, setmodalMap] = useState(false);
  const [modalGnetOpen, setmodalGnet] = useState(false);

  // redux
  const dispatch = useDispatch();

  // state tabs ssr and MW Los Survey and FO Survey
  const [toggleButtonSSR, settoggleButtonSSR] = useState(
    `${style.togActiveBtn}`
  );
  const [toggleButtonMW, settoggleButtonMW] = useState(``);
  const [toggleButtonFO, settoggleButtonFO] = useState(``);
  const formType = useSelector((state) => state.BtsFormTypeReducer.formType);
  // modal functions

  function tog_map() {
    setmodalMap(!modalMapOpen);
    removeBodyCss();
  }
  function tog_gnet() {
    setmodalGnet(!modalGnetOpen);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  // card info
  const Info = ({ data, id }) => {
    let namaLokasi = data?.namaLokasi
      ? data?.namaLokasi
      : btsData[0]?.data[0]?.kategori;

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

    // Modal component
    const modalComponentGnet = () => {
      return (
        <Modal
          isOpen={modalGnetOpen}
          size='xl'
          centered={true}
          toggle={() => {
            tog_gnet();
          }}
        >
          {/* <div className={`modal-body ${style.modalBody}`}> */}
          <div className='m-4 pb-4'>
            <TestMap data={data} />
          </div>
        </Modal>
      );
    };
    return (
      <Card>
        {modalComponentMap()}
        {modalComponentGnet()}
        <CardBody className={style.cardBody} id='detail-survey'>
          <div className={style.cardTitleWrapper}>
            <div className='d-flex col-6 flex-column'>
              <span className='d-flex flex-row align-items-center'>
                <span className={style.cardTitle}>Informasi</span>
                <button
                  className={`text-left ml-2 ${style.lihatDetailButton}`}
                  onClick={() => (data.page1 ? toggleVisibility(id) : "")}
                >
                  {visibility[id]
                    ? "Sembunyikan Detail"
                    : !visibility[id] && data.page1
                    ? "Lihat Detail"
                    : "Tidak Ada Detail"}
                </button>
                <Link
                  to={{
                    pathname: `/admin/hasil-survey/BTS/PDF/${data._id}`,
                    // pathname: `/admin/gnettrack/1`,
                    state: {
                      datatable: data,
                      // activeTab: activeTab,
                    },
                  }}
                >
                  <button className={`${style.unduhButton} ml-2`}>
                    Unduh PDF
                  </button>
                </Link>
              </span>

              <span>
                Tanggal Pembuatan :{" "}
                {moment(data?.tanggal_pembuatan).format("DD/MM/YYYY")}
              </span>
              <span>Submitted by {data?.user_id?.name ?? "..."}</span>

              {/* ================ SSR MW LOS FO Buttons ============  */}
              {visibility[id] ? (
                <div className={`${style.toggleTableButtonWrapper} mt-2`}>
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
                </div>
              ) : null}
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
                    setselectedLokasi(namaLokasi?.toUpperCase());
                    setselectedLat(data?.latitude);
                    setselectedLong(data?.longitude);
                  }}
                  className={`${style.titikLokasiButton} ${style.titikLokasiItems}`}
                >
                  {data !== undefined || btsData !== undefined
                    ? namaLokasi
                    : "-"}
                  {"     "}
                  {data !== undefined ? data?.latitude : "-"} ||{" "}
                  {data !== undefined ? data?.longitude : "-"}
                </button>
                <button
                  onClick={() => {
                    tog_map();
                    setselectedLokasi(namaLokasi.toUpperCase());
                    setselectedLat(data?.latitude);
                    setselectedLong(data?.longitude);
                  }}
                  className={`${style.mapButton} ${style.titikLokasiItems}`}
                >
                  <img src={mapIcon} alt='map icon'></img>
                </button>
                <button
                  onClick={() => {
                    tog_gnet();
                  }}
                  className={`${style.mapButton} ${style.titikLokasiItems}`}
                  style={{ width: "150px", fontWeight: "bold" }}
                >
                  View KML
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
      {data
        ? data?.data
            .sort((a, b) =>
              a.tanggal_pembuatan > b.tanggal_pembuatan ? 1 : -1
            )
            .map((data, id) => {
              // console.log("data yang diturunin : ", data);
              return (
                <span key={id}>
                  <Info data={data} id={id} />
                  {visibility[id] ? <CardTabs datatable={data} /> : null}
                  {/* <CardTabs datatable={data} /> */}
                </span>
              );
            })
        : "Menunggu Data..."}
    </span>
  );
}

export default CardInfo;
