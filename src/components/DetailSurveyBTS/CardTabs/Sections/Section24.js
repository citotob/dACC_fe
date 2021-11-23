import React from "react";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";
import Detail from "../DetailList.js";
import Image from "../ImageList.js";
import DisplayImageWithLabel from "../../../DisplayImageWithLabel";
import Obstacle from "../ObstacleList.js";
import LocationMapping from "../LocationMappingList";
import get from "lodash/get";

function Section24({ data }) {
  return (
    <CardBody id='section-1'>
      {data.page1 ? (
        <>
          <span className={style.section}>Section 24</span>
          <CardTitle className={`mb-5 mt-2 text26`}>Hasil Survey LOS</CardTitle>
          <div className={`font-weight-bold`}>
            <Detail label='Site A Latitude (DD Format)' value={`sampleData`} />
            <Detail label='Site A Longitude (DD Format)' value={`sampleData`} />
            <Detail label='Site B Latitude (DD Format)' value={`sampleData`} />
            <Detail label='Site B Longitude (DD Format)' value={`sampleData`} />
            <Detail label='Site A Tipe Tower' value={`sampleData`} />
            <Detail
              label='Site A Tinggi Tower'
              value={`sampleData`}
              satuan='meter'
            />
            <Detail label='Site B Tipe Tower' value={`sampleData`} />
            <Detail
              label='Site B Tinggi Tower'
              value={`sampleData`}
              satuan='meter'
            />
            <Detail
              label='Rata-rata Tinggi Pohon (Asumsi +/- Mtr)'
              value={`sampleData`}
              satuan='meter'
            />
            <Detail
              label='Site A Proposed tinggi min Antenna (Main)'
              value={`sampleData`}
              satuan='meter'
            />
            <Detail
              label='Site A Proposed tinggi min Antenna (SD)'
              value={`sampleData`}
              satuan='meter'
            />
            <Detail
              label='Site B Proposed tinggi min Antenna (Main)'
              value={`sampleData`}
              satuan='meter'
            />
            <Detail
              label='Site B Proposed tinggi min Antenna (SD)'
              value={`sampleData`}
              satuan='meter'
            />
            <Detail
              label='Kesimpulan Hasil dari Survey LOS
'
              value={`sampleData`}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
}

export default Section24;
