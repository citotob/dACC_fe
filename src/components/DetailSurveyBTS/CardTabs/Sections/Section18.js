import React from 'react';
import { CardBody, CardTitle } from 'reactstrap';

//Import Style
import style from '../style.module.scss';
import Detail from '../../../DetailList/DetailList';
import DisplayImageWithLabel from '../../../DisplayImageWithLabel';
import Obstacle from '../ObstacleList.js';
import LocationMapping from '../LocationMappingList';
import get from 'lodash/get';

function Section18({ data }) {
  return (
    <CardBody>
      {/* {data.page18 ? ( */}
      <>
        <span className={style.section}>Section 18</span>
        <CardTitle className={`mb-5 mt-2 text26`}>Location Mapping</CardTitle>
        <div className={`font-weight-bold`}>
          <Detail
            label="File Location Mapping"
            value={`Download File Here...`}
          />
          <DisplayImageWithLabel
            lat={-6.175392}
            long={106.827153}
            label="Foto Location Mapping"
            path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
          />
          <hr />
          <h5>Posisi yang Diusulkan</h5>
          <h6>Kandidat 1</h6>
          <Detail label="Latitude" value={`sampleData`} />
          <Detail label="Longitude" value={`sampleData`} />
          <Detail label="Elevasi" value={`sampleData`} satuan="meter" />
          <h6>Kandidat 2</h6>
          <Detail label="Latitude" value={`sampleData`} />
          <Detail label="Longitude" value={`sampleData`} />
          <Detail label="Elevasi" value={`sampleData`} satuan="meter" />
        </div>
      </>
      {/* ) : ( */}
      {/* <p>No Data Found</p> */}
      {/* )} */}
    </CardBody>
  );
}

export default Section18;
