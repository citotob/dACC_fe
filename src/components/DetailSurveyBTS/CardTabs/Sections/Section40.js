import React from "react";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";
import Detail from "../DetailList.js";
import Image from "../ImageList.js";
import Obstacle from "../ObstacleList.js";
import LocationMapping from "../LocationMappingList";
import get from "lodash/get";

function Section40({ data }) {
  return (
    <CardBody id='section-1'>
      {data.page1 ? (
        <>
          <span className={style.section}>Section 40</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Kondisi Terminasi di STO
          </CardTitle>
          <div className={`font-weight-bold`}>
            <Detail label='Existing Termination Box' value={`sampleData`} />
            <Detail
              label='Existing Available Port'
              value={`sampleData`}
              satuan='Port'
            />
            <Detail label='Need Add New Termination Box' value={`sampleData`} />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
}

export default Section40;
