import React from 'react';
import { CardBody, CardTitle } from 'reactstrap';

//Import Style
import style from '../style.module.scss';
import Detail from '../../../DetailList/DetailList';
import Image from '../../../DisplayImageWithLabel';
import ImageStatic from '../ImageStatic';
import Obstacle from '../ObstacleList.js';
import LocationMapping from '../LocationMappingList';
import get from 'lodash/get';

function Section4({ data }) {
  return (
    <CardBody>
      {/* {data.page4 ? ( */}
      <>
        <span className={style.section}>Section 4</span>
        <CardTitle className={`mb-5 mt-2 text26`}>Transmisi VSAT</CardTitle>
        <div className={`font-weight-bold`}>
          <Detail label="Penempatan Antenna" value={`sampleData`} />
          <Detail label="Mounting Antenna" value={`sampleData`} />
          <Detail label="Diameter Antena" value={`sampleData`} />
          <Detail label="Tipe Antena Satelit" value={`sampleData`} />
          <hr />
          <h5 className="mt-4">Satelit Yang Akan Digunakan</h5>
          <Detail label="Satelit yang Akan Digunakan" value={`sampleData`} />
          <Image
            label="Lampiran Print Screen"
            lat={-6.175392}
            long={106.827153}
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <hr />
          <Detail label="Azimuth" value={`sampleData`} />
          <Detail label="Elevasi" value={`sampleData`} />
          <Detail label="Obstacle" value={`sampleData`} />
        </div>
      </>
      {/* ) : (
        <p>No Data Found</p>
      )} */}
    </CardBody>
  );
}

export default Section4;
