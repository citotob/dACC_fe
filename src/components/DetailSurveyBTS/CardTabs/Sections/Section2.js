import React from 'react';
import { CardBody, CardTitle } from 'reactstrap';

//Import Style
import style from '../style.module.scss';
import Detail from '../../../DetailList/DetailList';
import Image from '../ImageList.js';
import Obstacle from '../ObstacleList.js';
import LocationMapping from '../LocationMappingList';
import get from 'lodash/get';

function Section2({ data }) {
  return (
    <CardBody>
      {data.page2 ? (
        <>
          <span className={style.section}>Section 2</span>
          <CardTitle className={`mb-5 mt-2 text26`}>Informasi Umum</CardTitle>
          <div className={`font-weight-bold`}>
            <Detail label="Nama Site" value={`sampleData`} />
            <Detail label="Tipe Site" value={`sampleData`} />

            <Detail label="Tipe Coverage Area Site" value={`sampleData`} />
            <Detail label="Alamat dan Kode Pos" value={`sampleData`} />
            <Detail label="Latitude" value={`sampleData`} />
            <Detail label="Longitude" value={`sampleData`} />
            <Detail label="Contact Person Pemilik" value={`sampleData`} />
            <Detail label="No Tlp" value={`sampleData`} />
            <Detail label="Alamat Contact Person" value={`sampleData`} />
            <Detail label="Akses ke Lokasi Site" value={`sampleData`} />
            <Detail
              label="Jarak Dari Lokasi Site ke Jalur Utama"
              value={`sampleData`}
              satuan="meter"
            />
            <Detail
              label="Akses ke Lokasi Site (jarak)"
              value={`sampleData`}
              satuan="meter"
            />
            <Detail label="Kondisi Jalan Akses lokasi" value={`sampleData`} />
            <Detail label="Jalan Akses Lokasi" value={`sampleData`} />
            <Detail label="Akses Sungai atau Laut" value={`sampleData`} />
            <Detail label="Waktu Perjalanan" value={`sampleData`} />
            <Detail label="Ijin ke Lokasi" value={`sampleData`} />
            {/* <Detail
              label='Jarak dari Kota ke Lokasi dan Nama Kota'
              value={get(data.page2, "jarakdarikotakelokasidannamakota", "-")}
              satuan='meter'
            /> */}
            <Detail
              label="Lama Perjalanan ke Kota Terdekat"
              // value={get(data.page2, "jarakdarikotakelokasidannamakota", "-")}
              value={`sampleData`}
              satuan="jam"
            />
            <Detail
              label="Keberangkatan Dari kota Terdekat"
              // value={get(data.page2, "kondisiperalatan", "-")}
              value={`sampleData`}
            />
            <h5>Ketinggian Halangan</h5>
            <Detail
              label="Timur"
              // value={get(data.page2, "kondisiperalatan", "-")}
              value={`sampleData`}
              satuan="meter"
            />
            <Detail
              label="Selatan"
              // value={get(data.page2, "kondisiperalatan", "-")}
              value={`sampleData`}
              satuan="meter"
            />
            <Detail
              label="Barat"
              // value={get(data.page2, "kondisiperalatan", "-")}
              value={`sampleData`}
              satuan="meter"
            />
            <Detail
              label="Utara"
              // value={get(data.page2, "kondisiperalatan", "-")}
              value={`sampleData`}
              satuan="meter"
            />
            <h5>Jarak Halangan dari Tower</h5>
            <Detail
              label="Timur"
              // value={get(data.page2, "kondisiperalatan", "-")}
              value={`sampleData`}
              satuan="meter"
            />
            <Detail
              label="Selatan"
              // value={get(data.page2, "kondisiperalatan", "-")}
              value={`sampleData`}
              satuan="meter"
            />
            <Detail
              label="Barat"
              // value={get(data.page2, "kondisiperalatan", "-")}
              value={`sampleData`}
              satuan="meter"
            />
            <Detail
              label="Utara"
              // value={get(data.page2, "kondisiperalatan", "-")}
              value={`sampleData`}
              satuan="meter"
            />
            <Detail label="Kondisi Gudang Penyimpanan" value={`sampleData`} />
            <Detail label="Tipe Antena" value={`sampleData`} />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
}

export default Section2;
