import React from 'react';
import { CardBody, CardTitle } from 'reactstrap';

//Import Style
import style from '../style.module.scss';
import Detail from '../DetailList.js';
import DisplayImageWithLabel from '../../../DisplayImageWithLabel';
import DisplayImage from '../../../DisplayImage';
import Obstacle from '../ObstacleList.js';
import LocationMapping from '../LocationMappingList';
import get from 'lodash/get';

function Section19({ data }) {
  return (
    <CardBody>
      {/* {data.page19 ? ( */}
      <>
        <span className={style.section}>Section 19</span>
        <CardTitle className={`mb-5 mt-2 text26`}>
          Foto-foto Pengguna Potensial
        </CardTitle>
        <div className={`font-weight-bold d-flex flex-wrap`}>
          <DisplayImage
            title="Sample Title"
            url={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            alt={`Sample Alt`}
            kode={`sampleKode`}
            lat={-6.175392}
            long={106.827153}
          />
          <DisplayImage
            title="Sample Title"
            url={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            alt={`Sample Alt`}
            kode={`sampleKode`}
            lat={-6.175392}
            long={106.827153}
          />
          <DisplayImage
            title="Sample Title"
            url={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            alt={`Sample Alt`}
            kode={`sampleKode`}
            lat={-6.175392}
            long={106.827153}
          />
          <DisplayImage
            title="Sample Title"
            url={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            alt={`Sample Alt`}
            kode={`sampleKode`}
            lat={-6.175392}
            long={106.827153}
          />
          <DisplayImage
            title="Sample Title"
            url={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            alt={`Sample Alt`}
            kode={`sampleKode`}
            lat={-6.175392}
            long={106.827153}
          />
          <DisplayImage
            title="Sample Title"
            url={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            alt={`Sample Alt`}
            kode={`sampleKode`}
            lat={-6.175392}
            long={106.827153}
          />
          <DisplayImage
            title="Sample Title"
            url={`https://i.pinimg.com/736x/8b/97/63/8b9763813f608e7949cd7242efe38b5d.jpg`}
            alt={`Sample Alt`}
            kode={`sampleKode`}
            lat={-6.175392}
            long={106.827153}
          />
        </div>
      </>
      {/* ) : (<p>No Data Found</p> */}
      {/* )} */}
    </CardBody>
  );
}

export default Section19;
