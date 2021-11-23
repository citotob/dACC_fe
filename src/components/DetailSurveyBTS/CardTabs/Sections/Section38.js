import React from "react";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";
import Detail from "../DetailList.js";
import Image from "../ImageList.js";
import Obstacle from "../ObstacleList.js";
import LocationMapping from "../LocationMappingList";
import get from "lodash/get";

import TableLokasiHHPole from "../Tables/TableLokasiHHPole";

function Section38({ data }) {
  return (
    <CardBody id='section-1'>
      {data.page1 ? (
        <>
          <span className={style.section}>Section 38</span>
          <CardTitle className={`mb-5 mt-2 text26`}>Lokasi HH/Pole</CardTitle>
          <TableLokasiHHPole />
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
}

export default Section38;
