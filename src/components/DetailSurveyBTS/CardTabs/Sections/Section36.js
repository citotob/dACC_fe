import React from "react";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";
import Detail from "../DetailList.js";
import Image from "../ImageList.js";
import Obstacle from "../ObstacleList.js";
import LocationMapping from "../LocationMappingList";
import get from "lodash/get";

function Section36({ data }) {
  return (
    <CardBody id='section-1'>
      {data.page1 ? (
        <>
          <span className={style.section}>Section 36</span>
          <CardTitle className={`mb-5 mt-2 text26`}>Informasi Umum</CardTitle>
          <div className={`font-weight-bold`}>
            <Detail label='Site POI' value={`sampleData`} />
            <Detail label='Alamat (POI)' value={`sampleData`} />
            <Detail label='Kontak (POI)' value={`sampleData`} />
            <Detail label='Nomor Telepon (POI)' value={`sampleData`} />
            <Detail label='Alamat Kontak (POI)' value={`sampleData`} />
            <Detail label='Sit STO' value={`sampleData`} />
            <Detail label='Alamat (STO)' value={`sampleData`} />
            <Detail label='Kontak (STO)' value={`sampleData`} />
            <Detail label='Nomor Telepon (STO)' value={`sampleData`} />
            <Detail label='Alamat Kontak (STO)' value={`sampleData`} />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
}

export default Section36;
