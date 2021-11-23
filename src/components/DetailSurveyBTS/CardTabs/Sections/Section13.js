import React from 'react';
import { CardBody, CardTitle } from 'reactstrap';

//Import Style
import style from '../style.module.scss';
import Detail from '../DetailList.js';
import DisplayImageWithLabel from '../../../DisplayImageWithLabel';
import Obstacle from '../ObstacleList.js';
import LocationMapping from '../LocationMappingList';
import get from 'lodash/get';

function Section13({ data }) {
  return (
    <CardBody>
      {/* {data.page13 ? ( */}
      <>
        <span className={style.section}>Section 13</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Foto Foto Kandidat Lahan
        </CardTitle>
        <div className={`font-weight-bold`}>
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Lahan Kandidat"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Marking GPS"
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

export default Section13;
