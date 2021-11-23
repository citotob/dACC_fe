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
import DisplayImageWithLabel from '../../../DisplayImageWithLabel';

function Section8({ data }) {
  return (
    <CardBody>
      {/* {data.page8 ? ( */}
      <>
        <span className={style.section}>Section 8</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Sarana Catuan Listrik Dan Pendukungnya
        </CardTitle>
        <div className={`font-weight-bold`}>
          <Detail label="Pengelola Sumber Listrik" value={`sampleData`} />
          <Detail
            label="Jenis Sumber Listrik"
            value={`sampleData`}
            // value={get(data.page8, "sumberdaya", "-")}
          />
          <Detail
            label="Phase Listrik"
            value={`sampleData`}
            // value={get(data.page8, "sumberdaya", "-")}
          />
          <Detail
            label="Kapasitas Sumber Listrik"
            value={`sampleData`}
            satuan="KVA"
          />
          {/* <Detail
              label='Kekuatan Kelistrikan'
              value={get(data.page8, "kekuatankelistrikan", "-")}
            /> */}
          <Detail label="Jam Operasi Sumber Listrik" value={`sampleData`} />
          <Detail
            label="Jarak Perangkat ke Sumber Listrik Terdekat"
            value={`sampleData`}
            satuan="meter"
          />
          <Detail
            label="Listrik Bisa Digunakan Untuk Perangkat"
            value={`sampleData`}
          />
          <Detail label="Kategori Grid" value={`sampleData`} />
          <Detail label="Pasokan BBM" value={`sampleData`} />
          <Detail label="Jenis BBM yang Sering Tersedia" value={`sampleData`} />
          <Detail
            label="Harga BBM di Lokasi"
            value={`sampleData`}
            satuan="/liter"
          />
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Posisi Objek Penghalang Terhadap Modul Surya (Layout)"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <Detail
            label="Bayangan Objek Menutupi Area Modul Surya"
            // value={get(data.page8, "listrikbisadigunakanuntukalat", "-")}
            value={`sampleData`}
          />
          <Detail
            label="Posisi Lintang Lokasi"
            // value={get(data.page8, "listrikbisadigunakanuntukalat", "-")}
            value={`sampleData`}
          />
          <Detail
            label="Orientasi Kemiringan Panel Surya Yang Optimal"
            // value={get(data.page8, "listrikbisadigunakanuntukalat", "-")}
            value={`sampleData`}
          />
          {/* ================== file ini bisa di download juga ================== */}
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Berita Acara Kelistrikan"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
        </div>
      </>
      {/* ) : (
        <p>No Data Found</p>
      )} */}
    </CardBody>
  );
}

export default Section8;
