import React from 'react';
import { CardBody, CardTitle } from 'reactstrap';

//Import Style
import style from '../style.module.scss';
import Detail from '../../../DetailList/DetailList';
import Image from '../../../DisplayImageWithLabel';
import Obstacle from '../ObstacleList.js';
import LocationMapping from '../LocationMappingList';
import get from 'lodash/get';

function Section5({ data }) {
  return (
    <CardBody>
      {/* {data.page5 ? ( */}
      <>
        <span className={style.section}>Section 5</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Informasi Umum Lahan
        </CardTitle>
        <div className={`font-weight-bold`}>
          <Detail label="Posisi Tower/Pole" value={`sampleData`} />
          <Detail label="Status Kepemilikan Lahan" value={`sampleData`} />
          <Detail label="Nama Pemilik Lahan" value={`sampleData`} />
          <Detail label="Nomor Pemilik Lahan" value={`sampleData`} />
          <Detail label="Nama Pemilik Lahan 2" value={`sampleData`} />
          <Detail label="Nomor Pemilik Lahan 2" value={`sampleData`} />
          <Detail label="Status Kondisi Lahan" value={`sampleData`} />
          <Detail label="Kondisi Sosial" value={`sampleData`} />
          <Detail label="Keamanan" value={`sampleData`} />
          <Detail label="Luas Lahan" value={`sampleData`} satuan="m2" />
        </div>
      </>
      {/* ) : (
        <p>No Data Found</p>
      )} */}
    </CardBody>
  );
}

export default Section5;
