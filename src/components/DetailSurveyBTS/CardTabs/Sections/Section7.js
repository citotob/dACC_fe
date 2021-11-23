import React from 'react';
import { CardBody, CardTitle } from 'reactstrap';

//Import Style
import style from '../style.module.scss';
import Detail from '../../../DetailList/DetailList';
import Image from '../../../DisplayImageWithLabel';
import Obstacle from '../ObstacleList.js';
import LocationMapping from '../LocationMappingList';
import get from 'lodash/get';

function Section7({ data }) {
  return (
    <CardBody>
      {/* {data.page7 ? ( */}
      <>
        <span className={style.section}>Section 7</span>
        <CardTitle className={`mb-5 mt-2 text26`}>Kondisi Lahan</CardTitle>
        <div className={`font-weight-bold`}>
          <Detail label="Topografi Umum" value={`sampleData`} />
          <Detail
            label="Keterangan Area Cakupan (Banyak Cakupan)"
            value={`sampleData`}
          />
          <Detail label="Keterangan Lahan" value={`sampleData`} />
          <Detail label="Status Lahan" value={`sampleData`} />
          <Detail label="Pengurusan IMB" value={`sampleData`} />
          <Detail label="Klasifikasi Tanah" value={`sampleData`} />
          <Detail label="Obyek Penghalang" value={`sampleData`} />
          <Detail label="Kebutuhan Pengkondisian Lahan" value={`sampleData`} />
          <Detail label="Tata Ruang" value={`sampleData`} />
          <Detail label="Jenis Lahan" value={`sampleData`} />
          <Detail label="Dekat Laut / Sungai" value={`sampleData`} />
          <Detail
            label="Resiko Bencana"
            value={`sampleData`}
            satuan={
              data?.page7?.resikobencana?.includes('Banjir') ? 'meter' : ''
            }
          />
          <Detail label="Sumber Daya Setempat (SDA/SDM)" value={`sampleData`} />
          <Detail label="Resiko Relokasi" value={`sampleData`} />
          <Detail label="Resiko Komplain" value={`sampleData`} />
        </div>
      </>
      {/* ) : (
        <p>No Data Found</p>
      )} */}
    </CardBody>
  );
}

export default Section7;
