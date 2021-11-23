import React from 'react';
import { CardBody, CardTitle } from 'reactstrap';

//Import Style
import style from '../style.module.scss';
import Detail from '../../../DetailList/DetailList';
import Image from '../../../DisplayImageWithLabel';
import Obstacle from '../ObstacleList.js';
import LocationMapping from '../LocationMappingList';
import get from 'lodash/get';

function Section9({ data }) {
  return (
    <CardBody>
      {/* {data.page9 ? ( */}
      <>
        <span className={style.section}>Section 9</span>
        <CardTitle className={`mb-5 mt-2 text26`}>Perizinan</CardTitle>
        <div className={`font-weight-bold`}>
          <Detail label="Status Kepemilikan Surat Tanah" value={`sampleData`} />
          <Detail label="Ijin yang Dibutuhkan" value={`sampleData`} />
          <Detail
            label="ID Pemilik Lahan"
            // value={get(data.page9, "kebutuhanizin", "-")}
            value={`sampleData`}
          />
        </div>
      </>
      {/* ) : (
        <p>No Data Found</p>
      )} */}
    </CardBody>
  );
}

export default Section9;
