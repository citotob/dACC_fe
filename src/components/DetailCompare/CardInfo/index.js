import React, { useState } from "react";

import { Card, CardBody, Modal } from "reactstrap";

// IMPORT STYLE
import style from "./style.module.scss";

// import icons
import mapIcon from "../../../assets/icons/map-icon.svg";

import CardMap from "../CardMap/index";
import CardTabs from "../CardTabs";

function CardInfo(props) {
  const moment = require("moment");
  // const [toggleTab, settoggleTab] = useState(false);
  const [visibility, setVisibility] = useState({});
  const toggleVisibility = (id) => {
    setVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  // const [currentData, setcurrentData] = useState({});
  // const toggleCurrentData = (id) => {
  //   setcurrentData((prev) => (prev.currentData !== id ? id : "1"));
  // };
  const [selectedLokasi, setselectedLokasi] = useState("");
  const [selectedLat, setselectedLat] = useState("");
  const [selectedLong, setselectedLong] = useState("");
  // console.log("currentData", currentData);

  // state compare
  const [arrayTemp, setArrayTemp] = useState([1, 2]);

  const data = props?.datatable;
  // console.log("data table dalam cardInfo dari api :", data.data);
  // let lat = data?.data[0]?.latitude;
  // let long = data?.data[0]?.longitude;
  // console.log(lat, long);
  // let namaLokasi = {
  //   desa: data?.lokasi?.desa?.name,
  //   kecamatan: data?.lokasi?.kecamatan?.name,
  //   kabupaten: data?.lokasi?.kabupaten?.name,
  //   provinsi: data?.lokasi?.desa?.name,
  // };
  // console.log("location names, cardInfo : ", namaLokasi);

  // modal states
  const [modalMapOpen, setmodalMap] = useState(false);

  // modal functions
  function tog_map() {
    setmodalMap(!modalMapOpen);
    removeBodyCss();
  }
  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  // card info
  const Info = ({ data, id }) => {
    let namaLokasi = data?.namaLokasi;
    // console.log("namalokasi di dalam Info :", namaLokasi);
    // let lat = data?.latitude;
    // let long = data?.longitude;

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

        <CardBody className={style.cardBody}>
          <div
            className={`d-flex flex-row justify-content-between ${style.cardTitleWrapper}`}
          >
            <div className='d-flex flex-column'>
              <span className='d-flex flex-row align-items-center'>
                <span className={style.cardTitle}>Informasi</span>
                <button
                  className={`text-left ml-2 ${style.lihatDetailButton}`}
                  onClick={() => toggleVisibility(id)}
                >
                  {visibility[id] ? "Sembunyikan Detail" : "Lihat Detail"}
                </button>
              </span>
              <span>
                Tanggal Pembuatan :{" "}
                {moment(data?.tanggal_pembuatan).format("DD/MM/YYYY")}
              </span>
            </div>
            <div
              className={`d-flex flex-row justify-content-end align-items-center`}
            >
              {arrayTemp.map((item, i) => {
                return (
                  <div key={i}>
                    <span className='d-flex flex-row justify-content-end'>
                      <span
                        className={`d-flex align-items-center ${style.titikLokasi}`}
                      >
                        Titik Lokasi {item}:
                      </span>

                      <button
                        onClick={() => {
                          tog_map();
                          setselectedLokasi(data?.namaLokasi.toUpperCase());
                          setselectedLat(data?.latitude);
                          setselectedLong(data?.longitude);
                        }}
                        className={`${style.titikLokasiButton} ${style.titikLokasiItems}`}
                      >
                        {data !== undefined ? data?.namaLokasi : "-"}
                        {"     "}
                        {data !== undefined ? data?.latitude : "-"} ||{" "}
                        {data !== undefined ? data?.longitude : "-"}
                      </button>
                      <button
                        onClick={() => {
                          tog_map();
                          setselectedLokasi(data?.namaLokasi.toUpperCase());
                          setselectedLat(data?.latitude);
                          setselectedLong(data?.longitude);
                        }}
                        className={`${style.mapButton} ${style.titikLokasiItems}`}
                      >
                        <img src={mapIcon} alt='map icon'></img>
                      </button>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardBody>
      </Card>
    );
  };

  return (
    <span>
      {/* <Info data={data.data[0]} /> */}
      <CardTabs />
      {/* {data
        ? data.data.map((data, id) => {
            // console.log("data yang diturunin : ", data);
            return (
              <span key={id}>
                <Info data={data} id={id} />
                {visibility[id] ? <CardTabs datatable={data} /> : null}
              </span>
            );
          })
        : "Menunggu Data..."} */}
    </span>
  );
}

export default CardInfo;
