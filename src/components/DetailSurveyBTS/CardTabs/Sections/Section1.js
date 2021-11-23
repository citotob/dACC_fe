import React from 'react';
import { CardBody, CardTitle } from 'reactstrap';

//Import Style
import style from '../style.module.scss';
import Detail from '../../../DetailList/DetailList';
import Image from '../../../DisplayImageWithLabel';
import Obstacle from '../ObstacleList.js';
import LocationMapping from '../LocationMappingList';
import get from 'lodash/get';

function Section1({ data }) {
  return (
    <CardBody id="section-1">
      {data.page1 ? (
        <>
          <span className={style.section}>Section 1</span>
          <CardTitle className={`mb-5 mt-2 text26`}>Informasi Survey</CardTitle>
          <div className={`font-weight-bold`}>
            <Detail label="Tipe" value={`sampleData`} />
            <Detail label="Site ID" value={`sampleData`} />
            <Detail label="Kontraktor" value={`sampleData`} />
            <Detail label="Nama Project" value={`sampleData`} />
            <Detail
              label="Dokumen No."
              // value={get(data.page1, "namaproject", "-")}
              value={`sampleData`}
            />
            <Detail
              label="Rev"
              // value={get(data.page1, "namaproject", "-")}
              value={`sampleData`}
            />

            <Detail label="Tanggal Survey" value={`sampleData`} />
            <Detail label="Nama Surveyor" value={`sampleData`} />
            <Detail label="Nomor Telepon" value={`sampleData`} />
            <Detail label="Email" value={`sampleData`} />
            <Detail label="Status Site" value={`sampleData`} />
            <Image
              label="Foto KTP"
              lat={-6.175392}
              long={106.827153}
              path={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            />
            <Image
              label="File Site Survey Report dan Approval"
              lat={-6.175392}
              long={106.827153}
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

export default Section1;
