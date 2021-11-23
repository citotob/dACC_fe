import React from 'react';
import { CardBody, CardTitle } from 'reactstrap';

//Import Style
import style from '../style.module.scss';
import Detail from '../DetailList.js';
import DisplayImageWithLabel from '../../../DisplayImageWithLabel';
import Obstacle from '../ObstacleList.js';
import LocationMapping from '../LocationMappingList';
import get from 'lodash/get';

function Section17({ data }) {
  return (
    <CardBody>
      {/* {data.page17 ? ( */}
      <>
        <span className={style.section}>Section 17</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Foto Foto Capture G-NETTRACK Rute Jalan (+/- 2KM Dari Kandidat Site)
        </CardTitle>

        <div className={`font-weight-bold`}>
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Telkomsel"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Indosat"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="XL"
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

export default Section17;
