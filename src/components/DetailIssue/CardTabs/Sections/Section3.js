import React, { useState } from "react";

import { Button, CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import PopupImage from "../../../PopupImage";

function Section3({ data }) {
  const Fotolokasi = (props) => {
    const [image, setImage] = useState("");
    const [modalImage, setModalImage] = useState(false);
    let toggleImage = (img) => {
      setImage(img);
      setModalImage(!modalImage);
    };
    let source = `${process.env.REACT_APP_BE_URL}${props.url}`;
    return (
      <div className='d-flex flex-column col-6 text-center'>
        <span>{props.title}</span>
        <span>
          <PopupImage
            image={image}
            modalImage={modalImage}
            toggleImage={toggleImage}
          />
          <Button color='' onClick={() => toggleImage(source)}>
            <img alt='' style={{ width: "354px" }} src={source}></img>
          </Button>
        </span>
        <span className='mb-4'>
          GPS: {props.lat}, {props.long}
        </span>
      </div>
    );
  };

  let listFoto = data?.listFoto;
  let longitude = data?.longitude;
  let latitude = data?.latitude;
  // console.log("longlat dari section 3", latitude)
  return (
    <CardBody>
      <span className={style.section}>Section 3</span>
      <CardTitle className={`mb-5 mt-2 text26`}>Foto Lokasi</CardTitle>
      <div style={{ fontWeight: "bold" }} className='d-flex flex-wrap'>
        <Fotolokasi
          title='Akses Jalan'
          url={listFoto?.aksesJalan?.url}
          long={longitude}
          lat={latitude}
        />
        <Fotolokasi
          title='Plang'
          url={listFoto?.plang?.url}
          long={longitude}
          lat={latitude}
        />
        <Fotolokasi
          title='Marking'
          url={listFoto?.markingPerangkat?.url}
          long={longitude}
          lat={latitude}
        />
        <Fotolokasi
          title='KWH Meter'
          url={listFoto?.kwhMeter?.url}
          long={longitude}
          lat={latitude}
        />
        <Fotolokasi
          title='Gambar Denah Lokasi / Lanskap Bangunan'
          url={listFoto?.gambarDenah?.url}
          long={longitude}
          lat={latitude}
        />
        <Fotolokasi
          title='Berita Acara'
          url={listFoto?.lanskapBangunan?.url}
          long={longitude}
          lat={latitude}
        />
      </div>
    </CardBody>
  );
}

export default Section3;
