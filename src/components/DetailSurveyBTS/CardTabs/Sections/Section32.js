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

function Section32({ data }) {
  return (
    <CardBody id='section-1'>
      {data.page1 ? (
        <>
          <span className={style.section}>Section 32</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Foto Line Of Sight (LOS)
          </CardTitle>
          <div className={`font-weight-bold`}>
            <Detail label='Dari' value={`sampleData`} />
            <Detail label='Ke' value={`sampleData`} />
            <Detail label='Azimuth' value={`sampleData`} />
            <DisplayImageWithLabel
              lat={-6.175392}
              long={106.827153}
              label='Gambar diambil dari Site A ke Site B (tanpa zoom)'
              path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            />
            <DisplayImageWithLabel
              lat={-6.175392}
              long={106.827153}
              label='Gambar diambil dari Site A ke Site B (dengan zoom)'
              path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            />
            <DisplayImageWithLabel
              lat={-6.175392}
              long={106.827153}
              label='Gambar diambil dari Site B ke Site A (tanpa zoom)'
              path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            />
            <DisplayImageWithLabel
              lat={-6.175392}
              long={106.827153}
              label='Gambar diambil dari Site B ke Site A (dengan zoom)'
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

export default Section32;
