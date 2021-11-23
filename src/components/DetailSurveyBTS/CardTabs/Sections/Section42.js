import React from "react";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";
import Detail from "../DetailList.js";
import Image from "../ImageList.js";
import DisplayImageWithLabel from "../../../DisplayImageWithLabel";
import Obstacle from "../ObstacleList.js";
import LocationMapping from "../LocationMappingList";
import get from "lodash/get";

function Section42({ data }) {
  let placeholderData = {
    generalcommenthtml:
      "<ol><li>Testing dangeroud html</li><li>Propose pole/tiang baru 7 m sebanyak 32 pcs</li><li>Sudah terdapat kabel laut di STO Namlea</li></ol>",
  };

  return (
    <CardBody id='section-1'>
      {data.page1 ? (
        <>
          <span className={style.section}>Section 42</span>
          <CardTitle className={`mb-5 mt-2 text26`}>
            Hasil Survey dan Catatan
          </CardTitle>
          <div className={`font-weight-bold`}>
            <div className='d-flex flex-column mb-2 px-0'>
              <div
                dangerouslySetInnerHTML={{
                  __html: placeholderData.generalcommenthtml,
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </CardBody>
  );
}

export default Section42;
