import React from 'react';
import { CardBody, CardTitle } from 'reactstrap';

//Import Style
import style from '../style.module.scss';
import Detail from '../../../DetailList/DetailList';
import DisplayImageWithLabel from '../../../DisplayImageWithLabel';
import Obstacle from '../ObstacleList.js';
import LocationMapping from '../LocationMappingList';
import get from 'lodash/get';

function Section12({ data }) {
  return (
    <CardBody>
      {/* {data.page12 ? ( */}
      <>
        <span className={style.section}>Section 12</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Layout Site (Sesuai Penawaran Tender)
        </CardTitle>
        <div className={`font-weight-bold`}>
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Layout Site"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Tower"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Denah Lokasi Area"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <Detail label="Tower ke Source Power" value={`sampleData`} />
          <Detail label="Tower ke Antenna VSAT" value={`sampleData`} />
          <Detail label="Tower ke Solar Panel" value={`sampleData`} />
        </div>
      </>
      {/* ) : ( */}
      {/* <p>No Data Found</p> */}
      {/* )} */}
    </CardBody>
  );
}

export default Section12;
