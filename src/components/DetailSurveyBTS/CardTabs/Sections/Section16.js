import React from 'react';
import { CardBody, CardTitle } from 'reactstrap';

//Import Style
import style from '../style.module.scss';
import Detail from '../DetailList.js';
import DisplayImageWithLabel from '../../../DisplayImageWithLabel';
import Obstacle from '../ObstacleList.js';
import LocationMapping from '../LocationMappingList';
import get from 'lodash/get';

function Section16({ data }) {
  return (
    <CardBody>
      {/* {data.page16 ? ( */}
      <>
        <span className={style.section}>Section 16</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Foto Foto Capture G-NETTRACK Jarak 2 KM
        </CardTitle>

        <div className={`font-weight-bold`}>
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Degree 0°"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Degree 30°"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Degree 60°"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Degree 90°"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Degree 120°"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Degree 150°"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Degree 180°"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Degree 210°"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Degree 240°"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Degree 270°"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Degree 300°"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Degree 330°"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Degree 360°"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
        </div>
      </>
      {/* ) : ( */}
      {/* <p>No Data Found</p> */}
      {/* )} */}
    </CardBody>
  );
}

export default Section16;
