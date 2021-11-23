import React, { useState } from "react";

import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";
import Card1 from "../card1.js";
import get from "lodash/get";

function Section1({ data }) {
  const moment = require("moment");
  console.log("data dari section 1", data);
  return (
    <CardBody>
      <span className={style.section}>Section 1</span>
      <CardTitle className={`mb-5 mt-2 text26`}>
        Data Calon Pelanggan
      </CardTitle>
      <div className={`font-weight-bold`}>
        <Card1 label='PIC' value={data?.pic?.namaPic} />
        <Card1 label='Nomor Telepon PIC Desa' value={data?.pic?.phonePic} />
        <Card1
          label='Tanggal Pelaksanaan'
          value={moment(data?.tanggalPelaksanaan).format("DD/MM/YYYY")}
        />
        <Card1
          label='Akses Darat'
          value={
            data?.modaTransportasi?.darat === "[]"
              ? "-"
              : data?.modaTransportasi?.darat?.slice(1, -1)
          }
        />
        <Card1
          label='Akses Laut'
          value={
            data?.modaTransportasi?.laut === "[]"
              ? "-"
              : data?.modaTransportasi?.laut?.slice(1, -1)
          }
        />
        <Card1
          label='Akses Udara'
          value={
            data?.modaTransportasi?.udara === "[]"
              ? "-"
              : data?.modaTransportasi?.udara?.slice(1, -1)
          }
        />
        <Card1
          label='Durasi Perjalanan dari Kecamatan'
          value={`${get(data, "modaTransportasi.durasiPerjalanan", "-")} jam`}
        />
        <Card1
          label='Nama Kota Kecamatan'
          value={get(data, "modaTransportasi.namaKotaKecamatan", "-")}
        />
        <Card1
          label='Elevasi'
          value={data?.elevation ? `${data?.elevation} meter` : "-"}
        />
        <Card1 label='Tipe Bisnis' value={get(data, "tipeBisnis", "-")} />
        <Card1 label='Alamat' value={get(data, "alamatLokasi", "-")} />
        <Card1
          label='Sumber Listrik'
          value={get(data, "power.sumber_listrik", "-")}
        />
        <Card1
          label='ID Pelanggan PLN'
          value={get(data, "power.idPelangganPLN", "-")}
        />
        <Card1
          label='Kapasitas Listrik'
          value={get(data, "power.kapasitas_listrik", "-")}
        />
        <Card1
          label='Sumber Listrik Cadangan'
          value={get(data, "power.sumber_cadangan", "-")}
        />
        <Card1
          label='Jam Operasional Listrik'
          value={get(data, "power.jamOperasionalListrik", "-")}
        />
        <Card1
          label='Jam Operasional Lokal'
          value={get(data, "power.jamOperasionalLokal", "-")}
        />
        <Card1 label='Catatan' value={get(data, "note", "-")} />
      </div>
    </CardBody>
  );
}

export default Section1;
