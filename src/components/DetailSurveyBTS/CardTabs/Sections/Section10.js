import React from 'react';
import { CardBody, CardTitle } from 'reactstrap';

//Import Style
import style from '../style.module.scss';
import Detail from '../../../DetailList/DetailList';
import Image from '../../../DisplayImageWithLabel';
import Obstacle from '../ObstacleList.js';
import LocationMapping from '../LocationMappingList';
import get from 'lodash/get';

function Section10({ data }) {
  return (
    <CardBody>
      {/* {data.page10 ? ( */}
      <>
        <span className={style.section}>Section 10</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Informasi Demografi
        </CardTitle>
        <h5>A. Informasi Umum</h5>
        <div className={`font-weight-bold`}>
          <Detail
            label="Populasi (Orang/KK)"
            value={`sampleData`}
            satuan="Orang/KK"
          />
          <Detail
            label="Kepadatan Penduduk"
            value={`sampleData`}
            satuan="Orang/Km2"
          />
          <Detail label="Distribusi Penduduk" value={`sampleData`} />
          <Detail label="Desa Terdekat" value={`sampleData`} />
          <Detail
            label="Jarak Desa Terdekat"
            value={`sampleData`}
            satuan="Jam"
          />
          <Detail label="Akses dan Kondisi Jalan" value={`sampleData`} />
          <Image
            label="Foto Akses dan Kondisi Jalan"
            lat={-6.175392}
            long={106.827153}
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <Detail label="Kondisi Geografis" value={`sampleData`} />
          <Image
            label="Foto Kondisi Geografis"
            lat={-6.175392}
            long={106.827153}
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <Detail label="Latitude" value={`sampleData`} />
          <Detail label="Longitude" value={`sampleData`} />

          <Detail label="Transportasi Desa" value={`sampleData`} />
          <Image
            label="Foto Transportasi Desa"
            lat={-6.175392}
            long={106.827153}
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <Detail label="Potensi Desa" value={`sampleData`} />
          <Image
            label="Foto Potensi Desa"
            lat={-6.175392}
            long={106.827153}
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <Detail label="Mata Pencaharian" value={`sampleData`} />
          <Detail
            label="Jumlah Pemilik Hp"
            satuan="Orang"
            value={`sampleData`}
          />
          <Detail label="Tipe Jenis Hp" value={`sampleData`} />
          <Detail label="Jenis Sim Card Operator" value={`sampleData`} />
          <Detail
            label="Warga yang dapat dilatih tentang pengoperasian perangkat dasar / Training"
            value={`sampleData`}
          />
          <Detail
            label="Rumah yang memiliki Genset / Solar Panel"
            value={`sampleData`}
            satuan="rumah"
          />
          <Detail label="Catatan Lainnya" value={`sampleData`} />
          <Detail label="Akses Internet Non Selular" value={`sampleData`} />
          <hr />
          <h5>B. Informasi Umum</h5>
          <Detail label="Jumlah Penduduk" value={`sampleData`} satuan="orang" />
          <Detail
            label="Jumlah Penduduk Pria"
            value={`sampleData`}
            satuan="orang"
          />
          <Detail
            label="Jumlah Penduduk Wanita"
            value={`sampleData`}
            satuan="orang"
          />
          <h6>Jumlah Penduduk Berdasarkan Umur</h6>
          <Detail label="Umur <20 Tahun" value={`sampleData`} satuan="orang" />
          <Detail
            label="Umur 21-30 Tahun"
            value={`sampleData`}
            satuan="orang"
          />
          <Detail
            label="Umur 31-40 Tahun"
            value={`sampleData`}
            satuan="orang"
          />
          <Detail
            label="Umur 41-50 Tahun"
            value={`sampleData`}
            satuan="orang"
          />
          <Detail
            label="Umur 51-60 Tahun"
            value={`sampleData`}
            satuan="orang"
          />
          <Detail label="Umur <60 Tahun" value={`sampleData`} satuan="orang" />
          <h6>Jumlah Penduduk Berdasarkan Pendidikan</h6>
          <Detail label="Tidak Sekolah" value={`sampleData`} satuan="orang" />
          <Detail label="SD" value={`sampleData`} satuan="orang" />
          <Detail label="SMP" value={`sampleData`} satuan="orang" />
          <Detail label="SMU" value={`sampleData`} satuan="orang" />
          <Detail label="Akademi" value={`sampleData`} satuan="orang" />
          <Detail label="Sarjana" value={`sampleData`} satuan="orang" />
          <hr />
          <Detail label="Empat Bidang Pekerjaan Utama" value={`sampleData`} />
          <Detail
            label="Pengeluaran Rata-rata Per Bulan Rumah Tangga"
            value={`sampleData`}
          />
          <Detail
            label="Harapan Pengeluaran Pulsa Per Bulan Rumah Tangga"
            value={`sampleData`}
          />
          <hr />
          <h6>Fasilitas Desa</h6>
          <Detail label="Pasar Desa" value={`sampleData`} />
          <Detail label="Jarak Pasar Desa" value={`sampleData`} satuan="Km" />
          <Detail label="Pasar Kota" value={`sampleData`} />
          <Detail label="Jarak Pasar Kota" value={`sampleData`} satuan="Km" />
          <Detail label="Sekolah" value={`sampleData`} />
          <Detail label="Jarak Sekolah" value={`sampleData`} satuan="Km" />
          <Detail label="Industri" value={`sampleData`} />
          <Detail label="Jarak Industri" value={`sampleData`} satuan="Km" />
          <Detail label="Koperasi" value={`sampleData`} />
          <Detail label="Jarak Koperasi" value={`sampleData`} satuan="Km" />
          <Detail label="Puskesmas / RSU" value={`sampleData`} />
          <Detail
            label="Jarak Puskesmas / RSU"
            value={`sampleData`}
            satuan="Km"
          />
          <Detail label="Dermaga" value={`sampleData`} />
          <Detail label="Jarak Dermaga" value={`sampleData`} satuan="Km" />
          <Detail label="Tambang" value={`sampleData`} />
          <Detail label="Jarak Tambang" value={`sampleData`} satuan="Km" />
          <Detail label="Perkebunan" value={`sampleData`} />
          <Detail label="Jarak Perkebunan" value={`sampleData`} satuan="Km" />
          <hr />
          <h6>Supply Chain Management</h6>
          <Detail label="Kios Voucher" value={`sampleData`} />
          <Detail label="Jarak Kios Voucher" value={`sampleData`} satuan="Km" />
          <Image
            label="Foto Kios Voucher"
            lat={-6.175392}
            long={106.827153}
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <Detail label="Bank" value={`sampleData`} />
          <Detail label="Jarak Bank" value={`sampleData`} satuan="Km" />
          <Image
            label="Foto Bank"
            lat={-6.175392}
            long={106.827153}
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <Detail label="Kantor Pos" value={`sampleData`} />
          <Detail label="Jarak Kantor Pos" value={`sampleData`} satuan="Km" />
          <Image
            label="Foto Kantor Pos"
            lat={-6.175392}
            long={106.827153}
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <Detail label="Toko Ritel" value={`sampleData`} />
          <Detail label="Jarak Toko Ritel" value={`sampleData`} satuan="Km" />
          <Image
            label="Foto Toko Ritel"
            lat={-6.175392}
            long={106.827153}
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <Detail label="Kios Listrik" value={`sampleData`} />
          <Detail label="Jarak Kios Listrik" value={`sampleData`} satuan="Km" />
          <Image
            label="Foto Kios Listrik"
            lat={-6.175392}
            long={106.827153}
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <Detail label="Operator" value={`sampleData`} />
          <Detail label="Jarak Operator" value={`sampleData`} satuan="Km" />
          <Image
            label="Foto Operator"
            lat={-6.175392}
            long={106.827153}
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <hr />
          <h5>Keterangan Tambahan</h5>
          <Detail label="Keterangan Tambahan" value={`sampleData`} />
        </div>
      </>
      {/* ) : ( */}
      {/* <p>No Data Found</p> */}
      {/* )} */}
    </CardBody>
  );
}

export default Section10;
