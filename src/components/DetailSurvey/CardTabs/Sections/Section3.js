import React, { useState } from "react";

import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";
import DisplayImage from "../../../DisplayImage";

function Section3({ data }) {
  let listFoto = data?.listFoto;
  let longitude = data?.longitude;
  let latitude = data?.latitude;

  return (
    <CardBody>
      <span className={style.section}>Section 3</span>
      <CardTitle className={`mb-5 mt-2 text26`}>Foto Lokasi</CardTitle>
      <div style={{ fontWeight: "bold" }} className='d-flex flex-wrap'>
        <DisplayImage
          title='Akses Jalan'
          url={listFoto?.aksesJalan?.url}
          alt={`Foto Akses Jalan`}
          kode={data.kodeHasilSurvey}
          long={longitude}
          lat={latitude}
          showMap={false}
        />
        <DisplayImage
          title='Plang'
          url={listFoto?.plang?.url}
          alt={`Foto Plang`}
          kode={data.kodeHasilSurvey}
          long={longitude}
          lat={latitude}
          showMap={false}
        />
        <DisplayImage
          title='Marking'
          url={listFoto?.markingPerangkat?.url}
          alt={`Foto Marking`}
          kode={data.kodeHasilSurvey}
          long={longitude}
          lat={latitude}
          showMap={false}
        />
        <DisplayImage
          title='KWH Meter'
          url={listFoto?.kwhMeter?.url}
          alt={`Foto KWH Meter`}
          kode={data.kodeHasilSurvey}
          long={longitude}
          lat={latitude}
          showMap={false}
        />
        <DisplayImage
          title='Gambar Denah Lokasi / Lanskap Bangunan'
          url={listFoto?.gambarDenah?.url}
          alt={`Foto Denah/Lanskap`}
          kode={data.kodeHasilSurvey}
          long={longitude}
          lat={latitude}
          showMap={false}
        />
        <DisplayImage
          title='Berita Acara'
          url={listFoto?.lanskapBangunan?.url}
          alt={`Foto Berita Acara`}
          kode={data.kodeHasilSurvey}
          long={longitude}
          lat={latitude}
          showMap={false}
        />
      </div>
    </CardBody>
  );
}

export default Section3;
