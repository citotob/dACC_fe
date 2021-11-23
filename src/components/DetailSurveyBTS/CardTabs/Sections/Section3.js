import React from 'react';
import { CardBody, CardTitle } from 'reactstrap';

//Import Style
import style from '../style.module.scss';
import Detail from '../../../DetailList/DetailList';
import Image from '../../../DisplayImageWithLabel';
import Obstacle from '../ObstacleList.js';
import LocationMapping from '../LocationMappingList';
import get from 'lodash/get';

function Section3({ data }) {
  return (
    <CardBody>
      {data.page3 ? (
        <>
          <span className={style.section}>Section 3</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Informasi Geografi & Tower Data
          </CardTitle>
          <div className={`font-weight-bold`}>
            <Detail
              label="Koordinat GPS WGS84 - Latitude"
              value={`sampleData`}
            />
            <Detail
              label="Koordinat GPS WGS84 - Longitude"
              value={`sampleData`}
            />
            <Detail
              label="Altitude (ASL)"
              // value={get(data.page3, "tinggitowerpole", "-")}
              value={`sampleData`}
              satuan="meter di atas permukaan laut"
            />
            <Detail
              label="Tinggi Tower / Pole"
              value={`sampleData`}
              satuan="meter"
            />
            <Detail label="Tipe Tower" value={`sampleData`} />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
}

export default Section3;
