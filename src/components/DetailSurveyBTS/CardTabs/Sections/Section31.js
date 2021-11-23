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

function Section31({ data }) {
  return (
    <CardBody id='section-1'>
      {data.page1 ? (
        <>
          <span className={style.section}>Section 31</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Foto Panoramic SITE B
          </CardTitle>
          <div className={`font-weight-bold`}>
            <DisplayImageWithLabel
              lat={-6.175392}
              long={106.827153}
              label='Site B Sector 0°'
              path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            />
            <DisplayImageWithLabel
              lat={-6.175392}
              long={106.827153}
              label='Site B Sector 30°'
              path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            />
            <DisplayImageWithLabel
              lat={-6.175392}
              long={106.827153}
              label='Site B Sector 60°'
              path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            />
            <DisplayImageWithLabel
              lat={-6.175392}
              long={106.827153}
              label='Site B Sector 90°'
              path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            />
            <DisplayImageWithLabel
              lat={-6.175392}
              long={106.827153}
              label='Site B Sector 120°'
              path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            />
            <DisplayImageWithLabel
              lat={-6.175392}
              long={106.827153}
              label='Site B Sector 150°'
              path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            />
            <DisplayImageWithLabel
              lat={-6.175392}
              long={106.827153}
              label='Site B Sector 180°'
              path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            />
            <DisplayImageWithLabel
              lat={-6.175392}
              long={106.827153}
              label='Site B Sector 210°'
              path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            />
            <DisplayImageWithLabel
              lat={-6.175392}
              long={106.827153}
              label='Site B Sector 240°'
              path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            />
            <DisplayImageWithLabel
              lat={-6.175392}
              long={106.827153}
              label='Site B Sector 270°'
              path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            />
            <DisplayImageWithLabel
              lat={-6.175392}
              long={106.827153}
              label='Site B Sector 300°'
              path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            />
            <DisplayImageWithLabel
              lat={-6.175392}
              long={106.827153}
              label='Site B Sector 330°'
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

export default Section31;
