import React from 'react';
import { CardBody, CardTitle } from 'reactstrap';

//Import Style
import style from '../style.module.scss';
import Detail from '../../../DetailList/DetailList';
import Image from '../../../DisplayImageWithLabel';
import Obstacle from '../ObstacleList.js';
import LocationMapping from '../LocationMappingList';
import get from 'lodash/get';

function Section6({ data }) {
  return (
    <CardBody>
      {/* {data.page6 ? ( */}
      <>
        <span className={style.section}>Section 6</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Coverage Seluler Di Site
        </CardTitle>
        <div className={`font-weight-bold`}>
          <p>TELKOMSEL</p>
          <Detail
            label="Ketersediaan Coverage dalam Radius <2 km dari Site"
            value={`sampleData`}
          />
          <Detail label="Ketersediaan Sinyal" value={`sampleData`} />
          <Detail
            label="Level Sinyal di HP (Jika ada Coverage)"
            value={`sampleData`}
            satuan="DBm"
          />
          <Detail label="Call di Site" value={`sampleData`} />
          <Detail label="SMS di Site" value={`sampleData`} />
          <Detail
            label="Internet/Speed Test 4G"
            // value={get(data.page6, "smsdisite", "-")}
            value={`sampleData`}
            satuan="Mbps"
          />
          <hr />
          {/* <Detail
              label='Nama Operator'
              value={get(data.page6, "namaoperator[0]", "-")}
            /> */}
          <p>INDOSAT</p>
          <Detail
            label="Ketersediaan Coverage dalam Radius <2 km dari Site"
            value={`sampleData`}
          />
          <Detail label="Ketersediaan Sinyal" value={`sampleData`} />
          <Detail
            label="Level Sinyal di HP (Jika ada Coverage)"
            value={`sampleData`}
            satuan="DBm"
          />
          <Detail label="Call di Site" value={`sampleData`} />
          <Detail label="SMS di Site" value={`sampleData`} />
          <Detail
            label="Internet/Speed Test 4G"
            // value={get(data.page6, "smsdisite", "-")}
            value={`sampleData`}
            satuan="Mbps"
          />
          <hr />
          <p>XL</p>
          <Detail
            label="Ketersediaan Coverage dalam Radius <2 km dari Site"
            value={`sampleData`}
          />
          <Detail label="Ketersediaan Sinyal" value={`sampleData`} />
          <Detail
            label="Level Sinyal di HP (Jika ada Coverage)"
            value={`sampleData`}
            satuan="DBm"
          />
          <Detail label="Call di Site" value={`sampleData`} />
          <Detail label="SMS di Site" value={`sampleData`} />
          <Detail
            label="Internet/Speed Test 4G"
            // value={get(data.page6, "smsdisite", "-")}
            value={`sampleData`}
            satuan="Mbps"
          />
          <hr />
        </div>
      </>
      {/* ) : (  <p>No Data Found</p>
       )} */}
    </CardBody>
  );
}

export default Section6;
