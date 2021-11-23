import React from "react";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";
import Detail from "../DetailList.js";
import Image from "../ImageList.js";
import DisplayImageWithLabel from "../../../DisplayImageWithLabel";
import Obstacle from "../ObstacleList.js";
import LocationMapping from "../LocationMappingList";
import get from "lodash/get";
import DisplayImage from "../../../DisplayImage";

function Section35({ data }) {
  return (
    <CardBody id='section-1'>
      {data.page1 ? (
        <>
          <span className={style.section}>Section 35</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Perkiraan Link Budget (Capture-an Tools)
          </CardTitle>
          <div className={`font-weight-bold`}>
            {/* <DisplayImage
              title='Screen Capture'
              url={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
              alt={`Foto Plang`}
              kode={`sampleData`}
              long={`9.99999`}
              lat={`9.99999`}
              type='BTS'
            /> */}
            <DisplayImageWithLabel
              lat={-6.175392}
              long={106.827153}
              label='Screen Capture'
              path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            />
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
}

export default Section35;
