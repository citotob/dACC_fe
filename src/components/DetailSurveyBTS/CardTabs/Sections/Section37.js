import React from "react";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";
import Detail from "../DetailList.js";
import Image from "../ImageList.js";
import Obstacle from "../ObstacleList.js";
import LocationMapping from "../LocationMappingList";
import get from "lodash/get";

function Section37({ data }) {
  return (
    <CardBody id='section-1'>
      {data.page1 ? (
        <>
          <span className={style.section}>Section 37</span>
          <CardTitle className={`mb-5 mt-2 text26`}>Hasil Survey</CardTitle>
          <div className={`font-weight-bold`}>
            <Detail label='Jarak Rute' value={`sampleData`} satuan='KM' />
            <Detail label='Rekomendasi Tipe Konstruksi' value={`sampleData`} />
            <Detail label='Rute/Informasi Lokasi' value={`sampleData`} />
            <Detail label='Kode Pos' value={`sampleData`} />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
}

export default Section37;
