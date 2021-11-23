import React from "react";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";
import Detail from "../DetailList.js";
import Image from "../ImageList.js";
import Obstacle from "../ObstacleList.js";
import LocationMapping from "../LocationMappingList";
import get from "lodash/get";

function Section39({ data }) {
  return (
    <CardBody id='section-1'>
      {data.page1 ? (
        <>
          <span className={style.section}>Section 39</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Kondisi Fasilitas
          </CardTitle>
          <div className={`font-weight-bold`}>
            <Detail
              label='Jumlah Pole Existing'
              value={`sampleData`}
              satuan='Pcs'
            />
            <Detail
              label='Jumlah HH/MH Existing'
              value={`sampleData`}
              satuan='Pcs'
            />
            <Detail
              label='Jumlah Pole Baru'
              value={`sampleData`}
              satuan='Pcs'
            />
            <Detail
              label='Jumlah HH/MH Baru'
              value={`sampleData`}
              satuan='Pcs'
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
}

export default Section39;
