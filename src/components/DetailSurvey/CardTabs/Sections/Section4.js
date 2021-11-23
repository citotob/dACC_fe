import React, { useState } from "react";

import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

import Card1 from "../card1.js";
import get from "lodash/get";

function Section4({ data }) {
  let network = data?.network;
  return (
    <CardBody>
      <span className={style.section}>Section 4</span>
      <CardTitle className={`mb-5 mt-2 text26`}>
        Network
      </CardTitle>
      <div className={`font-weight-bold`}>
        <Card1 label='Tipe' value={get(network, "tipe", "-")} />
        <Card1
          label='Download'
          value={
            get(network, "download", "-") === "NaN"
              ? "-"
              : get(network, "download", "-")
          }
          satuan='Mbps'
        />
        <Card1
          label='Upload'
          value={
            get(network, "upload", "-") === "NaN"
              ? "-"
              : get(network, "upload", "-")
          }
          satuan='Mbps'
        />
      </div>
    </CardBody>
  );
}

export default Section4;
