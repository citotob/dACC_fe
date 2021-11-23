import React from "react";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";
import Detail from "../DetailList.js";
import Image from "../ImageList.js";
import Obstacle from "../ObstacleList.js";
import LocationMapping from "../LocationMappingList";
import get from "lodash/get";

function Section22({ data }) {
  return (
    <CardBody id='section-1'>
      {data.page1 ? (
        <>
          <span className={style.section}>Section 22</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Informasi Desain Link Microwave
          </CardTitle>
          <div className={`font-weight-bold`}>
            <Detail label='Site A ID (Near End)' value={`sampleData`} />
            <Detail label='Site B ID (Far End)' value={`sampleData`} />
            <Detail label='Frequency' value={`sampleData`} />
            <Detail label='Konfigurasi dan Kapasitas' value={`sampleData`} />
            <Detail label='Ukuran Ant (Main)' value={`sampleData`} />
            <Detail label='Ukuran Ant (SD)' value={`sampleData`} />
            <Detail label='Site A Antenna Support' value={`sampleData`} />
            <Detail label='Site B Antenna Support' value={`sampleData`} />
            <Detail label='Peta Digital' value={`sampleData`} />
            <Detail label='Kandidat Site A' value={`sampleData`} />
            <Detail label='Kandidat Site B' value={`sampleData`} />
            <Detail label='Path Length' value={`sampleData`} satuan='KM' />
            <Detail label='Site A Azimuth' value={`sampleData`} satuan='°' />
            <Detail label='Site B Azimuth' value={`sampleData`} satuan='°' />
            <Detail
              label='Site A Elevasi'
              value={`sampleData`}
              satuan='meter'
            />
            <Detail
              label='Site B Elevasi'
              value={`sampleData`}
              satuan='meter'
            />
            <Detail
              label='Site A Sudut Vertical'
              value={`sampleData`}
              satuan='°'
            />
            <Detail
              label='Site B Sudut Vertical'
              value={`sampleData`}
              satuan='°'
            />
            <Detail
              label='Site A Tinggi Antenna'
              value={`sampleData`}
              satuan='meter'
            />
            <Detail
              label='Site A Tinggi Antenna SD'
              value={`sampleData`}
              satuan='meter'
            />
            <Detail
              label='Site B Tinggi Antenna'
              value={`sampleData`}
              satuan='meter'
            />
            <Detail
              label='Site B SD Tinggi Antenna SD'
              value={`sampleData`}
              satuan='meter'
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
}

export default Section22;
