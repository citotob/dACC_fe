import React, { useState } from "react";

import { Card, CardBody, Modal } from "reactstrap";

// IMPORT STYLE
import style from "./style.module.scss";

// import icons
import mapIcon from "../../../assets/icons/map-icon.svg";

import CardMap from "../CardMap/index";
import CardTabs from "../CardTabs";

import get from "lodash/get";

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

    // Modal component
    const modalComponentMap = () => {
      return (
        <Modal
          isOpen={modalMapOpen}
          size="lg"
          centered={true}
          toggle={() => {
            tog_map();
          }}
        >
          {/* <div className={`modal-body ${style.modalBody}`}> */}
          <div className="m-4 pb-4">
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
        <CardBody className={style.cardBody} style={{ padding: "10px" }}>
          <div className={style.cardTitleWrapper}>
            <div className="d-flex col-6 flex-column">
              <span className="d-flex flex-row align-items-center">
                <span className="d-flex flex-row align-items-center">
                  <span className={style.cardTitle}>Lokasi Survey {id}</span>
                  <button
                    className={`text-left ml-2 ${style.lihatDetailButton}`}
                    onClick={() => toggleVisibility(id)}
                  >
                    {visibility[id] ? "Sembunyikan Detail" : "Lihat Detail"}
                  </button>
                </span>
              </span>
            </div>
            <div className="d-flex col-6 flex-row justify-content-end align-items-center">
              <span className="d-flex flex-row justify-content-end">
                <span
                  className={`d-flex align-items-center ${style.titikLokasi}`}
                >
                  Titik Lokasi:
                </span>

                <button
                  onClick={() => {
                    tog_map();
                    setselectedLokasi(
                      get(data, "namaLokasi", "tidak ada lokasi").toUpperCase()
                    );
                    setselectedLat(get(data, "latitude", -6.2));
                    setselectedLong(get(data, "longitude", 106.816666));
                  }}
                  className={`${style.titikLokasiButton} ${style.titikLokasiItems}`}
                >
                  {get(data, "namaLokasi", "tidak ada lokasi").toUpperCase()}
                  {"     "}
                  {get(
                    data,
                    "latitude",
                    "tidak ada latitude"
                  ).toUpperCase()} ||{" "}
                  {get(data, "longitude", "tidak ada longitude").toUpperCase()}
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
                  <img src={mapIcon} alt="map icon"></img>
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
      {data ? (
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
        <span>
          <Info i="1" />
          <CardTabs datatable={data} />
        </span>
      )}
    </span>
  );
}

export default CardInfo;
