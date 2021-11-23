import React, { useState } from "react";

import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";
import Card1 from "../card1.js";
import get from "lodash/get";

function Section2({ data }) {
  return (
    <CardBody>
      <span className={style.section}>Section 2</span>
      <CardTitle className={`mb-5 mt-2 text26`}>
        Keterangan Perangkat IT di Lokasi
      </CardTitle>
      <div className={`font-weight-bold`}>
        <Card1
          label='Komputer'
          value={data?.device?.pc ? `${data?.device?.pc} buah` : "-"}
        />
        <Card1
          label='Tablet'
          value={data?.device?.tablet ? `${data?.device?.tablet} buah` : "-"}
        />
        <Card1
          label='Smartphone'
          value={
            data?.device?.smartPhone ? `${data?.device?.smartPhone} buah` : "-"
          }
        />
        <Card1
          label='Laptop'
          value={data?.device?.laptop ? `${data?.device?.laptop} buah` : "-"}
        />
        <Card1
          label='Perangkat Lain 1'
          value={
            get(data, "device.lainnya1.nama")
              ? get(data, "device.lainnya1.nama") +
                " : " +
                get(data, "device.lainnya1.qty") +
                " Buah"
              : "-"
          }
        />
        <Card1
          label='Perangkat Lain 2'
          value={
            get(data, "device.lainnya1.nama")
              ? get(data, "device.lainnya2.nama") +
                " : " +
                get(data, "device.lainnya2.qty") +
                " Buah"
              : "-"
          }
        />
      </div>
    </CardBody>
  );
}

export default Section2;
