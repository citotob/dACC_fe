import React, { useState } from "react";

//import API
import { url } from "../../../services/Config";

import PopupImage from "../../PopupImage";

function ImageList(props) {
  const imageStyle = {
    width: "300px",
    marginBottom: "8px",
  };

  //Popup Image State
  const [image, setImage] = useState("");
  const [modalImage, setModalImage] = useState(false);
  let toggleImage = (img) => {
    setImage(img);
    setModalImage(!modalImage);
  };

  let src2 = `${url}${props.value.path}`;
  return (
    <div className="d-flex flex-row mb-2">
      <PopupImage
        image={image}
        modalImage={modalImage}
        toggleImage={toggleImage}
      />
      <span className="col-4">{props.label}</span>
      {/* <span className='col-8'>: {`${props.value}`}</span> */}
      {Array.isArray(props.value) ? (
        props.value.map((item, i) => {
          let source = props.nettrack
            ? `${url}${item.data.foto.path}`
            : `${url}${item.path}`;

          return (
            <div key={i} className={`d-flex flex-column `}>
              <img
                src={source}
                alt="Image"
                style={imageStyle}
                onClick={() => toggleImage(source)}
              />
              {props.nettrack && (
                <>
                  <small>
                    Sector :{" "}
                    {props.nettrack ? item.data.sector : item.device_lat}
                  </small>
                  <small>
                    Jarak : {props.nettrack ? item.data.jarak : item.device_lat}
                  </small>
                </>
              )}
              <small>
                Latitude :{" "}
                {props.nettrack ? item.data.foto.device_lat : item.device_lat}
              </small>
              <small>
                Longitude :{" "}
                {props.nettrack ? item.data.foto.device_lon : item.device_lon}
              </small>
              <small>
                Deskripsi :{" "}
                {props.nettrack ? item.data.foto.deskripsi : item.deskripsi}
              </small>
            </div>
          );
        })
      ) : (
        <div className={`d-flex flex-column `}>
          <img
            src={src2}
            alt="Image"
            style={imageStyle}
            onClick={() => toggleImage(src2)}
          />
          <small>Latitude : {props.value.device_lat}</small>
          <small>Longitude : {props.value.device_lon}</small>
          <small>Deskripsi : {props.value.deskripsi}</small>
        </div>
      )}
      {/* <img src="" alt="" srcset="" /> */}
    </div>
  );
}

export default ImageList;
