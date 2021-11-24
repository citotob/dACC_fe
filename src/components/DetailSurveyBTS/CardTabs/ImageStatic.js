import React, { useState } from "react";
import { Modal } from "reactstrap";

//import API
import { url } from "../../../services/Config";

import PopupImage from "../../PopupImage";
import CardMap from "./CardMap";

import toggleMapIcon from "../../../assets/icons/toggleMapModalIcon.svg";

function ImageList(props) {
  const tempLat = -6.175392;
  const tempLong = 106.827153;
  let imageStyle = {
    width: "300px",
    marginBottom: "8px",
  };
  let stylingOverlayText = {
    position: "absolute",
    left: "24px",
    color: "white",
    zIndex: 200,
  };

  //Popup Image State
  const [image, setImage] = useState("");
  const [modalImage, setModalImage] = useState(false);
  const [modalMapOpen, setmodalMap] = useState(false);

  const [selectedLokasi, setselectedLokasi] = useState("");
  const [selectedLat, setselectedLat] = useState("");
  const [selectedLong, setselectedLong] = useState("");
  let toggleImage = (img) => {
    setImage(img);
    setModalImage(!modalImage);
  };

  function tog_map() {
    setmodalMap(!modalMapOpen);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

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

  const Location = ({ item, device_lat, device_lon, deskripsi }) => {
    return (
      <>
        {modalComponentMap()}
        <div className='d-flex flex-row mx-0 my-2'>
          <button
            onClick={() => {
              tog_map();
              setselectedLokasi("Monas Jakarta");
              setselectedLat(tempLat);
              setselectedLong(tempLong);
            }}
            // className={`${style.mapButton}`}
            style={{ transform: "translateY(-8px)" }}
          >
            <img src={toggleMapIcon} alt='' /> View Map
          </button>
        </div>
      </>
    );
  };

  return (
    <div className='d-flex flex-row mb-2 px-0'>
      <PopupImage
        image={image}
        modalImage={modalImage}
        toggleImage={toggleImage}
        kode={`sampleData`}
        lat={tempLat}
        long={tempLong}
      />
      <span className='col-5 pl-0'>{props.label}</span>
      {/* <span className='col-8'>: {`${props.value}`}</span> */}
      <div className='col-7 d-flex flex-column'>
        <div className={`d-flex flex-column position-relative`}>
          <img
            src={props.path}
            style={imageStyle}
            onClick={() => toggleImage(props.path)}
          />
          <span style={{ ...stylingOverlayText, bottom: "44px" }}>
            {props.kode}
          </span>
          <span style={{ ...stylingOverlayText, bottom: "28px" }}>
            LAT: {tempLat}
          </span>
          <span style={{ ...stylingOverlayText, bottom: "12px" }}>
            LONG: {tempLong}
          </span>
        </div>
        <Location />
      </div>
      {/* <img src="" alt="" srcset="" /> */}
    </div>
  );
}

export default ImageList;