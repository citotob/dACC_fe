import React from 'react';
import { CardBody, CardTitle } from 'reactstrap';

//Import Style
import style from '../style.module.scss';
import Detail from '../DetailList.js';
import Image from '../ImageList.js';
import Obstacle from '../ObstacleList.js';
import ModuleDiagramDerajat from '../../../ModuleDiagramDerajat';
import LocationMapping from '../LocationMappingList';
import get from 'lodash/get';

function Section14({ data }) {
  const fakeValue = [1, 2, 3, 4, 5];
  return (
    <CardBody>
      {/* {data.page14 ? ( */}
      <>
        <span className={style.section}>Section 14</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Coverage and Obstacle Information
        </CardTitle>
        <ModuleDiagramDerajat />
        {/* <div className={`font-weight-bold`}>
          <Obstacle
            label="Coverage and Obstacle Information"
            value={fakeValue}
          />
        </div> */}
      </>
      {/* ) : (
        <p>No Data Found</p>
      )} */}
    </CardBody>
  );
}

export default Section14;
